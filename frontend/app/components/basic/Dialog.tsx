import {
  Description,
  Dialog as HeadlessUiDialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react';
import { Button } from './Button';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButton: React.ReactNode;
  children: React.ReactNode;
  description?: string;
};

export const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
  submitButton,
  description,
}: DialogProps) => {
  return (
    <HeadlessUiDialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          {description && <Description>{description}</Description>}
          {children}
          <div className="flex gap-4">
            <Button secondary onClick={onClose}>
              Cancel
            </Button>
            {submitButton}
          </div>
        </DialogPanel>
      </div>
    </HeadlessUiDialog>
  );
};
