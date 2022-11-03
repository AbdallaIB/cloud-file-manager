import { useState } from 'react';

interface Props {
  deleteFile: () => void;
}
const DropDownMenu = ({ deleteFile }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
        >
          <i className="bx bx-dots-horizontal-rounded"></i>
        </button>
      </div>

      <div
        style={{ display: showMenu ? 'flex' : 'none' }}
        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <button
            onClick={deleteFile}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
            role="menuitem"
            id="menu-item-0"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
