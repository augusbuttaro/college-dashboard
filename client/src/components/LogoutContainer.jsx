import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from '../pages/DashboardLayout'

function LogoutContainer (){
    
    const [showLogout, setShowLogout] = useState(false)
    const {user, logoutUser} = useDashboardContext()

    return(
        <div className="relative inline-block">
            <button type='button' onClick={()=> setShowLogout(!showLogout)}  
                className={`flex items-center gap-1 xl:gap-2 text-xs xl:text-base font-semibold 
                    xl:px-3 rounded-full hover:bg-dark-blue hover:text-picton-blue 
                    ${user.avatar?'xl:py-2' : 'xl:p-1'}
                    ${showLogout? 'bg-picton-blue xl:bg-dark-blue  xl:text-picton-blue text-dark-blue' : 
                    'bg-dark-blue text-picton-blue xl:bg-picton-blue xl:text-dark-blue'} duration-200`}>
                {user.avatar? <img src={user.avatar} alt="avatar" className="size-8 rounded-full xl:mr-2" /> : <FaUserCircle className="size-8 xl:size-4 xl:mr-2" />}
                <p className="hidden xl:block">{user.name}</p>
                <FaChevronDown className={`size-2 xl:size-3 hidden xl:block transform-all duration-300 ${showLogout? '-rotate-180' : ''}`} />
            </button>
            {showLogout && (
                <div className="absolute right-0 xl:left-0 mt-2 bg-dark-blue text-center p-2 rounded shadow-lg">
                    <button 
                        type="button" 
                        onClick={logoutUser} 
                        className="text-picton-blue hover:text-peach"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default LogoutContainer