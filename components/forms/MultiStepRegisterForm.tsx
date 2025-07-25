"use client";

import React from 'react';
import { Eye, EyeOff, User, Mail, Phone, Key, Heart, Shield, Users, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMultiStepRegisterForm } from '@/hooks/use-multi-step-register';

export default function MultiStepRegisterForm() {
  const {
    formData,
    errors,
    isLoading,
    currentTab,
    completedTabs,
    updateField,
    nextTab,
    previousTab,
    goToTab,
    canGoToTab,
    handleSubmit
  } = useMultiStepRegisterForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00C9A7] to-[#A065E1] bg-clip-text text-transparent">
          Criar Conta
        </h2>
        <p className="text-gray-600">Preencha os seus dados para se registar no GoodDoctor</p>
      </div>

      <Tabs value={currentTab} onValueChange={(value) => goToTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="personal" 
            className={`relative ${
              completedTabs.includes("personal") ? "text-[#00C9A7]" : ""
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Dados Pessoais
            {completedTabs.includes("personal") && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00C9A7] rounded-full flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="medical" 
            disabled={!canGoToTab("medical")}
            className={`relative ${
              completedTabs.includes("medical") ? "text-[#00C9A7]" : ""
            }`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Dados Médicos
            {completedTabs.includes("medical") && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00C9A7] rounded-full flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00C9A7]" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="seu@email.com"
                className={`transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-[#00C9A7]" />
                Primeiro Nome *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="João"
                className={`transition-all duration-200 ${
                  errors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-[#00C9A7]" />
                Último Nome *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Silva"
                className={`transition-all duration-200 ${
                  errors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nif" className="text-gray-700 font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00C9A7]" />
                NIF *
              </Label>
              <Input
                id="nif"
                type="text"
                value={formData.nif}
                onChange={(e) => updateField('nif', e.target.value)}
                placeholder="123456789"
                maxLength={9}
                className={`transition-all duration-200 ${
                  errors.nif 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                }`}
              />
              {errors.nif && <p className="text-red-500 text-sm">{errors.nif}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00C9A7]" />
                Telemóvel *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="912345678"
                maxLength={9}
                className={`transition-all duration-200 ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                <Key className="w-4 h-4 text-[#00C9A7]" />
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Password segura"
                  className={`transition-all duration-200 pr-10 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00C9A7]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium flex items-center gap-2">
                <Key className="w-4 h-4 text-[#00C9A7]" />
                Confirmar Password *
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder="Confirme a password"
                  className={`transition-all duration-200 pr-10 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'focus:ring-[#00C9A7] focus:border-[#00C9A7]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#00C9A7]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={nextTab}
              className="bg-gradient-to-r from-[#00C9A7] to-[#00E1C3] hover:from-[#00B396] hover:to-[#00C9A7] text-white px-8 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Próximo →
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType" className="text-gray-700 font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A065E1]" />
                Tipo Sanguíneo *
              </Label>
              <Select value={formData.bloodType} onValueChange={(value) => updateField('bloodType', value)}>
                <SelectTrigger className={`transition-all duration-200 w-full ${
                  errors.bloodType 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#A065E1] focus:border-[#A065E1]'
                }`}>
                  <SelectValue placeholder="Selecione o tipo sanguíneo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              {errors.bloodType && <p className="text-red-500 text-sm">{errors.bloodType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-gray-700 font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-[#A065E1]" />
                Género *
              </Label>
              <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className={`transition-all duration-200 w-full ${
                  errors.gender 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#A065E1] focus:border-[#A065E1]'
                }`}>
                  <SelectValue placeholder="Selecione o género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                  <SelectItem value="prefiro-nao-dizer">Prefiro não dizer</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact" className="text-gray-700 font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#A065E1]" />
                Contacto de Emergência *
              </Label>
              <Input
                id="emergencyContact"
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => updateField('emergencyContact', e.target.value)}
                placeholder="Nome do contacto de emergência"
                className={`transition-all duration-200 ${
                  errors.emergencyContact 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#A065E1] focus:border-[#A065E1]'
                }`}
              />
              {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-gray-700 font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A065E1]" />
                Telemóvel de Emergência *
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => updateField('emergencyPhone', e.target.value)}
                placeholder="912345678"
                maxLength={9}
                className={`transition-all duration-200 ${
                  errors.emergencyPhone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'focus:ring-[#A065E1] focus:border-[#A065E1]'
                }`}
              />
              {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="allergies" className="text-gray-700 font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A065E1]" />
                Alergias
              </Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => updateField('allergies', e.target.value)}
                placeholder="Descreva as suas alergias (opcional)"
                rows={3}
                className="transition-all duration-200 focus:ring-[#A065E1] focus:border-[#A065E1] resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-start space-x-2">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => updateField('acceptTerms', e.target.checked)}
                  className="mt-1 h-4 w-4 text-[#A065E1] rounded focus:ring-[#A065E1] border-gray-300"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  Aceito os{' '}
                  <a href="#" className="text-[#A065E1] hover:underline font-medium">
                    termos e condições
                  </a>{' '}
                  e a{' '}
                  <a href="#" className="text-[#A065E1] hover:underline font-medium">
                    política de privacidade
                  </a>
                  *
                </label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              onClick={previousTab}
              variant="outline"
              className="border-[#A065E1] text-[#A065E1] hover:bg-[#A065E1] hover:text-white px-8 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              ← Anterior
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-[#A065E1] to-[#D69DE0] hover:from-[#9154D4] hover:to-[#C88BD7] text-white px-8 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </div>

          {errors.general && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <p className="text-gray-600">
          Já tem conta?{' '}
          <a href="/auth/login" className="text-[#00C9A7] hover:underline font-medium transition-colors duration-200">
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
