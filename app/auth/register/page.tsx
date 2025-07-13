"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#A065E1] via-[#D69DE0] to-[#00C9A7] items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="mb-8">
            <Logo
              size="xl"
              variant="light"
              showText={true}
              className="justify-center mb-6"
            />
            <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl font-light leading-relaxed opacity-90">
            Crie sua conta e comece a gerenciar suas consultas médicas hoje
            mesmo
          </p>
          <div className="mt-8 space-y-4 text-sm opacity-75">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Registro rápido e seguro</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Suporte dedicado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Logo
              size="lg"
              variant="gradient"
              showText={true}
              className="justify-center mb-4"
            />
            <p className="text-gray-600 text-sm">Sistema de Gestão Médica</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Criar Nova Conta
              </h2>
              <p className="text-gray-600">
                Preencha os dados para se registrar
              </p>
            </div>

            {/* Coming Soon Message */}
            <div className="bg-gradient-to-r from-[#00C9A7]/10 to-[#A065E1]/10 border border-[#00C9A7]/20 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-[#00C9A7] to-[#A065E1] rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Registro Em Breve
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                A funcionalidade de registro está sendo desenvolvida. Por
                enquanto, use as credenciais de teste disponíveis na página de
                login.
              </p>

              <Link
                href="/auth/login"
                className="gooddoctor-button-primary inline-block"
              >
                Voltar ao Login
              </Link>
            </div>

            {/* Back to Login */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-[var(--primary-teal)] hover:text-[var(--primary-teal-hover)] transition-colors"
                  >
                    Fazer login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
