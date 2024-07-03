import React, { ReactNode } from 'react';

interface CardProps {
    header?: ReactNode;
    bodyContent?: ReactNode;
    title: string;
    isTogglable?: boolean;
    toggleCard: (title: string) => void;
    isOpen: boolean;
    className?: string;
}

export const Card: React.FC<CardProps> = ({
    header,
    bodyContent,
    title,
    isTogglable = false,
    toggleCard,
    isOpen,
    className = '',
}) => {
    const handleClick = () => {
        if (isTogglable) {
            toggleCard(title);
        }
    };

    return (
        <div
            className={`w-full max-w-full flex flex-col rounded-xl overflow-hidden bg-white border border-neutral-400 ${className} ${isTogglable ? 'cursor-pointer' : ''}`}
            style={{ minHeight: isOpen ? '15%' : '40px' }}
            onClick={handleClick}
        >
            {header != null && (
                <div
                    className="flex justify-between items-center px-2 w-full min-h-[40px] border-b border-neutral-100 text-neutral-900 select-none"
                >
                    {header}
                </div>
            )}
            {isOpen && (
                <div className="flex-grow w-full overflow-hidden">
                    <div className="flex flex-col h-full w-full">
                        {bodyContent}
                    </div>
                </div>
            )}
        </div>
    );
};
