import IconButton from '@components/shared/icon-button';
import useToast from '@lib/hooks/useToast';
import useAuthStore from '@lib/stores/auth';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const { logout, getUser } = useAuthStore();

  const logoutUser = async () => {
    logout();
    success('Successfully logged out');
    navigate('/');
  };

  return (
    <div className={'flex h-screen flex-col justify-between border-r bg-white w-16'}>
      <div className={'flex flex-col w-16 items-center justify-center'}>
        <div className="my-3 flex justify-center bg-gray-200 w-10 p-1 rounded-lg">
          <span>
            <i className="bx bx-data opacity-50 text-2xl"></i>
          </span>
        </div>

        <nav className="flex flex-col space-y-1 gap-1 border-t border-gray-100">
          {getUser() && (
            <Link
              to="/dashboard"
              className="flex items-center rounded-lg hover:bg-gray-50 mt-2 px-4 py-2 text-gray-700 group relative"
            >
              <i className="bx bx-bar-chart-alt-2 opacity-75 text-xl"></i>

              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Dashboard
              </span>
            </Link>
          )}
          {getUser() && (
            <Link
              to="/"
              className="flex items-center rounded-lg hover:bg-gray-50 px-4 py-2 text-gray-700 group relative"
            >
              <i className="bx bx-file opacity-75 text-xl"></i>

              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Files
              </span>
            </Link>
          )}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex justify-center p-1 rounded-lg">
          {getUser() && (
            <div className="group relative">
              <IconButton onClick={logoutUser} iconClass="bx bx-log-out opacity-75 text-xl"></IconButton>
              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
