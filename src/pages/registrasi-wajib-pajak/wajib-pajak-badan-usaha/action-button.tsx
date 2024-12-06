import React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ActionButtonsProps {
  kode_wajib_pajak_badan_usaha: string;
  onUpdate: (kode_wajib_pajak_badan_usaha: string) => void;
  onDelete: (kode_wajib_pajak_badan_usaha: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  kode_wajib_pajak_badan_usaha,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className='flex space-x-2'>
      <Button
        variant='warning'
        size='sm'
        onClick={() => onUpdate(kode_wajib_pajak_badan_usaha)}
      >
        <Icons.edit className='size-4 mr-2' />
        Edit
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='sm'>
            <Icons.trash className='size-4 mr-2' />
            Hapus
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah Anda Yakin Ingin Menghapus Data ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
              data secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Icons.left className='size-4 mr-2' />
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(kode_wajib_pajak_badan_usaha)}
            >
              <Icons.trash className='size-4 mr-2' />
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;
