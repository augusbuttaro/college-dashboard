import { useDashboardContext } from "../pages/DashboardLayout"
import logoHor from '../assets/logo-horizontal1.png'
import onlyLogo from '../assets/only-logo.png'
import burger from '../assets/burger.png'
import LogoutContainer from "./LogoutContainer";

function Navbar (){
    const {toggleSidebar, showSidebar} = useDashboardContext()
    return(
        <div className="flex justify-between absolute xl:relative items-center xl:h-24 p-4 xl:px-8 relative top-0 left-0 right-0 xl:py-6 bg-blue z-30">
            <button type="button" onClick={toggleSidebar} >
            <img src={burger} className={`w-5 xl:w-8 transition-all duration-300 ${showSidebar ? '-rotate-180' : ''}`} />
            </button>
            <img src={logoHor} className="w-1/3 xl:w-[15%] object-center xl:hidden" />
            {!showSidebar? <img src={onlyLogo} className="h-24 hidden xl:absolute transform xl:-translate-x-1/2 xl:left-1/2 xl:block" /> : <img src={logoHor} className="w-1/3 xl:w-[15%] xl:block object-center hidden" />}
            <LogoutContainer />
        </div>
    )
}

export default Navbar
