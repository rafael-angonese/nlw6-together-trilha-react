import React from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import styles from '../styles/auth.module.scss';

const Home: React.FC = () => {
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        Router.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed.');
            return;
        }

        Router.push(`/rooms/${roomCode}`);
    }

    return (
        <div id={styles.pageAuth}>
            <aside>
                <Image
                    src={illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas"
                />
                <strong>Crie salas de QA ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className={styles.mainContent}>
                    <Image src={logoImg} alt="Logo" />
                    <button
                        onClick={handleCreateRoom}
                        className={styles.createRoom}
                    >
                        <Image src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com Google
                    </button>
                    <div className={styles.separator}>
                        ou entre em uma sala{' '}
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;
