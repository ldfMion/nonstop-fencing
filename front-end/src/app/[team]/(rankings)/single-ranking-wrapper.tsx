import ListCard from '~/components/list-card';
export default function SingleRankingWrapper({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <h2 className="text-3xl font-semibold">{title}</h2>
            <ListCard>{children}</ListCard>
        </>
    );
}
