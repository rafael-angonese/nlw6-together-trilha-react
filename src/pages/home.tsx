import React from 'react';
import Image from 'next/image';
import Router from 'next/router';

import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import styles from '../styles/auth.module.scss';

const Home: React.FC = () => {
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        Router.push('/rooms/new')
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
                        Crie sua sla com Google
                    </button>
                    <div className={styles.separator}>
                        ou entre em uma sala{' '}
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o codigo da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Home;
