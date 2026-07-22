/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '6mb' }, // preuves de paiement jusqu'à 5 Mo
  },
  // pdfkit charge ses polices .afm depuis node_modules à l'exécution — ne pas bundler.
  serverExternalPackages: ['pdfkit', 'openai', 'groq-sdk', '@anthropic-ai/sdk'],
};

export default nextConfig;
