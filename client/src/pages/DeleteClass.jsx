import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import { redirect } from "react-router-dom"

export const action = async ({ params }) =>{
    try {
        await customFetch.delete(`/classes/${params.id}`)
        toast.success('Class deleted successfully!')
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
    return redirect('/dashboard')
}
