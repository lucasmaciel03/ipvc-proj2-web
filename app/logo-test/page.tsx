"use client";

import { Logo } from "@/components/ui/logo";

export default function LogoTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Teste do Logo Real GoodDoctor
          </h1>
          <p className="text-gray-600 text-lg">
            Usando as imagens da pasta public/assets/logos/web/
          </p>
        </div>

        {/* Light Background Tests */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Background Claro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Small</h3>
              <Logo
                size="sm"
                variant="gradient"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Medium</h3>
              <Logo
                size="md"
                variant="gradient"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Large</h3>
              <Logo
                size="lg"
                variant="gradient"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-4">
                Extra Large
              </h3>
              <Logo
                size="xl"
                variant="gradient"
                showText={true}
                className="justify-center"
              />
            </div>
          </div>
        </div>

        {/* Dark Background Tests */}
        <div className="bg-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Background Escuro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Small</h3>
              <Logo
                size="sm"
                variant="light"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Medium</h3>
              <Logo
                size="md"
                variant="light"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Large</h3>
              <Logo
                size="lg"
                variant="light"
                showText={true}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-300 mb-4">
                Extra Large
              </h3>
              <Logo
                size="xl"
                variant="light"
                showText={true}
                className="justify-center"
              />
            </div>
          </div>
        </div>

        {/* Icon Only Tests */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Só Ícone (sem texto)
          </h2>
          <div className="flex items-center justify-center space-x-8">
            <Logo size="sm" variant="gradient" showText={false} />
            <Logo size="md" variant="gradient" showText={false} />
            <Logo size="lg" variant="gradient" showText={false} />
            <Logo size="xl" variant="gradient" showText={false} />
          </div>
        </div>

        {/* Gradient Background Test */}
        <div className="bg-gradient-to-br from-[#00C9A7] via-[#00E1C3] to-[#A065E1] p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Background com Gradiente
          </h2>
          <div className="text-center">
            <Logo
              size="xl"
              variant="light"
              showText={true}
              className="justify-center"
            />
          </div>
        </div>

        {/* File Paths Info */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            Informações Técnicas
          </h2>
          <div className="text-sm text-blue-800 space-y-2 font-mono">
            <p>
              <strong>Small/Medium:</strong> /assets/logos/web/favicon-32x32.png
            </p>
            <p>
              <strong>Large/XL:</strong> /assets/logos/web/icon-192.png
            </p>
            <p>
              <strong>Usando:</strong> Next.js Image component com optimization
            </p>
            <p>
              <strong>Priority:</strong> true (carregamento prioritário)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
