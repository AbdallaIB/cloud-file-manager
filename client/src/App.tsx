import Header from '@components/header';
import Sidebar from '@components/sidebar';
import Routes from '@routes/Routes';
import { useState } from 'react';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="mainContainer bg-gray-50">
      {/* <div>test</div> */}
      <Sidebar></Sidebar>
      <Header></Header>
      {/* <Routes /> */}
    </div>
  );
}

export default App;
