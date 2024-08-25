import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import { DesktopSidebar, MobileSidebar, Navbar, Loading } from "../components"
import { createContext, useContext, useState } from "react"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const loader = async ()=>{
    try {
        const { data } = await customFetch.get('/users/current-user')
        return data
    } catch (error) {
        return redirect('/')
    }
}

const DashboardContext = createContext()

function DashboardLayout (){
    const { user } = useLoaderData()
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