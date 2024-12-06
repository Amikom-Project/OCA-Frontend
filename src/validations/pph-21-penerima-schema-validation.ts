import { z } from 'zod';

export const PPh21PenerimaValidation = z.object({
  kode_wajib_pajak_orang_pribadi: z.string({
    required_error: 'Nama Penerima tidak boleh kosong !',
  }),
  metode_potong: z.string({
    required_error: 'Metode Potong tidak boleh kosong !',
  }),
  kode_objek_pajak: z.string({
    required_error: 'Objek Pajak tidak boleh kosong !',
  }),
  penghasilan_bruto: z
    .number({
      required_error: 'Penghasilan Bruto tidak boleh kosong !',
    })
    .positive(),
});
