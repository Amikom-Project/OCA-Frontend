import { useState, useCallback } from 'react';

export const formatIDR = (num: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const useCurrencyInput = (initialValue: number) => {
  const [value, setValue] = useState<string>(formatIDR(initialValue));

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = parseInt(rawValue, 10) || 0;
    setValue(formatIDR(numericValue));
    return numericValue;
  }, []);

  return { value, onChange };
};

export default useCurrencyInput;
