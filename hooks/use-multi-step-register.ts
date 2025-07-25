"use client";

import { useState } from "react";

export interface RegisterFormData {
  // Dados Pessoais (Tab 1)
  email: string;
  firstName: string;
  lastName: string;
  nif: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Dados Médicos (Tab 2)
  bloodType: string;
  gender: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string;
  
  // Termos
  acceptTerms: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export type TabStep = "personal" | "medical";

export const useMultiStepRegisterForm = () => {
  const [currentTab, setCurrentTab] = useState<TabStep>("personal");
  const [completedTabs, setCompletedTabs] = useState<TabStep[]>([]);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    firstName: "",
    lastName: "",
    nif: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateNIF = (nif: string): boolean => {
    const nifRegex = /^[0-9]{9}$/;
    return nifRegex.test(nif);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^9[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("Mínimo 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Pelo menos 1 letra maiúscula");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Pelo menos 1 letra minúscula");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Pelo menos 1 número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Pelo menos 1 caractere especial");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePersonalTab = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Primeiro nome é obrigatório";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Último nome é obrigatório";
    }

    if (!formData.nif) {
      newErrors.nif = "NIF é obrigatório";
    } else if (!validateNIF(formData.nif)) {
      newErrors.nif = "NIF deve ter 9 dígitos";
    }

    if (!formData.phone) {
      newErrors.phone = "Telemóvel é obrigatório";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Telemóvel inválido (ex: 912345678)";
    }

    if (!formData.password) {
      newErrors.password = "Password é obrigatória";
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors.join(", ");
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de password é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMedicalTab = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.bloodType) {
      newErrors.bloodType = "Tipo sanguíneo é obrigatório";
    }

    if (!formData.gender) {
      newErrors.gender = "Género é obrigatório";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Contacto de emergência é obrigatório";
    }

    if (!formData.emergencyPhone) {
      newErrors.emergencyPhone = "Telemóvel de emergência é obrigatório";
    } else if (!validatePhone(formData.emergencyPhone)) {
      newErrors.emergencyPhone = "Telemóvel de emergência inválido";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Deve aceitar os termos e condições";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro quando o utilizador começa a escrever
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const nextTab = () => {
    if (currentTab === "personal") {
      if (validatePersonalTab()) {
        setCompletedTabs(prev => [...prev.filter(tab => tab !== "personal"), "personal"]);
        setCurrentTab("medical");
      }
    }
  };

  const previousTab = () => {
    if (currentTab === "medical") {
      setCurrentTab("personal");
    }
  };

  const goToTab = (tab: TabStep) => {
    if (tab === "personal" || completedTabs.includes("personal")) {
      setCurrentTab(tab);
    }
  };

  const canGoToTab = (tab: TabStep): boolean => {
    if (tab === "personal") return true;
    return completedTabs.includes("personal");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateMedicalTab()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implementar registo real
      console.log("Dados do registo:", formData);
      
      // Sucesso - redirecionar para login
      alert("Registo realizado com sucesso! Pode agora fazer login.");
      
    } catch (error) {
      console.error("Erro no registo:", error);
      setErrors({ general: "Erro no registo. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleSubmit,
    validatePassword
  };
};
