import { toast } from "react-toastify" 
import { ClassContainer, SearchContainer} from '../components'
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { useContext, createContext } from "react"

export const loader = async ({ request }) =>{
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
    ])
    try {
        const { data } = await customFetch.get('/classes', { params })
        console.log(data)
        return {data} 
    } catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const AllClassesContext = createContext()

function AllClasses (){
    const { data } = useLoaderData()
    return (
        <AllClassesContext.Provider value={{ data }}>
            <SearchContainer />
            <ClassContainer />
        </AllClassesContext.Provider>
    )
}

export const useAllClassesContext = () => useContext(AllClassesContext)

export default AllClasses