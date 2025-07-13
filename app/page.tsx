"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/app";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    // Aguarda a inicialização do hook de autenticação
    if (!isInitialized) return;

    // Se o usuário estiver autenticado, redireciona para o dashboard
    if (isAuthenticated) {
      router.replace(ROUTES.DASHBOARD.ROOT);
    } else {
      // Se não estiver autenticado, redireciona para o login
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, isInitialized, router]);

  // Exibe um loading enquanto determina o redirecionamento
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}
