import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  errMsg: string | undefined;
  type: HTMLInputTypeAttribute;
  touched?: boolean;
}

const Input = ({ id, placeholder, value, type, name, errMsg, touched, onChange, onBlur, ...rest }: Props) => {
  const className =
    errMsg && touched
      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      : 'bg-gray-50 border border-gray-300 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white';

  return (
    <>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {name}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required
        {...rest}
      />
      {errMsg && touched && <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">{errMsg}</p>}
    </>
  );
};

export default Input;
