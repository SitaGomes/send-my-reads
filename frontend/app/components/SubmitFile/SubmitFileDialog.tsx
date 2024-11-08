import { useEffect } from 'react';
import { useActionData, Form, useNavigation } from '@remix-run/react';
import { Button, Dialog } from '../basic';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { ActionFunctionArgs, json } from '@remix-run/node';

const UploadFileSchema = z.object({
  file: zfd.file(z.any()),
});

type ActionData = {
  errors?: {
    file?: string[];
  };
  error?: string;
  success?: boolean;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();

  const parsedData = UploadFileSchema.safeParse({
    file: formData.get('file'),
  });

  if (!parsedData.success) {
    return json({ errors: parsedData.error.format() }, { status: 400 });
  }

  try {
    const file = parsedData.data.file;

    console.log('Uploading file', file.name);

    return json({ success: true });
  } catch (error) {
    return json(
      { error: 'An error occurred during file upload' },
      { status: 500 },
    );
  }
}

type SubmitFileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SubmitFileDialog({
  isOpen,
  onClose,
}: SubmitFileDialogProps) {
  console.log('SubmitFileDialog', isOpen);
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isUploading = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.success) {
      toast.success('Compressed file sent to your email');
      onClose(); // Close modal on success
    }
    if (actionData?.error) {
      toast.error('An error occurred during file upload');
    }
  }, [actionData, onClose]);

  return (
    <div>
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
        <Form method="post" encType="multipart/form-data">
          <div className="my-4">
            <label htmlFor="file">Upload File:</label>
            <input type="file" name="file" accept=".epub,.pdf" required />
            {actionData?.errors?.file && (
              <p className="text-red-500">{actionData.errors.file[0]}</p>
            )}
          </div>

          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
        </Form>
      </Dialog>
    </div>
  );
}
