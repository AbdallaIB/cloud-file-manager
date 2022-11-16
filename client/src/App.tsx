import Header from '@components/header';
import Routes from '@routes/Routes';
import { PageTitles } from '@utils/index';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const path: keyof typeof PageTitles = pathname as any;
    document.title = PageTitles[path] ?? 'File Manager';
  }, [pathname]);

  return (
    <div className={'mainContainer ' + (darkMode ? 'dark' : '')}>
      <div className="flex h-full flex-col w-full bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 dark:hover:text-white">
        <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}></Header>
        <main className="h-full">
          <Routes />
        </main>
      </div>
      {/* Toast Container */}
      <Toaster
        toastOptions={{
          className: 'bg-gray-50 dark:bg-gray-700',
          position: 'top-center',
          style: { color: 'white' },
        }}
      />
    </div>
  );
};

export default App;
