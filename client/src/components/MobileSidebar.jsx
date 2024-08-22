import { NavLink, useParams } from "react-router-dom"
import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import logo from '../assets/only-logo.png'
import { IoCloseSharp } from "react-icons/io5";
import NavLinks from "../components/NavLinks"

function MobileSidebar (){
    const {showSidebar, toggleSidebar} = useDashboardContext()

    return(
        <div
            className={`xl:hidden absolute left-0 right-0 top-5 bottom-5 z-30 transition-transform duration-300 ease-in-out 
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="relative w-4/5 mx-auto rounded-lg h-full bg-dark-blue border-2 border-picton-blue">
                <button type='button' onClick={toggleSidebar}>
                    <IoCloseSharp className="absolute right-4 top-4 text-picton-blue size-6 hover:text-orange" />
                </button>
                <header>
                    <img src={logo} className="h-20 mx-auto" />
                </header>
                <NavLinks />
            </div>
        </div>
    )
}

export default MobileSidebar
