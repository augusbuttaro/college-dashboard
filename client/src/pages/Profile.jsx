import { FormRow } from "../components"
import { useOutletContext } from "react-router-dom"
import { useNavigation, Form, Link } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const action = async ({ request }) =>{
    const formData = await request.formData()
    const file = formData.get('avatar')
    if(file && file > 500000){
        toast.error('Image size is too large (max 0.5 MB)')
    }
    try {
        await customFetch.patch('/users/update-user', formData)
        toast.success('Profile updated successfully!')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
    return null
}

function Profile (){
const { user } = useOutletContext()
const { name, lastName, email, location } = user
const navigation = useNavigation()
const isSubmitting = navigation.state === 'submitting'

    return (
        <div>
            <Form method='post' encType="multipart/form-data" className='xl:w-1/3 w-3/4 h-fit m-auto'>
            <h1 className='text-center xl:text-3xl my-8 text-2xl text-cream font-medium'>PROFILE</h1>
            <div className='w-4/5 flex flex-col gap-4 mx-auto'>
                <div>
                    <label htmlFor="avatar"  className="block sm:text-xl text-cream">Select an image file <span className="text-xs xl:text-sm">(max 0.5 MB)</span></label>
                    <input type="file" id="avatar" name="avatar" accept="image/*" className="block mt-2 px-2 w-full text-base xl:text-sm 
                        py-1 bg-picton-blue ml-2 py-2 px-4 font-semibold outline-none rounded-sm placeholder:text-light-blue"/>
                </div>
                <FormRow type='text' name='name' labelText='Name' defaultValue={name} className='bg-picton-blue placeholder:text-blue m-2'/>
                <FormRow type='text' name='lastName' labelText='Last Name' defaultValue={lastName} className='bg-picton-blue placeholder:text-blue m-2'/>
                <FormRow type='email' name='email' labelText='Email' defaultValue={email} className='bg-picton-blue placeholder:text-blue m-2'/>
            </div>
            <button type='submit' disabled={isSubmitting} className='xl:w-4/5 w-3/5 mx-auto my-8 block font-medium rounded-lg border-2 border-orange py-1 mt-10 
                xl:mt-6 bg-orange hover:bg-dark-blue hover:text-orange duration-200'>{isSubmitting? 'Updating...' : 'Update'}
            </button>
        </Form>
        </div>
    )
}

export default Profile