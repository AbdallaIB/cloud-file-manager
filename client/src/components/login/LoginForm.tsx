import Input from '@components/shared/Input';
import { loginSchema } from '@utils/schemas';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { LoginInput } from '@api/types';
import Button from '@components/shared/Button';

interface Props {
  onLogin: (values: LoginInput) => void;
}

const LoginForm = ({ onLogin }: Props) => {
  const handleUseDemoUser = () => {
    onLogin({
      username: 'demoaccount01',
      password: 'Test123%',
    });
  };
  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={loginSchema} onSubmit={(e) => onLogin(e)}>
      {({ values, errors, isSubmitting, handleChange, handleBlur, touched }) => (
        <Form className="flex flex-col gap-6 w-[25vw]">
          <div>
            <Input
              id="username"
              type="text"
              name="Username"
              placeholder="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              errMsg={errors.username}
              touched={touched.username}
            ></Input>
          </div>
          <div>
            <Input
              id="password"
              type="password"
              name="Password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errMsg={errors.password}
              touched={touched.password}
            ></Input>
          </div>
          <div>
            <Button classes="h-8 w-full" text={'Login'} disabled={isSubmitting} type="submit" isPrimary></Button>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Not registered?
              <Link to="/signup" className="text-gray-700 underline ml-1">
                Create Account
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={handleUseDemoUser} className="text-gray-700 text-center text-sm underline">
              Demo Account
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
