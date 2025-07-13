"use client";

import {
  Button,
  Input,
  Card,
  GradientText,
  Alert,
} from "@/components/ui/gooddoctor-ui";
import { Logo } from "@/components/ui/logo";
import { useState } from "react";

export default function UIShowcase() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo
            size="xl"
            variant="gradient"
            showText={true}
            className="justify-center mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">
            <GradientText>Sistema de Design</GradientText>
          </h1>
          <p className="text-gray-600 text-lg">
            Componentes para Aplicações Médicas
          </p>
        </div>

        {/* Logo Variations */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Logo Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Light Background
              </h3>
              <div className="space-y-4 bg-white p-6 rounded-lg border">
                <Logo size="sm" variant="gradient" showText={true} />
                <Logo size="md" variant="gradient" showText={true} />
                <Logo size="lg" variant="gradient" showText={true} />
                <Logo size="xl" variant="gradient" showText={true} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-700">
                Dark Background
              </h3>
              <div className="space-y-4 bg-gray-800 p-6 rounded-lg">
                <Logo size="sm" variant="light" showText={true} />
                <Logo size="md" variant="light" showText={true} />
                <Logo size="lg" variant="light" showText={true} />
                <Logo size="xl" variant="light" showText={true} />
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto rounded-lg mb-2"
                style={{ backgroundColor: "#00C9A7" }}
              ></div>
              <p className="text-sm font-medium">Primary Teal</p>
              <p className="text-xs text-gray-500">#00C9A7</p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto rounded-lg mb-2"
                style={{ backgroundColor: "#00E1C3" }}
              ></div>
              <p className="text-sm font-medium">Teal Light</p>
              <p className="text-xs text-gray-500">#00E1C3</p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto rounded-lg mb-2"
                style={{ backgroundColor: "#A065E1" }}
              ></div>
              <p className="text-sm font-medium">Primary Purple</p>
              <p className="text-xs text-gray-500">#A065E1</p>
            </div>
            <div className="text-center">
              <div
                className="w-20 h-20 mx-auto rounded-lg mb-2"
                style={{ backgroundColor: "#D69DE0" }}
              ></div>
              <p className="text-sm font-medium">Primary Lilac</p>
              <p className="text-xs text-gray-500">#D69DE0</p>
            </div>
          </div>
        </Card>

        {/* Buttons */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Botões</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Pequeno
              </Button>
              <Button variant="primary" size="md">
                Médio
              </Button>
              <Button variant="primary" size="lg">
                Grande
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">Secundário</Button>
              <Button variant="outline">Contorno</Button>
              <Button disabled>Desabilitado</Button>
            </div>
          </div>
        </Card>

        {/* Form Elements */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Elementos de Formulário
          </h2>
          <div className="space-y-4 max-w-md">
            <Input
              label="Email"
              type="email"
              placeholder="exemplo@email.com"
              icon={
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
              }
            />
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              icon={
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
              }
            />
            <Input
              label="Campo com Erro"
              type="text"
              placeholder="Digite algo..."
              error="Este campo é obrigatório"
            />
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Alertas</h2>
          <div className="space-y-4">
            {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)}>
                <p className="font-medium">Sucesso!</p>
                <p className="text-sm">Operação realizada com sucesso.</p>
              </Alert>
            )}
            <Alert variant="error">
              <p className="font-medium">Erro!</p>
              <p className="text-sm">Ocorreu um erro durante a operação.</p>
            </Alert>
            <Alert variant="warning">
              <p className="font-medium">Atenção!</p>
              <p className="text-sm">Esta ação não pode ser desfeita.</p>
            </Alert>
            <Alert variant="info">
              <p className="font-medium">Informação</p>
              <p className="text-sm">Dados atualizados com sucesso.</p>
            </Alert>
          </div>
        </Card>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card hover>
            <h3 className="text-xl font-semibold mb-2">
              <GradientText>Card com Hover</GradientText>
            </h3>
            <p className="text-gray-600 mb-4">
              Este card tem efeito hover para melhor interatividade.
            </p>
            <Button variant="primary" size="sm">
              Ação Principal
            </Button>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Card Simples
            </h3>
            <p className="text-gray-600 mb-4">
              Card básico sem efeitos especiais.
            </p>
            <Button variant="secondary" size="sm">
              Ação Secundária
            </Button>
          </Card>
        </div>

        {/* Typography */}
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Tipografia
          </h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">
                <GradientText>Título Principal</GradientText>
              </h1>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                Título Secundário
              </h2>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-800">
                Título Terciário
              </h3>
            </div>
            <div>
              <p className="text-lg text-gray-700">
                Texto grande para destaque
              </p>
            </div>
            <div>
              <p className="text-base text-gray-600">
                Texto padrão para corpo do documento
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Texto pequeno para informações secundárias
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-500">
            <GradientText className="font-semibold">GoodDoctor</GradientText> -
            Sistema de Design v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
