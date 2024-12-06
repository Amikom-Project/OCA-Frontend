import React, { useCallback } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

export default function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = React.useState(search);

  const [debouncedValue] = useDebounce(searchTerm, 1000);

  const handleSettingSearchParams = useCallback(
    (newSearchValue: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (
        newSearchValue === '' ||
        newSearchValue === undefined ||
        !newSearchValue
      ) {
        newSearchParams.delete('search');
      } else {
        newSearchParams.set('page', '1');
        newSearchParams.set('search', newSearchValue);
      }
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  React.useEffect(() => {
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);

  return (
    <Input
      placeholder='Cari...'
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className='w-full md:max-w-sm'
    />
  );
}
