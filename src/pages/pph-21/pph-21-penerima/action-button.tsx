import React from 'react';
import { Link } from 'react-router-dom';

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
  kode_kegiatan_penghasilan_orang_pribadi: string;
  kode_item_kegiatan_penghasilan_orang_pribadi: string;
  onDelete: (kode_item_kegiatan_penghasilan_orang_pribadi: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  kode_kegiatan_penghasilan_orang_pribadi,
  kode_item_kegiatan_penghasilan_orang_pribadi,
  onDelete,
}) => {
  return (
    <div className='flex space-x-2'>
      <Link
        to={`/pph-21/data-pph-21-kegiatan/data-pph-21-penerima/form-edit-pph-21-penerima/${kode_kegiatan_penghasilan_orang_pribadi}/${kode_item_kegiatan_penghasilan_orang_pribadi}`}
      >
        <Button variant='warning' size='sm'>
          <Icons.edit className='size-4 mr-2' />
          Edit
        </Button>
      </Link>
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
              onClick={() =>
                onDelete(kode_item_kegiatan_penghasilan_orang_pribadi)
              }
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
