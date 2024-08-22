import { NavLink, useParams } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"
import onlyText from '../assets/only-text.png'
import logo from '../assets/logo-horizontal1.png'
import NavLinks from "../components/NavLinks"

function DesktopSidebar (){
    const { showSidebar }= useDashboardContext()

    return(
        <div className={`hidden xl:flex flex-col fixed top-0 left-0 h-full w-1/5 bg-dark-blue transition-transform duration-300 ease-in-out z-0 ${showSidebar ? '-translate-x-full' : 'translate-x-0'}`} >
            <header>
                <img src={onlyText} className="pt-4 pb-6 mx-auto w-1/2"/>
            </header>
            <NavLinks isDesktopSideBar />
        </div>

    )
}

export default DesktopSidebar
