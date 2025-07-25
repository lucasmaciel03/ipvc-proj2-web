import { useState } from "react";

export interface RegisterFormData {
  // Dados Pessoais
  email: string;
  firstName: string;
  lastName: string;
  nif: string;
  nus: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Dados Médicos
  bloodType: string;
  birthDate: string;
  gender: string;
  
  // Contacto de Emergência
  emergencyContact: string;
  emergencyPhone: string;
  
  // Informações Médicas
  allergies: string;
  
  // Termos
  acceptTerms: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    firstName: "",
    lastName: "",
    nif: "",
    nus: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    birthDate: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: "",
    acceptTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateNIF = (nif: string): boolean => {
    // Validação básica de NIF português (9 dígitos)
    const nifRegex = /^[0-9]{9}$/;
    return nifRegex.test(nif);
  };

  const validateNUS = (nus: string): boolean => {
    // Validação básica de NUS (9 dígitos)
    const nusRegex = /^[0-9]{9}$/;
    return nusRegex.test(nus);
  };

  const validatePhone = (phone: string): boolean => {
    // Validação de telemóvel português (9 dígitos começando por 9)
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validações obrigatórias
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

    if (!formData.nus) {
      newErrors.nus = "NUS é obrigatório";
    } else if (!validateNUS(formData.nus)) {
      newErrors.nus = "NUS deve ter 9 dígitos";
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

    if (!formData.birthDate) {
      newErrors.birthDate = "Data de nascimento é obrigatória";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
    updateField,
    handleSubmit,
    validatePassword
  };
};
