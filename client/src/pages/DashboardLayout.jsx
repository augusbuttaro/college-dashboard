import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import { DesktopSidebar, MobileSidebar, Navbar, Loading } from "../components"
import { createContext, useContext, useState } from "react"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { QueryClient, useQuery } from "@tanstack/react-query"

const userQuery = {
    queryKey:['user'],
    queryFn: async ()=>{
        const { data } = await customFetch.get('/users/current-user')
        return data
    }
}

export const loader = (queryClient) => async ()=>{
    try {
        return await queryClient.ensureQueryData(userQuery)
    } catch (error) {
        return redirect('/')
    }
}

const DashboardContext = createContext()

function DashboardLayout ({ queryClient }){
    const { user } = useQuery(userQuery).data
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isPageLoading = navigation.state === 'loading'
    const [showSidebar, setShowSidebar] = useState(false)
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }   

    const logoutUser = async () => {
        navigate('/')
        await customFetch.get('/auth/logout')
        queryClient.invalidateQueries()
        toast.success('Logout succsefull!')
    } 

    return (
        <DashboardContext.Provider value={{ showSidebar, toggleSidebar, user, logoutUser }}>
            <div className="flex">
                <DesktopSidebar />
                <div className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${showSidebar ? 'xl:ml-0' : 'xl:ml-[20%]'}`}>
                    <Navbar />
                    <MobileSidebar />
                    <div className="flex-grow overflow-auto">
                        {isPageLoading? <Loading /> : <Outlet context={{ user }} />}
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>

    )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout