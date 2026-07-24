import { useCallback, useMemo, useState } from 'react';
import { generatePassword } from '@/utils/generatePassword';
import { calculatePasswordStrength } from '@/utils/calculatePasswordStrength';
import type { PasswordOptions } from '@/types/password';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 12,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

type ToggleableOption = 'uppercase' | 'lowercase' | 'numbers' | 'symbols';

export function usePasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState<string>(() => generatePassword(DEFAULT_OPTIONS));

  const regenerate = useCallback(() => {
    setPassword(generatePassword(options));
  }, [options]);

  const setLength = useCallback((length: number) => {
    setOptions((prev) => ({ ...prev, length }));
  }, []);

  const toggleOption = useCallback((key: ToggleableOption) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  return { password, options, strength, regenerate, setLength, toggleOption };
}
