import Header from '@components/header';
import Sidebar from '@components/sidebar';
import Routes from '@routes/Routes';
import { PageTitles } from '@utils/index';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const path: keyof typeof PageTitles = pathname as any;
    document.title = PageTitles[path] ?? 'File Manager';
  }, [pathname]);
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
