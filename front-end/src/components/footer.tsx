export default function Footer(): JSX.Element {
    /*     const mens = [
        {displayName: "men's foil", url: 'rankings/mens/foil'},
        {displayName: "men's epee", url: 'rankings/mens/epee'},
        {displayName: "men's saber", url: 'rankings/mens/saber'},
    ];
    const womens = [
        {displayName: "women's foil", url: 'rankings/womens/foil'},
        {displayName: "women's epee", url: 'rankings/womens/epee'},
        {displayName: "women's saber", url: 'rankings/womens/saber'},
    ]; */
    return (
        <div className="mt-8 flex flex-col items-start border bg-accent p-6">
            <p>Record information from the 2023-24 season is taken from each university&apos;s website.</p>
            <p>Data from the 2024-25 season is being taken from the results PDFs from each meet.</p>
            <p>
                If you see any mistakes, have any inquiries, or think you might be able to help, shoot an email to{' '}
                <EmailLink>difrancescomion.1@osu.edu</EmailLink>
                {' or '}
                <EmailLink>rai.124@osu.edu</EmailLink>.
            </p>
            <p>The order in which fencers are shown does not reflect official NCAA SPI.</p>
        </div>
    );
}

function EmailLink({children}: {children: string}): JSX.Element {
    return (
        <a href={`mailto:${children}`} className="text-primary hover:underline">
            {children}
        </a>
    );
}
