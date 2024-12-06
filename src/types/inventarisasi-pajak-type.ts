export type TInventarisasiPajakFormSchema = {
  uraian_kegiatan: string;
  no_pengajuan: string;
  nominal_dpp: number;
  jenis_pajak: string;
  kode_objek_pajak: string;
  nominal_pajak: number;
  nama_pemotong: string;
  npwp_pemotong: string;
  file_bukti: string;
  idl: string;
};

export type TInventarisasiPajakModel = {
  kode_inventarisasi_pajak: string;
  uraian_kegiatan: string;
  no_pengajuan: string;
  nominal_dpp: number;
  jenis_pajak: string;
  kode_objek_pajak: string;
  nominal_pajak: number;
  nama_pemotong: string;
  npwp_pemotong: string;
  file_bukti: string;
  idl: string;
  tanggal_input: Date;
};
