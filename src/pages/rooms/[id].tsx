import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import styles from '../../styles/room.module.scss';

type FirebaseQuestions = Record<
    string,
    {
        author: {
            name: string;
            avatar: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
    }
>;

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
};

const Room: React.FC = () => {
    const { user } = useAuth();
    const router = useRouter();
    const roomId = router.query.id as string;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions =
                databaseRoom?.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(
                ([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighlighted: value.isHighlighted,
                        isAnswered: value.isAnswered
                    };
                }
            );

            setTitle(databaseRoom?.title);
            setQuestions(parsedQuestions);
        });
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id={styles.pageRoom}>
            <header>
                <div className={styles.content}>
                    <Image src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala {title}</h1>
                    {questions && questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className={styles.formFooter}>
                        {user ? (
                            <div className={styles.userInfo}>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                Para enviar uma pergunta,{' '}
                                <button>faça seu login</button>.
                            </span>
                        )}
                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>
                    </div>
                </form>

                {questions && JSON.stringify(questions)}
            </main>
        </div>
    );
};

export default Room;
