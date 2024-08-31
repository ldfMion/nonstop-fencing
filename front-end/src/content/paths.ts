export const PATHS: PathHeading[] = [
    {
        heading: 'Fencers',
        subPaths: [
            {title: "Men's Foil", url: '/mens/foil/fencers'},
            {title: "Men's Epee", url: '/mens/epee/fencers'},
            {title: "Men's Saber", url: '/mens/saber/fencers'},
            {title: "Women's Foil", url: '/womens/foil/fencers'},
            {title: "Women's Epee", url: '/womens/epee/fencers'},
            {title: "Women's Saber", url: '/womens/saber/fencers'},
        ],
    },
    {
        heading: 'Teams',
        subPaths: [
            {title: "Men's", url: '/mens/teams'},
            {title: "Women's", url: '/womens/teams'},
        ],
    },
    {
        heading: 'Squads',
        subPaths: [
            {title: "Men's Foil", url: '/mens/foil/squads'},
            {title: "Men's Epee", url: '/mens/epee/squads'},
            {title: "Men's Saber", url: '/mens/saber/squads'},
            {title: "Women's Foil", url: '/womens/foil/squads'},
            {title: "Women's Epee", url: '/womens/epee/squads'},
            {title: "Women's Saber", url: '/womens/saber/squads'},
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
