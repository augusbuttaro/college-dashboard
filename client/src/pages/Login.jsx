import { Link, useNavigation, redirect, Form } from 'react-router-dom'
import { FormRow } from '../components';
import logo from '../assets/only-logo.png'
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request })=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post('/auth/login', data)
        toast.success('Login Successfull')
        return redirect('/dashboard')
    } catch (error) {
        toast.error(error?.response?.data.msg)
        return error
    }
}

function Login (){
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <div className='bg-dark-blue h-screen flex self-center'>
            <Form method='post' className='bg-blue xl:w-1/3 w-3/4 h-fit m-auto rounded-lg border-2 border-picton-blue'>
                <Link to='/'>
                    <img src={logo} alt='logo' className='mx-auto mt-10 xl:h-32 h-24'/>
                </Link>
                <h1 className='text-center xl:text-3xl text-2xl my-4 xl:mb-8 text-cream font-medium'>Login</h1>
                <div className='w-4/5 mx-auto flex flex-col gap-4'>
                    <FormRow type='email' name='email' labelText='Email' className='bg-picton-blue' />
                    <FormRow type='password' name='password' labelText='Password' className='bg-picton-blue' />
                </div>
                <button type='submit' disabled={isSubmitting} className='xl:w-4/5 w-3/5 mx-auto block rounded-lg py-1 mt-10 xl:mt-12
                    bg-cream hover:bg-dark-blue hover:text-cream duration-200'>
                    {isSubmitting? 'Logging in' : 'Login'}
                </button>
                <p className='text-cream font-light xl:text-base text-sm text-center pb-12 xl:mt-12 mt-6'>
                    Not a member yet? <Link to='/register' className='underline'>Register</Link>
                </p>
            </Form>
        </div>
)
}

export default Login