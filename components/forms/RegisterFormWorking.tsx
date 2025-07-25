"use client";

import React from 'react';

export default function RegisterForm() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Criar Conta - Melhorado</h2>
        <p className="text-gray-600">Com animações e microinterações</p>
      </div>

      <form className="space-y-4">
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C9A7] input-focus-glow btn-hover-lift"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C9A7] input-focus-glow btn-hover-lift"
            placeholder="seu@email.com"
          />
        </div>

        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Palavra-passe
          </label>
          <input
            type="password"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C9A7] input-focus-glow btn-hover-lift"
            placeholder="Palavra-passe segura"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00C9A7] to-[#00E1C3] hover:from-[#00B396] hover:to-[#00C9A7] text-white py-3 rounded-lg font-semibold btn-hover-lift animate-pulse-glow"
        >
          Criar Conta
        </button>
      </form>

      <div className="text-center animate-fadeIn">
        <p className="text-gray-600">
          Já tem conta?{' '}
          <a href="/auth/login" className="text-[#00C9A7] hover:underline btn-hover-lift">
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
