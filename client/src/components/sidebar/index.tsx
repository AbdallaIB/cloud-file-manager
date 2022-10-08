import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className={'flex h-screen flex-col justify-between border-r bg-white ' + (showSidebar ? '' : 'w-16')}>
      <div className={showSidebar ? 'px-4 py-6' : 'flex flex-col w-16 items-center justify-center'}>
        <div className="my-3 flex justify-center bg-gray-200 w-10 p-1 rounded-lg">
          <span>
            <i className="bx bx-data opacity-50 text-2xl"></i>
          </span>
        </div>

        <nav className="mt-4 flex flex-col space-y-1 gap-1 border-t border-gray-100">
          <Link
            to="/dashboard"
            className="flex items-center rounded-lg hover:bg-gray-50 mt-2 px-4 py-2 text-gray-700 group relative"
          >
            <i className="bx bx-bar-chart-alt-2 opacity-75 text-xl"></i>
            {showSidebar ? (
              <span className="ml-3 text-sm font-medium"> Dashboard </span>
            ) : (
              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Dashboard
              </span>
            )}
          </Link>
          <Link
            to="/storage"
            className="flex items-center rounded-lg hover:bg-gray-50 px-4 py-2 text-gray-700 group relative"
          >
            <i className="bx bx-file opacity-75 text-xl"></i>
            {showSidebar ? (
              <span className="ml-3 text-sm font-medium"> Storage </span>
            ) : (
              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Storage
              </span>
            )}
          </Link>
          <Link
            to="/settings"
            className="flex items-center rounded-lg hover:bg-gray-50 px-4 py-2 text-gray-700 group relative"
          >
            <i className="bx bx-cog opacity-75 text-xl"></i>
            {showSidebar ? (
              <span className="ml-3 text-sm font-medium"> Settings </span>
            ) : (
              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Settings
              </span>
            )}
          </Link>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        {!showSidebar ? (
          <div className="flex justify-center p-1 rounded-lg">
            <Link
              to="/settings"
              className="flex group items-center rounded-lg hover:bg-gray-50 px-4 py-2 text-gray-700"
            >
              <i className="bx bx-log-out opacity-75 text-xl"></i>
              <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            </Link>
          </div>
        ) : (
          <div
            className="flex shrink-0 items-center bg-white p-4 hover:bg-gray-50 py-4 px-4"
            style={{ paddingRight: '6rem' }}
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="ml-1.5">
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
