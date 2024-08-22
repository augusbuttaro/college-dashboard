import { ChartsContainer, StatsContainer } from "../components"
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"

export const loader = async () =>{
    try {
        const response = await customFetch.get('/classes/stats')
        return response.data
    } catch (error) {
        return error
    }
}

function Stats (){
    const { defaultStats, monthlyClasses } = useLoaderData()
    return (
        <div className="xl:p-12">
            <h1 className="text-peach w-full text-center text-2xl xl:my-10 my-6 font-semibold xl:text-3xl">STATS</h1>
            <StatsContainer defaultStats={defaultStats} />
            <ChartsContainer data={monthlyClasses} />
        </div>
    )
}

export default Stats