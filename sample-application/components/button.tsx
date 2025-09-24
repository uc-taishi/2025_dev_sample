import React, { ButtonHTMLAttributes, ReactNode } from 'react';

// ボタンコンポーネントのPropsを定義
// ButtonHTMLAttributes<HTMLButtonElement>で、HTMLのbutton要素の全ての属性を継承
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // ボタン内に表示する内容 (テキスト、アイコンなど)
    variant?: 'primary' | 'secondary' | 'danger'; // ボタンの種類
    size?: 'sm' | 'md' | 'lg'; // ボタンのサイズ
}

const Button = ({ children, variant = 'primary', size = 'md', className, ...rest }: ButtonProps) => {
    // CSSクラスを動的に生成
    const baseStyles = 'rounded-md font-semibold transition-colors duration-200 focus:outline-none';

    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
    };

    const sizeStyles = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-md',
        lg: 'py-3 px-6 text-lg',
    };

    // 渡されたclassNameを結合
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`;

    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
};

export default Button;