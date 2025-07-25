"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

export default function RegisterFormSimple() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Criar Conta</h2>
        <p className="text-gray-600">Preencha os dados para se registar</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Palavra-passe
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C9A7]"
            placeholder="Palavra-passe segura"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#00C9A7] hover:bg-[#00B396] text-white"
        >
          Criar Conta
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Já tem conta?{' '}
          <a href="/auth/login" className="text-[#00C9A7] hover:underline">
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
