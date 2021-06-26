import Image from 'next/image';
import { useRouter } from 'next/router';
import Router from 'next/router';
import logoImg from '../../../assets/images/logo.svg';
import deleteImg from '../../../assets/images/delete.svg';

import { Button } from '../../../components/Button';
import { RoomCode } from '../../../components/RoomCode';
import { Question } from '../../../components/Question';

import { useRoom } from '../../../hooks/useRoom';
import { database } from '../../../services/firebase';

import styles from '../../../styles/room.module.scss';

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
    const router = useRouter();
    const roomId = router.query.id as string;

    const { title, questions } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        });

        Router.push('/home');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (
            window.confirm('Tem certeza que você deseja excluir esta pergunta?')
        ) {
            await database
                .ref(`rooms/${roomId}/questions/${questionId}`)
                .remove();
        }
    }

    return (
        <div id={styles.pageRoom}>
            <header>
                <div className={styles.content}>
                    <Image src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <div className={styles.roomTitle}>
                    <h1>Sala {title}</h1>
                    {questions && questions.length > 0 && (
                        <span>{questions.length} pergunta(s)</span>
                    )}
                </div>

                <div className={styles.questionList}>
                    {questions &&
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteQuestion(question.id)
                                        }
                                    >
                                        <Image
                                            src={deleteImg}
                                            alt="Remover pergunta"
                                        />
                                    </button>
                                </Question>
                            );
                        })}
                </div>
            </main>
        </div>
    );
};

export default Room;
