import './index.css';
import Modal from 'react-modal';
import { ReactNode } from 'react';
import Button from '@components/shared/Button';

export interface Props {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
  confirmText: string;
  styles: { content: { height: string; width: string } };
  hasFooter: boolean;
  cancel: () => void;
  confirm: () => void;
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

const Modals = ({ title, isOpen, children, cancel, confirm, confirmText, styles, hasFooter = true }: Props) => {
  return (
    <Modal
      style={{ content: { ...customStyles.content, ...styles.content, padding: '0px' } }}
      ariaHideApp={false}
      contentLabel={title}
      isOpen={isOpen}
    >
      <section className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 dark:hover:text-white p-4">
        <header className="header">
          <h2 className="font-medium"> {title} </h2>
          <button className="h-full text-2xl" onClick={() => cancel()}>
            <i className="bx bx-x"></i>
          </button>
        </header>
        <main
          className={'flex flex-col items-center justify-center w-full'}
          style={{ borderBottom: hasFooter ? '1px solid #dddddd' : '', height: '85%' }}
        >
          {children}
        </main>
        {hasFooter && (
          <footer className="footer">
            <Button text="Cancel" onClick={() => cancel()} color="gray"></Button>
            <Button text={confirmText} onClick={() => confirm()} isPrimary></Button>
          </footer>
        )}
      </section>
    </Modal>
  );
};

export default Modals;
