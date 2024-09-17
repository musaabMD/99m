const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "images.indiehackers.com",
      "avatars.githubusercontent.com",
      "img.logo.dev"
    ],
  },
};

module.exports = nextConfig;
