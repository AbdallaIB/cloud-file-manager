import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPrimary?: boolean;
  iconClass?: string;
  classes?: string;
  backgroundColor?: 'gray' | 'white' | 'red';
  color?: 'gray' | 'white';
}

const Button = ({
  text,
  isPrimary = false,
  iconClass,
  backgroundColor = 'gray',
  color = 'gray',
  children,
  onClick,
  type,
  classes,
  ...rest
}: Props) => {
  const backgroundColorClasses =
    backgroundColor === 'white'
      ? 'bg-white hover:bg-gray-200 border-solid border-gray-100 border-1 '
      : backgroundColor === 'gray'
      ? 'bg-gray-200 hover:bg-gray-300 '
      : 'bg-red-500 hover:bg-red-600 ';
  const colorClasses = color === 'white' ? 'text-white hover:text-gray-200 ' : 'text-gray-600 hover:text-gray-700 ';
  return (
    <>
      <button
        className={
          (isPrimary
            ? 'gap-1 justify-center h-8 text-white flex-row bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm py-1 px-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '
            : 'flex gap-1 h-8 text-sm justify-center items-center flex-row shrink-0 rounded py-1 px-3 shadow-sm font-medium ') +
          (!isPrimary ? backgroundColorClasses : '') +
          ' ' +
          (!isPrimary ? colorClasses : '') +
          ' ' +
          (classes ? classes : '')
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
