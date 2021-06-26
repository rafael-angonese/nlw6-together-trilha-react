import Image from 'next/image';
import Router from 'next/router';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
// import { useAuth } from '../hooks/useAuth';

import styles from '../../styles/auth.module.scss';

const NewRoom: React.FC = () => {
    // const { user } = useAuth()

    return (
        <div id={styles.pageAuth}>
            <aside>
                <Image
                    src={illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas"
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className={styles.mainContent}>
                    <Image src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?{' '}
                        <a onClick={() => Router.push('/home')}>clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default NewRoom;
