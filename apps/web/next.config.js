import withBundleAnalyzer from "@next/bundle-analyzer";

const config = {
  reactStrictMode: true,
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(config);
