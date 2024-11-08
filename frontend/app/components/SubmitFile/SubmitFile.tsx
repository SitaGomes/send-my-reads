import { useState } from 'react';
import { Button } from '../basic';
import SubmitFileDialog from './SubmitFileDialog';

export default function SubmitFile() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    console.log('ola munfo');
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Submit File</Button>
      <SubmitFileDialog isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
