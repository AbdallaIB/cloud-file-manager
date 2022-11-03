import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="mt-5 mb-3 text-xl font-bold text-black md:text-2xl">Page not found (404)</p>
      <span className="mb-3 text-base font-medium text-gray-700">
        The page you're looking for may have moved or no longer exists. Head back to our{' '}
        <Link to="/" className="underline">
          homepage.
        </Link>
      </span>
    </div>
  );
};

export default Page404;
