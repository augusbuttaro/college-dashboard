import { toast } from "react-toastify" 
import { ClassContainer, SearchContainer} from '../components'
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { useContext, createContext } from "react"
import { useQuery } from "@tanstack/react-query"

const allClassesQuery = (params) =>{
    const { search, sort, page } = params 
    return{
        queryKey: ['classes', search ?? '', sort ?? 'newest', page ?? 1],
        queryFn: async ()=>{
            const { data } = await customFetch.get('/classes', { params })
            return data
        }
    }
}

export const loader = (queryClient) => async ({ request }) =>{
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
    ])
    await queryClient.ensureQueryData(allClassesQuery(params))
    return { searchValues: {...params} }
}


const AllClassesContext = createContext()

function AllClasses (){
    const { searchValues } = useLoaderData()
    const { data } = useQuery(allClassesQuery(searchValues))
    
    console.log(searchValues)
    return (
        <AllClassesContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <ClassContainer />
        </AllClassesContext.Provider>
    )
}

export const useAllClassesContext = () => useContext(AllClassesContext)

export default AllClasses