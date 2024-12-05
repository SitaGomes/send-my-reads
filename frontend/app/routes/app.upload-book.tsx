import { ActionFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { z } from 'zod';
import { Button } from '~/components/basic';
import { useUser } from '~/hooks';

export const meta: MetaFunction = () => {
  return [{ title: 'Upload file | Send My Reads' }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.clone().formData();
    const file = formData.get('file');

    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json(
        {
          success: false,
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    return json(
      {
        success: false,
        errors: 'Unexpected error occurred',
      },
      { status: 500 },
    );
  }
};

export default function UploadBook() {
  const user = useUser();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  if (!user) return null;

  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <div className="my-4">
          <input
            type="file"
            name="file"
            accept=".epub,.pdf"
            required
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={navigation.state === 'submitting'}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {navigation.state === 'submitting' ? 'Uploading...' : 'Upload file'}
          </Button>
        </div>
      </Form>

      {actionData?.success === false && (
        <div className="text-red-500 mt-4">
          {actionData.errors && JSON.stringify(actionData.errors)}
        </div>
      )}
    </div>
  );
}
