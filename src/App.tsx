import './App.css';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function App() {
  let initialValue = {
    email: 'vivek.p@google.com',
    password: '12345678',
  };

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: initialValue,
  });

  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: typeof initialValue) => {
    await delay(2000);
    console.log(data);
    reset();
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        React Hook Form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center w-full max-w-md mx-auto"
      >
        <div className="w-full">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Email is Required',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter Valid Email',
              },
            })}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            {...register('password', {
              required: {
                value: true,
                message: 'Password is Required',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default App;
