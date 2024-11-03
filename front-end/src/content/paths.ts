export const PATHS: PathHeading[] = [
    {
        heading: 'Fencers',
        subPaths: [
            {title: "Men's Foil", url: '/24-25/mens/foil/fencers'},
            {title: "Men's Epee", url: '/24-25/mens/epee/fencers'},
            {title: "Men's Saber", url: '/24-25/mens/saber/fencers'},
            {title: "Women's Foil", url: '/24-25/womens/foil/fencers'},
            {title: "Women's Epee", url: '/24-25/womens/epee/fencers'},
            {title: "Women's Saber", url: '/24-25/womens/saber/fencers'},
        ],
    },
    {
        heading: 'Teams',
        subPaths: [
            {title: "Men's", url: '/24-25/mens/teams'},
            {title: "Women's", url: '/24-25/womens/teams'},
        ],
    },
    {
        heading: 'Squads',
        subPaths: [
            {title: "Men's Foil", url: '/24-25/mens/foil/squads'},
            {title: "Men's Epee", url: '/24-25/mens/epee/squads'},
            {title: "Men's Saber", url: '/24-25/mens/saber/squads'},
            {title: "Women's Foil", url: '/24-25/womens/foil/squads'},
            {title: "Women's Epee", url: '/24-25/womens/epee/squads'},
            {title: "Women's Saber", url: '/24-25/womens/saber/squads'},
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
