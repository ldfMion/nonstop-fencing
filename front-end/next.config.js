/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
    async redirects() {
        return [
            {
                source: '/universities/:id',
                destination: '/universities/:id/men',
                permanent: true,
            },
            {
                source: '/events/:id',
                destination: '/events/:id/overview',
                permanent: true,
            },
        ];
    },
    crossOrigin: 'anonymous',
};

export default config;
