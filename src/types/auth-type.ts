export type TAuthFormSchema = {
  user_id: string;
  password: string;
};

export type TAuthModel = {
  nip: string;
  idl: string[];
  nama_pegawai: string;
  nama_satker: string[];
  access_token: string;
};
