"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authenticateUser, LoginCredentials } from "@/mocks/auth";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/app";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export default function LoginForm({
  onSuccess,
  redirectPath = ROUTES.DASHBOARD.ROOT,
}: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!email || !password) {
      setLocalError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const credentials: LoginCredentials = { email, password };
      const authResult = authenticateUser(credentials);

      if (authResult) {
        await login(authResult.user, authResult.token);

        if (onSuccess) {
          onSuccess();
        }

        router.push(redirectPath);
      } else {
        setLocalError(
          "Credenciais inválidas. Use admin/admin1234 para testar."
        );
      }
    } catch (err) {
      setLocalError("Erro durante o login. Tente novamente.");
      console.error("Login error:", err);
    }
  };

  const displayError = error || localError;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo de volta
        </h2>
        <p className="text-gray-600">
          Entre com suas credenciais para continuar
        </p>
      </div>

      {/* Error Message */}
      {displayError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{displayError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="gooddoctor-input has-left-icon"
              placeholder="Digite seu email"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="gooddoctor-input has-left-icon has-right-icon"
              placeholder="Digite sua senha"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L9.88 9.88m4.242 4.242l1.414 1.414m-1.414-1.414l.001-.001"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-[var(--primary-teal)] focus:ring-[var(--primary-teal)] focus:ring-2"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Lembrar-me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-[var(--primary-teal)] hover:text-[var(--primary-teal-hover)] transition-colors"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="gooddoctor-button-primary w-full"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Entrando...
          </div>
        ) : (
          "Entrar"
        )}
      </button>

      {/* Test Credentials */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">
              Credenciais de teste
            </span>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <div className="text-xs text-gray-600 space-y-2">
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Admin:</span>
              <span className="font-mono bg-white px-2 py-1 rounded border">
                admin / admin1234
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Paciente:</span>
              <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
                patient@example.com / patient1234
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Médico:</span>
              <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
                doctor@example.com / doctor1234
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Register Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Ainda não tem uma conta?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-[var(--primary-teal)] hover:text-[var(--primary-teal-hover)] transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
