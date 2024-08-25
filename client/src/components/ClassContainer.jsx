import Class from "./Class"
import { useAllClassesContext } from "../pages/AllClasses"
import { Link } from "react-router-dom"
import PageContainer from "./PageContainer"

function ClassContainer (){
    const { data } = useAllClassesContext()
    const { classes, totalClasses, numOfPages } = data
    
    if(classes.length === 0){
        return(
            <h1 className="text-peach text-3xl text-center mt-24">No classes to display, add one <Link to='add-class' className="text-orange hover:text-picton-blue duration-200">here!</Link>
            </h1>
        )
    }
    return(
        <>
            <h1 className="my-6 xl:mx-10 text-xl xl:text-2xl text-center text-cream font-medium">{totalClasses} {classes.length > 1?'Classes':'Class'} Found</h1>
            <div className="m-6 flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:mx-10 2xl:gap-x-16 2xl:gap-y-12 2xl:mx-16">
                {classes.map((oneClass)=>{
                    return <Class key={oneClass._id} {...oneClass} />
                })}
            </div>
            {numOfPages > 1 && <PageContainer />}
        </>

    )
}

export default ClassContainer