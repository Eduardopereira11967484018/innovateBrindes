/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "apihomolog.innovationbrindes.com.br",
      },
      {
        protocol: "https",
        hostname: "**", // Permitir imagens de qualquer domínio para desenvolvimento
      },
    ],
  },
  // Adicionar configuração para lidar com erros de rota
  async redirects() {
    return [
      {
        source: "/product/:id",
        destination: "/products/:id",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

