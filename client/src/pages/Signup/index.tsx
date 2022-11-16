import { createDemoUser, registerUser } from '@api/auth';
import { SignUpInput } from '@api/types';
import SignUpForm from '@components/signup/SignUpForm';
import useToast from '@lib/hooks/useToast';
import useAuthStore from '@lib/stores/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { errorMessage, success } = useToast();
  const { authenticate } = useAuthStore();
  const navigate = useNavigate();

  const handleSignUp = async (values: SignUpInput | {}, type: 'demo' | 'real' = 'real') => {
    try {
      const { user, accessToken } = await (type === 'demo' ? createDemoUser() : registerUser(values as SignUpInput));
      authenticate(user, accessToken);
      success('Registered successfully!');
      navigate('/');
    } catch (err: any) {
      errorMessage(err);
    }
  };

  return (
    <section className="flex items-center justify-center h-full w-full relative">
      <div className="items-center justify-center md:inset-0 overflow-x-hidden overflow-y-auto shadow z-50 rounded-2xl bg-gray-50 dark:bg-gray-700 p-4">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative rounded-lg">
            <h1 className="text-center mb-4 font-semibold text-2xl">Sign Up</h1>
            <SignUpForm onSignUp={handleSignUp} createDemoUser={() => handleSignUp({}, 'demo')}></SignUpForm>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
