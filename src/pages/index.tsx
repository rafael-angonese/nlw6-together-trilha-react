import Router from 'next/router';
import { useEffect } from 'react';

import '../services/firebase';

export default function Home() {
    useEffect(() => {
        Router.push('/home');
    }, []);

    return <></>;
}
