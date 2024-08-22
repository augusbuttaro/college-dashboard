import { useState } from "react"
import BarChartComponent from "./BarChartComponent"
import AreaChartComponent from "./AreaChartComponent"

function ChartsContainer({data}){
    const [barChart, setBarChart] = useState(true)
    return(
        <div className="hidden xl:block my-8">
            <div className="flex justify-center">
                <h2 className="text-2xl mx-auto text-cream text-center">Classes added by month</h2>
                <button 
                    className="px-4 py-2 bg-dark-blue rounded-lg text-cream hover:bg-cream hover:text-dark-blue duration-200"
                    type='button' 
                    onClick={()=> setBarChart(!barChart)}>
                    {barChart? 'Area chart' : 'Bar chart'}
                </button>
            </div>
            {barChart? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </div>
    )
}

export default ChartsContainer