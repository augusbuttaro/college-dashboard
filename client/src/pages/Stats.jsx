import { ChartsContainer, StatsContainer } from "../components"
import customFetch from "../utils/customFetch"
import { useLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

const statsQuery = {
    queryKey:['stats'],
    queryFn: async ()=> {
        const response = await customFetch.get('/classes/stats')
        return response.data
    }
}

export const loader = (queryClient) => async () =>{
    const data = await queryClient.ensureQueryData(statsQuery)
    return data
}

function Stats (){
    const { data } = useQuery(statsQuery)
    const { defaultStats, monthlyClasses } = data
    return (
        <div className="xl:p-12">
            <h1 className="text-peach w-full text-center text-2xl xl:my-10 my-6 font-semibold xl:text-3xl">STATS</h1>
            <StatsContainer defaultStats={defaultStats} />
            <ChartsContainer data={monthlyClasses} />
        </div>
    )
}

export default Stats