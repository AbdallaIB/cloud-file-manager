import DummyProfile from '@assets/svgs/dummy-profile.svg';

const Header = () => {
  return (
    <header aria-label="Page Header" className="bg-white">
      <div className="border-b flex flex-row justify-end max-w-screen-xl mx-auto px-4 py-3 sm:px-6">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <img src={DummyProfile} alt="profile"></img>
        </div>
      </div>
    </header>
  );
};

export default Header;
