import { useState } from 'react';

type FileUploadHook = {
  fileName: string | null;
  base64File: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useFileUpload = (): FileUploadHook => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const base64 = await toBase64(file);

      if (typeof base64 === 'string') {
        const base64WithoutPrefix = base64.split(',')[1];
        setBase64File(base64WithoutPrefix);
      }
    }
  };

  const toBase64 = (file: File): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return { fileName, base64File, handleFileChange };
};
