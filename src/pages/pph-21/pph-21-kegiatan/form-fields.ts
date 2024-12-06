import { TPPh21KegiatanFormSchema } from '@/types/pph-21-kegiatan-type';

export const getFieldsMetaDataPPh21Kegiatan: {
  [K in keyof TPPh21KegiatanFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
    placeholder?: string | null;
  };
} = {
  jenis_penghasilan: {
    id: 'jenis_penghasilan',
    label: 'Jenis Penghasilan',
  },
  uraian_kegiatan: {
    id: 'uraian_kegiatan',
    label: 'Uraian Kegiatan',
  },
  no_pengajuan: {
    id: 'no_pengajuan',
    label: 'No Pengajuan Anggaran',
  },
  pic_pencairan_penghasilan: {
    id: 'pic_pencairan_penghasilan',
    label: 'PIC (Pencairan Penghasilan)',
    placeholder: 'Pilih PIC (Pencairan Penghasilan)',
  },
  minta_billing_sendiri: {
    id: 'minta_billing_sendiri',
    label: 'Menghendaki Billing Terpisah ?',
  },
  idl: {
    id: 'idl',
    label: 'IDL',
  },
};
