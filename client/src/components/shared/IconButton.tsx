import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconClass: string;
}

const IconButton = ({ iconClass, children, onClick, type = 'button', ...rest }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button
      type={type}
      onClick={onClick}
      className="block shrink-0 rounded bg-white hover:bg-gray-200 p-1 text-gray-600 shadow-sm hover:text-gray-700"
      {...rest}
    >
      <i className={iconClass + ' text-xl'}></i>
    </button>
  );
};

export default IconButton;
