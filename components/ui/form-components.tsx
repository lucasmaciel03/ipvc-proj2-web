import React from 'react';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { ChevronDownIcon, CheckIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export function Select({ options, value, onChange, placeholder, error, label, required, icon }: SelectProps) {
  return (
    <div className="space-y-3">
      {label && (
        <Label htmlFor={label} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {icon}
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <select
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3.5 pr-10 border-2 rounded-xl shadow-sm transition-all duration-200 
            bg-white focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/20 focus:border-[#00C9A7] 
            hover:border-gray-400 text-gray-900 text-sm
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'}`}
        >
          {placeholder && (
            <option value="" className="text-gray-500">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 animate-fadeIn">
          <XMarkIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface TextareaFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  rows?: number;
  icon?: React.ReactNode;
}

export function TextareaField({ value, onChange, placeholder, error, label, required, rows = 4, icon }: TextareaFieldProps) {
  return (
    <div className="space-y-3">
      {label && (
        <Label htmlFor={label} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          {icon}
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3.5 border-2 rounded-xl shadow-sm transition-all duration-200 
          resize-none focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/20 focus:border-[#00C9A7] 
          hover:border-gray-400 text-gray-900 text-sm placeholder-gray-400
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'}`}
      />
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 animate-fadeIn">
          <XMarkIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  error?: string;
  required?: boolean;
}

export function Checkbox({ checked, onChange, label, error, required }: CheckboxProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            onClick={() => onChange(!checked)}
            className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center
              ${checked 
                ? 'bg-[#00C9A7] border-[#00C9A7] shadow-sm' 
                : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
          >
            {checked && <CheckIcon className="h-3 w-3 text-white stroke-2" />}
          </div>
        </div>
        <label 
          onClick={() => onChange(!checked)}
          className="text-sm text-gray-700 cursor-pointer leading-relaxed flex-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 animate-fadeIn ml-8">
          <XMarkIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  showStrength?: boolean;
}

export function PasswordInput({ value, onChange, placeholder, error, label, required, showStrength = false }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-3">
      {label && (
        <Label htmlFor={label} className="text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          id={label}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl shadow-sm transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-[#00C9A7]/20 focus:border-[#00C9A7] 
            hover:border-gray-400 text-gray-900 text-sm placeholder-gray-400
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200'}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      {showStrength && <PasswordStrength password={value} />}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 animate-fadeIn">
          <XMarkIcon className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const getRequirements = (pass: string) => [
    { met: pass.length >= 8, text: '8+ caracteres' },
    { met: /[A-Z]/.test(pass), text: 'Maiúscula' },
    { met: /[a-z]/.test(pass), text: 'Minúscula' },
    { met: /[0-9]/.test(pass), text: 'Número' },
    { met: /[^A-Za-z0-9]/.test(pass), text: 'Símbolo' },
  ];

  const strength = calculateStrength(password);
  const strengthLabels = ['Muito Fraca', 'Fraca', 'Regular', 'Boa', 'Excelente'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-600'
  ];
  
  const requirements = getRequirements(password);

  if (!password) return null;

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-gray-600">Força da senha</span>
        <span className={`text-xs font-semibold ${
          strength >= 4 ? 'text-emerald-600' : 
          strength >= 3 ? 'text-green-600' : 
          strength >= 2 ? 'text-yellow-600' : 
          'text-red-600'
        }`}>
          {strengthLabels[strength - 1] || 'Muito Fraca'}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${
            strengthColors[strength - 1] || 'bg-red-500'
          }`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
              req.met ? 'bg-emerald-500' : 'bg-gray-300'
            }`} />
            <span className={`text-xs transition-colors duration-200 ${
              req.met ? 'text-emerald-600' : 'text-gray-500'
            }`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
