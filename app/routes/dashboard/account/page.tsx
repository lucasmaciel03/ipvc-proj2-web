"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    emergencyContact: "",
    bloodType: "",
    allergies: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Usar useEffect para atualizar os dados do formulário quando o usuário é carregado
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        birthDate: user.birthDate || "",
        emergencyContact: user.emergencyContact || "",
        bloodType: user.bloodType || "",
        allergies: user.allergies || "",
      });
      setIsLoading(false);
    } else {
      // Definir um pequeno timeout antes de redirecionar para garantir
      // que não estamos apenas esperando o hook useAuth carregar
      const timer = setTimeout(() => {
        if (!user) {
          router.push("/routes/auth/login");
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Simulando um atraso para a operação de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em uma aplicação real, aqui seria feita uma chamada à API
      console.log("Dados atualizados:", formData);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Mostrar um estado de carregamento enquanto verificamos o usuário
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando suas informações...</p>
        </div>
      </div>
    );
  }

  // Se chegou até aqui, temos certeza que o usuário está autenticado e carregado
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Editar Perfil
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações Pessoais */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">Informações Pessoais</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Nome Completo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">{formData.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">{formData.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Telefone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Ex: (99) 99999-9999"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.phone || "Não informado"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">
                Endereço
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Rua, número, bairro, cidade, estado"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.address || "Não informado"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="birthDate" className="mb-1 block text-sm font-medium">
                Data de Nascimento
              </label>
              {isEditing ? (
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.birthDate || "Não informado"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Informações Médicas */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">Informações Médicas</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="emergencyContact" className="mb-1 block text-sm font-medium">
                Contato de Emergência
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Nome e telefone"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.emergencyContact || "Não informado"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="bloodType" className="mb-1 block text-sm font-medium">
                Tipo Sanguíneo
              </label>
              {isEditing ? (
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="">Selecione</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.bloodType || "Não informado"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="allergies" className="mb-1 block text-sm font-medium">
                Alergias
              </label>
              {isEditing ? (
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                  rows={3}
                  placeholder="Liste suas alergias, separadas por vírgula"
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">
                  {formData.allergies || "Não informado"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preferências */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">Preferências</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="emailNotifications"
                disabled={!isEditing}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="emailNotifications" className="text-sm">
                Receber notificações por email
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smsNotifications"
                disabled={!isEditing}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="smsNotifications" className="text-sm">
                Receber notificações por SMS
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="reminders"
                disabled={!isEditing}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="reminders" className="text-sm">
                Lembretes de consultas
              </label>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium">Segurança</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium">
                Senha Atual
              </label>
              {isEditing ? (
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="Digite sua senha atual"
                  disabled={!isEditing}
                />
              ) : (
                <p className="rounded-md bg-gray-50 p-2 dark:bg-gray-700">••••••••</p>
              )}
            </div>
            {isEditing && (
              <>
                <div>
                  <label htmlFor="newPassword" className="mb-1 block text-sm font-medium">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </>
            )}
            <div className="pt-2">
              <button
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                disabled={!isEditing}
              >
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de salvar para dispositivos móveis */}
      {isEditing && (
        <div className="mt-4 md:hidden">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      )}
    </>
  );
}