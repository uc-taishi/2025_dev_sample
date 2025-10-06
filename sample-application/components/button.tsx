import React, { ButtonHTMLAttributes, ReactNode } from 'react';

// ボタンコンポーネントのPropsを定義
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = ({ children, variant = 'primary', size = 'md', style = {}, ...rest }: ButtonProps) => {
    const baseStyle = {
        borderRadius: '4px',
        border: '1px solid transparent',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    };

    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '12px' },
        md: { padding: '8px 16px', fontSize: '14px' },
        lg: { padding: '12px 24px', fontSize: '16px' },
    };

    const variantStyles = {
        primary: {
            backgroundColor: '#3b82f6',
            color: 'white',
            borderColor: '#3b82f6',
        },
        secondary: {
            backgroundColor: '#f3f4f6',
            color: '#4b5563',
            borderColor: '#e5e7eb',
        },
        danger: {
            backgroundColor: '#ef4444',
            color: 'white',
            borderColor: '#ef4444',
        },
    };

    const combinedStyle = {
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
    };

    return (
        <button style={combinedStyle} {...rest}>
            {children}
        </button>
    );
};

export default Button;