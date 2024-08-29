const fencerPaths = [
    {
        title: "Men's Foil",
        url: '/fencers/mens/foil',
    },
    {
        title: "Men's Epee",
        url: '/fencers/mens/epee',
    },
    {
        title: "Men's Saber",
        url: '/fencers/mens/saber',
    },
    {
        title: "Women's Foil",
        url: '/fencers/womens/foil',
    },
    {
        title: "Women's Epee",
        url: '/fencers/womens/epee',
    },
    {
        title: "Women's Saber",
        url: '/fencers/womens/saber',
    },
];

export const PATHS: PathHeading[] = [
    {heading: 'Fencers', subPaths: fencerPaths},
    {
        heading: 'Teams',
        subPaths: [
            {title: "Men's", url: '/teams/mens'},
            {title: "Women's", url: '/teams/womens'},
        ],
    },
    {
        heading: 'Squads',
        subPaths: [
            {title: "Men's Foil", url: '/squads/mens/foil'},
            {title: "Men's Epee", url: '/squads/mens/epee'},
            {title: "Men's Saber", url: '/squads/mens/saber'},
            {title: "Women's Foil", url: '/squads/womens/foil'},
            {title: "Women's Epee", url: '/squads/womens/epee'},
            {title: "Women's Saber", url: '/squads/womens/saber'},
        ],
    },
];

export type Path = {
    title: string;
    url: string;
};

export type PathHeading = {
    heading: string;
    subPaths: Path[];
};
