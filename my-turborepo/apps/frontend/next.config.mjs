/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  images: {
    domains: ["lh3.googleusercontent.com", "flagcdn.com", "res.cloudinary.com"],
  },
  // experimental: {
  //   staleTimes: {
  //     dynamic: 0,
  //   },
  // },
  reactStrictMode: true,
};

export default nextConfig;
