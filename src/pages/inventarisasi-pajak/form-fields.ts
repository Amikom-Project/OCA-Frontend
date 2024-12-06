import { TInventarisasiPajakFormSchema } from '@/types/inventarisasi-pajak-type';

export const getFieldsMetaDataInventarisasiPajak: {
  [K in keyof TInventarisasiPajakFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
    placeholder?: string | null;
  };
} = {
  uraian_kegiatan: {
    id: 'uraian_kegiatan',
    label: 'Uraian Kegiatan',
  },
  no_pengajuan: {
    id: 'no_pengajuan',
    label: 'Pengajuan Anggaran',
  },
  nominal_dpp: {
    id: 'nominal_dpp',
    label: 'Nominal DPP (Dasar Penghasilan Pajak)',
  },
  jenis_pajak: {
    id: 'jenis_pajak',
    label: 'Jenis Pajak',
    placeholder: 'Pilih Jenis Pajak',
  },
  kode_objek_pajak: {
    id: 'kode_objek_pajak',
    label: 'Objek Pajak',
  },
  nominal_pajak: {
    id: 'nominal_pajak',
    label: 'Nominal Pajak',
  },
  nama_pemotong: {
    id: 'nama_pemotong',
    label: 'Nama Pemotong',
  },
  npwp_pemotong: {
    id: 'npwp_pemotong',
    label: 'NPWP Pemotong',
  },
  file_bukti: {
    id: 'file_bukti',
    label: 'Upload FIle Bukti Dokumentasi',
    subLabel: 'Format FIle adalah PDF dan ukuran max file adalah 5 mb.',
  },
  idl: {
    id: 'idl',
    label: 'IDL',
  },
};
