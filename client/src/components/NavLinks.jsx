import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import { NavLink } from "react-router-dom"


function NavLinks({ isDesktopSideBar }){
    const { toggleSidebar, user } = useDashboardContext()
    const { role } = user
    return(
        <div className='flex flex-col mt-12 xl:my-24 2xl:my-16 gap-10 xl:gap-16'>
            {links.map((link)=>{
                const { text, path, icon } = link
                if(path === 'admin' && role !== 'admin') return
                return (
                <NavLink to={path} key={text} onClick={isDesktopSideBar? null : toggleSidebar} className={({ isActive }) => 
                    `flex mx-auto xl:mx-12 2xl:mx-16 w-48 duration-200 hover:text-orange 2xl:hover:ml-24 hover:ml-16 ${isActive ? 'text-orange' : 'text-cream'}`
                } end={path === '.'}>
                    <span>{icon}</span>
                    <p className="text-xl self-center ml-6 uppercase font-poppins">{text}</p>
                </NavLink>)
            })}
        </div>
    )
}

export default NavLinks