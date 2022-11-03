import Header from '@components/header';
import Sidebar from '@components/sidebar';
import Routes from '@routes/Routes';
import './App.css';

const App = () => {
  return (
    <div className="mainContainer bg-gray-50">
      <Sidebar></Sidebar>
      <div className="flex h-full flex-col w-full">
        <Header></Header>
        <Routes />
      </div>
    </div>
  );
};

export default App;
