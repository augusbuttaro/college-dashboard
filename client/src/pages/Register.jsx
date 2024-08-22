import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import { FormRow } from '../components';
import logo from '../assets/only-logo.png'
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify';

export const action = async ({ request })=>{
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    
    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration Successfull')
        return redirect('/login')
    } catch (error) {
        toast.error(error.response.data.msg)
        return error
    }
}

function Register (){
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
    <div className='bg-dark-blue h-screen flex self-center'>
        <Form method='post' className='bg-blue xl:w-1/3 w-3/4 h-fit m-auto rounded-lg border-2 border-picton-blue'>
            <Link to='/'>
                <img src={logo} alt='logo' className='mx-auto xl:h-32 xl:mt-8 mt-4 h-24'/>
            </Link>
            <h1 className='text-center xl:text-3xl xl:my-4 text-2xl text-cream font-medium'>Register</h1>
            <div className='w-4/5 mx-auto flex flex-col gap-4'>
                <FormRow type='text' name='name' labelText='Name'  className='bg-picton-blue'/>
                <FormRow type='text' name='lastName' labelText='Last Name'  className='bg-picton-blue'/>
                <FormRow type='email' name='email' labelText='Email'  className='bg-picton-blue'/>
                <FormRow type='password' name='password' labelText='Password'  className='bg-picton-blue'/>
            </div>
            <button type='submit' disabled={isSubmitting} className='xl:w-4/5 w-3/5 mx-auto block rounded-lg py-1 mt-10 xl:mt-6 bg-cream
                hover:bg-dark-blue hover:text-cream duration-200'>{isSubmitting? 'Submitting...' : 'Register'}</button>
            <p className='text-cream font-light xl:text-base text-sm pb-12 text-center mt-8'>Already a member? <Link to='/login' className='underline'>Log in</Link></p>
        </Form>
    </div>
    );
}

export default Register