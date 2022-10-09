import './index.css';
import Modal from 'react-modal';
import Dropzone from '@components/dropzone';
import { useCallback, useState } from 'react';

export interface Props {
  showCloseButton?: boolean;
  confirmationData: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  };
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Modals = ({ confirmationData }: Props) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file: File) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        // setImages((prevState) => [...prevState, { id: cuid(), src: e.target.result }]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <Modal
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Example Modal"
      isOpen={confirmationData.isOpen}
      //   toggle={() => cancel()}
    >
      <Dropzone onDrop={onDrop} open={() => {}} />
    </Modal>
  );
};

export default Modals;
