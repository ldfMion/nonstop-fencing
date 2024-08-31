import Link from 'next/link';

export default function ConditionalLinkWrapper({
    href,
    children,
    className,
}: {
    href?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return href ? (
        <Link href={href} legacyBehavior>
            <div className={className}>{children}</div>
        </Link>
    ) : (
        <>{children}</>
    );
}
