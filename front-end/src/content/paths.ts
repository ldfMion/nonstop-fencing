export const PATHS: PathHeading[] = [
    {
        heading: 'Fencers',
        subPaths: [
            {title: "Men's Foil", url: '/23-24/mens/foil/fencers'},
            {title: "Men's Epee", url: '/23-24/mens/epee/fencers'},
            {title: "Men's Saber", url: '/23-24/mens/saber/fencers'},
            {title: "Women's Foil", url: '/23-24/womens/foil/fencers'},
            {title: "Women's Epee", url: '/23-24/womens/epee/fencers'},
            {title: "Women's Saber", url: '/23-24/womens/saber/fencers'},
        ],
    },
    {
        heading: 'Teams',
        subPaths: [
            {title: "Men's", url: '/23-24/mens/teams'},
            {title: "Women's", url: '/23-24/womens/teams'},
        ],
    },
    {
        heading: 'Squads',
        subPaths: [
            {title: "Men's Foil", url: '/23-24/mens/foil/squads'},
            {title: "Men's Epee", url: '/23-24/mens/epee/squads'},
            {title: "Men's Saber", url: '/23-24/mens/saber/squads'},
            {title: "Women's Foil", url: '/23-24/womens/foil/squads'},
            {title: "Women's Epee", url: '/23-24/womens/epee/squads'},
            {title: "Women's Saber", url: '/23-24/womens/saber/squads'},
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
