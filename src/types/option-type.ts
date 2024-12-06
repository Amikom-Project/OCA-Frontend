export type TOptionsModel = {
  value: string;
  label: string;
};

export type TOptionsObjekPajakModel = {
  value: string;
  label: string;
  tarif_npwp: number;
  tarif_non_npwp: number;
};

export type TOptionsNamaPenerimaWajibPajakOrangPribadiModel = {
  value: string;
  label: string;
  nama_bank: string;
  no_rekening: string;
  nama_rekening: string;
  npwp: string;
};

export type TOptionsNamaPenerimaWajibPajakBadanUsahaModel = {
  value: string;
  label: string;
  nama_bank: string;
  no_rekening: string;
  nama_rekening: string;
  npwp: string;
  masa_berlaku_bebas_pph23: Date;
};
