import { TPPh23FormSchema } from '@/types/pph-23-type';

export const getFieldsMetaDataPPh23: {
  [K in keyof TPPh23FormSchema]: {
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
    label: 'Pengajuan Anggaran',
  },
  target_penerima: {
    id: 'target_penerima',
    label: 'Target Penerima',
    placeholder: 'Pilih Target Penerima',
  },
  nama_penerima: {
    id: 'nama_penerima',
    label: 'Nama Penerima',
  },
  nama_bank: {
    id: 'nama_bank',
    label: 'Nama Bank',
  },
  no_rekening: {
    id: 'no_rekening',
    label: 'No Rekening',
  },
  nama_rekening: {
    id: 'nama_rekening',
    label: 'Nama Rekening',
  },
  npwp: {
    id: 'npwp',
    label: 'NPWP',
  },
  kode_objek_pajak: {
    id: 'kode_objek_pajak',
    label: 'Objek Pajak',
  },
  penghasilan_bruto: {
    id: 'penghasilan_bruto',
    label: 'Penghasilan Bruto',
  },
  tarif_pajak: {
    id: 'tarif_pajak',
    label: 'Tarif Pajak',
  },
  potongan_pajak: {
    id: 'potongan_pajak',
    label: 'Potongan Pajak',
  },
  penghasilan_diterima: {
    id: 'penghasilan_diterima',
    label: 'Penghasilan Diterima',
  },
  pic_pencairan_penghasilan: {
    id: 'pic_pencairan_penghasilan',
    label: 'PIC (Pencairan Penghasilan)',
    placeholder: 'Pilih PIC (Pencairan Penghasilan)',
  },
  invoice: {
    id: 'invoice',
    label: 'File Invoice',
    subLabel: 'Format FIle adalah PDF dan ukuran max file adalah 5 mb.',
  },
  faktur_pajak: {
    id: 'faktur_pajak',
    label: 'File Faktur Pajak',
    subLabel: 'Format FIle adalah PDF dan ukuran max file adalah 5 mb.',
  },
  dokumen_kerjasama_kegiatan: {
    id: 'dokumen_kerjasama_kegiatan',
    label: 'File Dokumen Kerjasama Kegiatan',
    subLabel: 'Format FIle adalah PDF dan ukuran max file adalah 5 mb.',
  },
  idl: {
    id: 'idl',
    label: 'IDL',
  },
};
