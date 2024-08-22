import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa"
import { useLoaderData, redirect } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { StatItem } from "../components"

export const loader = async()=>{
    try {
        const response = await customFetch.get('users/admin/app-stats')
        return response.data
    } catch (error) {
        toast.error('You are not authorized to view this page')
        return redirect('/dashboard')
    }
}

function Admin (){
    const { users, classes } = useLoaderData()

    return (
        <>
            <h1 className="text-center text-xl xl:text-2xl 2xl:text-3xl text-peach mt-16">APP STATS (ADMIN ONLY)</h1>
            <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6 xl:gap-12 my-8 mx-12 xl:my-16">
                <StatItem title={'Current Users'} count={users} icon={<FaSuitcaseRolling />} color={'#38B6FF'} />
                <StatItem title={'Total Classes'} count={classes} icon={<FaCalendarCheck />} color={'#FF6B35'} />
            </div>
        </>
    )
}

export default Admin