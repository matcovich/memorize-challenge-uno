/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
            loader: 'default',
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            },
            {
            protocol: 'https',
            hostname: 'www.uno.cl/_next/static/media/',
            },
            {
            protocol: 'https',
            hostname: 'challenge-uno.vercel.app',
            },
        ],
        }
    };

export default nextConfig;
