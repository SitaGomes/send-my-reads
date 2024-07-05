'use client';
import { Text } from '@mantine/core';
import { useDropzone } from 'react-dropzone';
import { UseFormSetValue } from 'react-hook-form';
import { SubmitFileSchema } from './SubmitFile';

type Props = {
  setValue: UseFormSetValue<SubmitFileSchema>;
  selectedFile: string;
};

export const UploadFile = ({ setValue, selectedFile }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/epub+zip': ['.epub'] },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setValue('fileName', acceptedFiles[0].name);
      setValue('file', acceptedFiles[0]);
    },
  });
  return (
    <div className="my-4">
      <div
        {...getRootProps()}
        className="border-2 border-black rounded-md text-center p-5 cursor-pointer hover:bg-slate-700 hover:shadow-md transition-colors duration-150 ease-in-out mt-4"
      >
        <input {...getInputProps()} />
        <Text>Drag and drop your file here, or click to select</Text>
      </div>
      <div className="flex gap-2 justify-center items-center mt-4">
        <Text>Selected epub:</Text>
        <Text fw={'bold'}>{selectedFile || '-'}</Text>
      </div>
    </div>
  );
};
