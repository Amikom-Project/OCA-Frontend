import { TPPh21PenerimaFormSchema } from '@/types/pph-21-penerima-type';
import formatMonth from '@/utils/formatMonth';

const getMonth = new Date().getMonth();
const month = formatMonth(getMonth);

export const getFieldsMetaDataPPh21Penerima: {
  [K in keyof TPPh21PenerimaFormSchema]: {
    id: K;
    label: string;
    subLabel?: string | null;
    placeholder?: string | null;
  };
} = {
  nama: {
    id: 'nama',
    label: 'Nama Penerima',
  },
  status_pegawai: {
    id: 'status_pegawai',
    label: 'Status Pegawai',
  },
  nik: {
    id: 'nik',
    label: 'NIK',
  },
  no_passport: {
    id: 'no_passport',
    label: 'No Passport',
  },
  npwp: {
    id: 'npwp',
    label: 'NPWP',
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
  penghasilan_bulanan: {
    id: 'penghasilan_bulanan',
    label: `Penghasilan Penerima Selama Bulan ${month}`,
  },
  metode_potong: {
    id: 'metode_potong',
    label: 'Metode Potong',
    placeholder: 'Pilih Metode Potong',
  },
  kode_objek_pajak: {
    id: 'kode_objek_pajak',
    label: 'Objek Pajak',
  },
  penghasilan_bruto: {
    id: 'penghasilan_bruto',
    label: 'Penghasilan Bruto',
  },
  tarif_berlaku: {
    id: 'tarif_berlaku',
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
  status: {
    id: 'status',
    label: 'Status',
  },
  idl: {
    id: 'idl',
    label: 'IDL',
  },
};
