"use client";

import { Logo } from "@/components/ui/logo";
import MultiStepRegisterForm from "@/components/forms/MultiStepRegisterForm";

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
            Junte-se ao GoodDoctor e comece a gerir suas consultas médicas com simplicidade
          </p>
          <div className="mt-8 space-y-4 text-sm opacity-75">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Registo rápido e seguro</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Dados protegidos por criptografia</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Acesso imediato após registo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-3xl">
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
            <MultiStepRegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
