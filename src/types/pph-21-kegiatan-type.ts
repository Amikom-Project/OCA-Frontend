export type TPPh21KegiatanFormSchema = {
  jenis_penghasilan: string;
  uraian_kegiatan: string;
  no_pengajuan: string;
  pic_pencairan_penghasilan: string;
  minta_billing_sendiri: string;
  idl: string;
};

export type TPPh21KegiatanModel = {
  kode_kegiatan_penghasilan_orang_pribadi: string;
  tanggal_input: string;
  uraian_kegiatan: string;
  no_pengajuan: string;
  jenis_penghasilan: string;
  total_potongan_pajak: string;
  total_penghasilan_bruto: string;
};

export type TPPh21KegiatanSingleModel = {
  kode_kegiatan_penghasilan_orang_pribadi: string;
  kode_jenis_pajak: number;
  jenis_penghasilan: string;
  uraian_kegiatan: string;
  no_pengajuan: string;
  pic_pencairan_penghasilan: string;
  minta_billing_sendiri: string;
  idl: string;
  tanggal_input: Date;
};
