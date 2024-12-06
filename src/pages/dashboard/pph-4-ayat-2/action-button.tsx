import React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface ActionButtonsProps {
  kode_kegiatan_penghasilan_badan_usaha: string;
  onUpdate: (kode_kegiatan_penghasilan_badan_usaha: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  kode_kegiatan_penghasilan_badan_usaha,
  onUpdate,
}) => {
  return (
    <div className='flex space-x-2'>
      <Button
        variant='warning'
        size='sm'
        onClick={() => onUpdate(kode_kegiatan_penghasilan_badan_usaha)}
      >
        <Icons.edit className='size-4 mr-2' />
        Edit
      </Button>
    </div>
  );
};

export default ActionButtons;
