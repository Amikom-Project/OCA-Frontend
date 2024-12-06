import { toast } from 'sonner';

type DeleteFunction = (kode: string, token: string) => Promise<void>;

interface UseDeleteDataReturn {
  handleDelete: (kode: string) => Promise<void>;
}

export const useDeleteData = (
  deleteFunction: DeleteFunction,
  token: string,
  refetch: () => void
): UseDeleteDataReturn => {
  const handleDelete = async (kode: string) => {
    try {
      await deleteFunction(kode, token);
      toast.success('Data berhasil dihapus !');
      refetch();
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error(`Error: ${errorMessage}`);
      toast.error('Terjadi kesalahan saat menghapus data.');
    }
  };

  return { handleDelete };
};
