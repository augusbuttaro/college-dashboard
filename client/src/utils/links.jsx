import addClass from "../assets/add-class.png"
import allClasses from "../assets/all-classes.png"
import stats from "../assets/stats.png"
import profile from "../assets/profile.png"
import admin from "../assets/admin.png"

const links = [
    {text:'All Classes', path:'.', icon: <img className="h-12" src={allClasses}/>},
    {text:'Add Class', path:'add-class', icon: <img className="h-12" src={addClass} />},
    {text:'Stats', path:'stats', icon: <img className="h-12" src={stats} />},
    {text:'Profile', path:'profile', icon: <img className="h-12" src={profile} />},
    {text:'Admin', path:'admin', icon: <img className="h-12" src={admin} />}
]

export default links