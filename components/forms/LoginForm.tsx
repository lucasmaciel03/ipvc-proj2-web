"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticateUser, LoginCredentials } from "@/mocks/auth";
import { useAuth } from "@/hooks/use-auth";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export default function LoginForm({ 
  onSuccess, 
  redirectPath = "/routes/dashboard" 
}: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Usando os dados mock para autenticação
      const credentials: LoginCredentials = { email, password };
      const user = authenticateUser(credentials);

      // Simulando delay de resposta do servidor
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        // Armazenar dados do usuário usando o hook de autenticação
        login(user);
        
        // Callback de sucesso ou redirecionamento
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(redirectPath);
        }
      } else {
        setError("Credenciais inválidas. Use admin/admin1234 para testar.");
      }
    } catch (err) {
      setError("Falha ao fazer login. Verifique suas credenciais.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Welcome Back!</h3>
        <p className="text-sm text-gray-500 mt-1">Entre com seus dados para continuar</p>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
            Lembrar-me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/routes/auth/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}