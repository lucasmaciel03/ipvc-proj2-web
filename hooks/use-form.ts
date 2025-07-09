"use client";

import { useState, useCallback } from 'react';
import { ValidationResult, validateForm } from '@/lib/validations';

/**
 * Form state interface
 */
interface FormState<T> {
  data: T;
  errors: Record<keyof T, string[]>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  touchedFields: Set<keyof T>;
}

/**
 * Form validation rules type
 */
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K], formData: T) => ValidationResult;
};

/**
 * Form options interface
 */
interface UseFormOptions<T> {
  initialData: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Enhanced form hook with validation and error handling
 * Implements Clean Code principles with separation of concerns
 */
export function useForm<T extends Record<string, any>>({
  initialData,
  validationRules = {},
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: { ...initialData },
    errors: {} as Record<keyof T, string[]>,
    isValid: true,
    isSubmitting: false,
    isDirty: false,
    touchedFields: new Set(),
  });

  /**
   * Validate a specific field
   */
  const validateField = useCallback((field: keyof T, value: T[keyof T], currentData: T): string[] => {
    const rule = validationRules[field];
    if (!rule) return [];

    const result = rule(value, currentData);
    return result.isValid ? [] : result.errors;
  }, [validationRules]);

  /**
   * Validate entire form
   */
  const validateFormData = useCallback((data: T): Record<keyof T, string[]> => {
    const errors = {} as Record<keyof T, string[]>;

    Object.keys(validationRules).forEach((field) => {
      const fieldKey = field as keyof T;
      const fieldErrors = validateField(fieldKey, data[fieldKey], data);
      if (fieldErrors.length > 0) {
        errors[fieldKey] = fieldErrors;
      }
    });

    return errors;
  }, [validationRules, validateField]);

  /**
   * Update form data and optionally validate
   */
  const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setFormState(prevState => {
      const newData = { ...prevState.data, [field]: value };
      const newTouchedFields = new Set(prevState.touchedFields).add(field);
      
      let newErrors = { ...prevState.errors };
      
      // Validate field if validateOnChange is enabled
      if (validateOnChange) {
        const fieldErrors = validateField(field, value, newData);
        if (fieldErrors.length > 0) {
          newErrors[field] = fieldErrors;
        } else {
          delete newErrors[field];
        }
      }

      const isValid = Object.keys(newErrors).length === 0;
      const isDirty = JSON.stringify(newData) !== JSON.stringify(initialData);

      return {
        ...prevState,
        data: newData,
        errors: newErrors,
        isValid,
        isDirty,
        touchedFields: newTouchedFields,
      };
    });
  }, [initialData, validateOnChange, validateField]);

  /**
   * Handle field blur event
   */
  const handleFieldBlur = useCallback((field: keyof T) => {
    if (!validateOnBlur) return;

    setFormState(prevState => {
      const fieldErrors = validateField(field, prevState.data[field], prevState.data);
      const newErrors = { ...prevState.errors };
      
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors;
      } else {
        delete newErrors[field];
      }

      const isValid = Object.keys(newErrors).length === 0;

      return {
        ...prevState,
        errors: newErrors,
        isValid,
      };
    });
  }, [validateOnBlur, validateField]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormState({
      data: { ...initialData },
      errors: {} as Record<keyof T, string[]>,
      isValid: true,
      isSubmitting: false,
      isDirty: false,
      touchedFields: new Set(),
    });
  }, [initialData]);

  /**
   * Set form data programmatically
   */
  const setFormData = useCallback((newData: Partial<T>) => {
    setFormState(prevState => {
      const updatedData = { ...prevState.data, ...newData };
      const errors = validateFormData(updatedData);
      const isValid = Object.keys(errors).length === 0;
      const isDirty = JSON.stringify(updatedData) !== JSON.stringify(initialData);

      return {
        ...prevState,
        data: updatedData,
        errors,
        isValid,
        isDirty,
      };
    });
  }, [initialData, validateFormData]);

  /**
   * Validate entire form manually
   */
  const validateAll = useCallback(() => {
    const errors = validateFormData(formState.data);
    const isValid = Object.keys(errors).length === 0;

    setFormState(prevState => ({
      ...prevState,
      errors,
      isValid,
    }));

    return isValid;
  }, [formState.data, validateFormData]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate all fields before submission
    if (!validateAll()) {
      return;
    }

    if (!onSubmit) {
      return;
    }

    setFormState(prevState => ({ ...prevState, isSubmitting: true }));

    try {
      await onSubmit(formState.data);
      // Reset form on successful submission
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission errors if needed
    } finally {
      setFormState(prevState => ({ ...prevState, isSubmitting: false }));
    }
  }, [formState.data, onSubmit, validateAll, resetForm]);

  /**
   * Get field props for easy integration with form controls
   */
  const getFieldProps = useCallback((field: keyof T) => ({
    value: formState.data[field] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFieldValue(field, e.target.value as T[keyof T]);
    },
    onBlur: () => handleFieldBlur(field),
    error: formState.errors[field]?.[0] || '',
    hasError: (formState.errors[field]?.length || 0) > 0,
  }), [formState.data, formState.errors, setFieldValue, handleFieldBlur]);

  return {
    // Form state
    data: formState.data,
    errors: formState.errors,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    isDirty: formState.isDirty,
    touchedFields: formState.touchedFields,

    // Actions
    setFieldValue,
    setFormData,
    resetForm,
    validateAll,
    handleSubmit,
    getFieldProps,
    handleFieldBlur,
  };
}
