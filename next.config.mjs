/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // to add an image from an external source, we need to modify next configuration
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com'
            }
        ]
    }
};

export default nextConfig;
