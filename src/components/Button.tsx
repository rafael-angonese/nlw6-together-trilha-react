import { ButtonHTMLAttributes } from 'react';

import styles from '../styles/button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${isOutlined ? styles.outlined : ''}`}
            {...props}
        />
    );
}
