import { Link } from "react-router-dom"
import logo from '../assets/logo-light.png'
import landingImg from '../assets/landing-img2.png'

function Landing (){
    return (
        <div className="flex xl:flex-row flex-col bg-dark-blue h-screen justify-around">
            <div className="sm:w-2/5 self-center">
                <img src={logo} alt='college dashboard' className="mx-auto h-36 xl:h-64 2xl:h-80 xl:mt-16 2xl:my-auto 2xl:mb-8 mt-8"/>
                <h1 className="text-peach text-center font-semibold mt-8 2xl:mt-4 text-lg xl:text-3xl 2xl:text-4xl">Organize <span className="text-picton-blue">your</span> classes</h1>
                <p className="text-center text-cream text-xs xl:text-lg mx-8 mt-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries.
                </p>
                <div className='flex justify-around mx-8 mt-12'>
                    <Link to='/register' className='bg-picton-blue px-4 py-2 xl:px-8 xl:py-4 xl:text-lg self-center font-semibold rounded-full hover:text-cream duration-200'>
                        Register
                    </Link>
                    <Link to='/login' className='bg-picton-blue px-4 py-2 xl:px-8 xl:py-4 xl:text-lg self-center font-semibold rounded-full hover:text-cream duration-200'>
                        Login / Demo 
                    </Link>
                </div>
            </div>
            <img src={landingImg} alt='students' className="w-1/3 self-center" />
        </div>
    )
}

export default Landing