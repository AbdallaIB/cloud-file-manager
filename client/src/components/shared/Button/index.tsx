import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPrimary?: boolean;
  iconClass?: string;
  color?: 'gray' | 'white';
}

const Button = ({ text, isPrimary = false, iconClass, color = 'white', children, onClick, type, ...rest }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <>
      <button
        className={
          isPrimary
            ? 'gap-1 justify-center flex-row text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm py-1 px-5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            : 'flex gap-1 text-sm justify-center items-center flex-row shrink-0 rounded py-1 px-3 text-gray-600 shadow-sm hover:text-gray-700 ' +
              (color === 'white'
                ? 'bg-white hover:bg-gray-200 border-solid border-gray-100 border-1'
                : 'bg-gray-200 hover:bg-gray-300')
        }
        type={type}
        onClick={onClick}
        {...rest}
      >
        {iconClass && <i className={iconClass + ' text-xl'}></i>}
        {text}
      </button>
    </>
  );
};

export default Button;
