import { StatItem } from "."
import { FaCheck, FaRegClock, FaExclamation } from "react-icons/fa"

function StatsContainer({ defaultStats }){
    const stats = [
        {
            title:'Completed tasks',
            count: defaultStats?.completedTasks || 0,
            icon:<FaCheck />,
            color:'#78EE74',
        },
        {
            title:'Tasks in progress',
            count: defaultStats?.inProgressTasks || 0 ,
            icon:<FaRegClock />,
            color:'#EAC435',
        },
        {
            title:'Uninitiated tasks',
            count: defaultStats?.notStartedTasks || 0,
            icon:<FaExclamation />,
            color:'#BF211E',
        },

    ]
    console.log(defaultStats)
    return(
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
            {stats.map((stat)=>{
                return(
                    <StatItem key={stat.title} {...stat}/>
                )
            })}
        </div>
    )
}

export default StatsContainer