import DummyProfile from '@assets/dummyProfile.svg';
import useToast from '@lib/hooks/useToast';
import useAuthStore from '@lib/stores/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header = ({ darkMode, toggleDarkMode }: Props) => {
  const navigate = useNavigate();
  const { success } = useToast();
  const { logout, authUser } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const logoutUser = () => {
    logout();
    success('Successfully logged out');
    navigate('/');
  };

  return (
    <header className="bg-gray-50 dark:bg-gray-700 flex flex-row justify-between w-full px-6 border-solid border border-gray-200 dark:border-gray-700">
      <Link to="/">
        <div className="my-3 flex flex-row justify-center items-center gap-2">
          <div className="bg-gray-200 w-9 p-0.5 rounded-lg flex justify-center items-center">
            <i className="bx bx-data opacity-50 text-2xl text-gray-700 dark:text-gray-500"></i>
          </div>
          <span className="whitespace-nowrap font-bold text-xl">File Manager</span>
        </div>
      </Link>

      <nav className="flex flex-row items-center gap-5">
        {authUser && (
          <Link
            to="/"
            className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <p>Dashboard</p>
          </Link>
        )}
        {authUser && (
          <Link
            to="/files"
            className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <p>Files</p>
          </Link>
        )}

        <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg">
          <button type="button" onClick={toggleDarkMode} className="text-[1.65rem] flex items-center">
            {darkMode ? <i className="bx bx-sun"></i> : <i className="bx bx-moon"></i>}
          </button>
        </div>

        {authUser && (
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center relative">
            <button onClick={() => setShowMenu(!showMenu)}>
              <img src={DummyProfile} alt="profile"></img>
            </button>
            <div
              style={{ display: showMenu ? 'flex' : 'none' }}
              className="absolute right-0 z-10 mt-20 origin-top-right rounded-md bg-white shadow-lg"
            >
              <div className="py-1 whitespace-nowrap" role="none">
                <button
                  onClick={logoutUser}
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm text-center w-full"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
