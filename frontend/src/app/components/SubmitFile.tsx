'use client';
import { Button, Input, Text } from '@mantine/core';
import { ENDPOINTS } from '@/contants/ENDPOINTS';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';

import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { UploadFile } from './UploadFile';

const schema = zod.object({
  email: zod.string().email(),
  fileName: zod.string({ required_error: 'File is required' }),
  file: zod.any(),
});

export type SubmitFileSchema = zod.infer<typeof schema>;

export const SubmitFile = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubmitFileSchema>({
    resolver: zodResolver(schema),
  });
  const [isUploading, setIsUploading] = useState(false);
  const watchFileName = watch('fileName');

  const onSubmit = async (data: SubmitFileSchema) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('file', data.file);

      await api.post(ENDPOINTS.UPLOAD_FILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Compressed file sent to your email');
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setIsUploading(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input {...register('email')} placeholder="Type your email" />
        {errors.email && <Text c="red">{errors.email.message}</Text>}
      </div>
      <UploadFile setValue={setValue} selectedFile={watchFileName} />
      {errors.fileName && <Text c="red">{errors.fileName.message}</Text>}
      <div>
        <Button type="submit" color="orange" w={'100%'} loading={isUploading}>
          Compress and send
        </Button>
      </div>
    </form>
  );
};
