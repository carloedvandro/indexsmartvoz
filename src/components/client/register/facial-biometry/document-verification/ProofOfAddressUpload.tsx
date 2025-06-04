
import { Upload, FileCheck } from "lucide-react";

interface ProofOfAddressUploadProps {
  file: File | undefined;
  onFileChange: (file: File) => void;
}

export const ProofOfAddressUpload = ({ file, onFileChange }: ProofOfAddressUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-2">Comprovante de Residência</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="address-upload"
      />
      <label
        htmlFor="address-upload"
        className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
      >
        {file ? (
          <div className="flex items-center text-green-600">
            <FileCheck className="w-6 h-6 mr-2" />
            <span>{file.name}</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500">
            <Upload className="w-6 h-6 mr-2" />
            <span>Clique para enviar</span>
          </div>
        )}
      </label>
    </div>
  );
};
