import Input from '@components/shared/input';
import { signUpSchema } from '@utils/schemas';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { SignUpInput } from '@api/types';
import { generateUsername } from 'unique-username-generator';
import Button from '@components/shared/Button';

interface Props {
  onSignUp: (values: SignUpInput) => void;
}

const SignUpForm = ({ onSignUp }: Props) => {
  const handleUseDemoUser = () => {
    const password = 'Test123%';
    onSignUp({
      username: generateUsername(),
      email: generateUsername() + '@demo.com',
      password,
      confirmPassword: password,
    });
  };
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={(e) => onSignUp(e)}
    >
      {({ values, errors, isSubmitting, handleChange, handleBlur, touched }) => (
        <Form className="flex flex-col gap-4 w-[25vw]">
          <div className="">
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
          <div className="">
            <Input
              id="email"
              type="email"
              name="Email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errMsg={errors.email}
              touched={touched.email}
            ></Input>
          </div>
          <div className="">
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
          <div className="">
            <Input
              id="confirmPassword"
              type="password"
              name="Confirm Password"
              placeholder="confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errMsg={errors.confirmPassword}
              touched={touched.confirmPassword}
            ></Input>
          </div>
          <div>
            <Button
              classes="h-8 w-full"
              text={'Create account'}
              disabled={isSubmitting}
              type="submit"
              isPrimary
            ></Button>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link to="/login" className="text-gray-700 underline ml-1">
                Log in
              </Link>
              .
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

export default SignUpForm;
