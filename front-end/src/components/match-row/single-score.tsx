import clsx from 'clsx';
import type {HTMLAttributes} from 'react';

export default function SingleScore({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
} & HTMLAttributes<HTMLParagraphElement>): JSX.Element {
    return <p className={clsx('w-6 text-sm md:text-lg', className)}>{children}</p>;
}
