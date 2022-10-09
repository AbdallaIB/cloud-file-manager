import Header from '@components/header';
import Modal from '@components/modal';
import Sidebar from '@components/sidebar';
import Routes from '@routes/Routes';
import { useState } from 'react';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isModalOpen, setModalState] = useState(true);

  return (
    <div className="mainContainer bg-gray-50">
      {/* <div>test</div> */}
      <Sidebar></Sidebar>

      {isModalOpen && (
        <div>
          <Modal
            confirmationData={{
              isOpen: isModalOpen,
              onCancel: () => {
                setModalState(false);
              },
              onConfirm: () => {},
            }}
          ></Modal>
        </div>
      )}
      <div className="flex h-full flex-col w-full">
        <Header></Header>
        <Routes />
      </div>
    </div>
  );
}

export default App;
