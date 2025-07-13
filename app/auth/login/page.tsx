"use client";

import LoginForm from "@/components/forms/LoginForm";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00C9A7] via-[#00E1C3] to-[#A065E1] items-center justify-center p-12">
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
            Gerencie suas consultas médicas com simplicidade e confiança
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
