import { useState } from 'react';
import { Button, Dialog } from '../basic';
import toast from 'react-hot-toast';

type SubmitFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SubmitFileDialog({
  isOpen,
  onClose,
}: SubmitFileDialogProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    try {
      const response = await fetch('/bookshelf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Compressed file sent to your email');
        onClose();
      } else {
        toast.error(result.error || 'An error occurred during file upload');
      }
    } catch (error) {
      toast.error('An error occurred during file upload');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Submit File"
      submitButton={
        <Button
          isLoading={isUploading}
          loadingText="Uploading..."
          type="submit"
        >
          Upload file
        </Button>
      }
      description="Select a file to upload."
    >
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="file">Upload File:</label>
          <input type="file" name="file" accept=".epub,.pdf" required />
        </div>
      </form>
    </Dialog>
  );
}
