import FormRow from "./FormRow"

function ClassInfo ({ classInfo }){
    const currentYear = new Date().getFullYear();
    return(
        <div className="self-center flex flex-col py-6 justify-center xl:w-4/5 xl:grid xl:grid-cols-2 xl:gap-x-12 xl:gap-y-4 border-b-2 border-blue">
            <FormRow 
                type="text" 
                name='className' 
                labelText='Class Name *' 
                placeholder="History" 
                className='bg-picton-blue placeholder:text-blue m-2' 
                defaultValue={classInfo? classInfo.className : ''}/>
            <FormRow 
                type="text" 
                name='schedule' 
                labelText='Class Schedule' 
                placeholder="Wed-Fri 9:00-13:00" 
                className='bg-picton-blue placeholder:text-blue m-2'
                defaultValue={classInfo? classInfo.schedule : ''}/>
            <div className="grid-cols-2 grid gap-x-4">
                <FormRow 
                    type="text" 
                    name='code' 
                    labelText='Course Code *' 
                    placeholder="HI101" 
                    className='bg-picton-blue placeholder:text-blue m-2'
                    defaultValue={classInfo? classInfo.code : ''}/>
                <FormRow 
                    type="number" 
                    name='credits' 
                    labelText='Credits *' 
                    defaultValue={classInfo? classInfo.credits : 1 }
                    className='bg-picton-blue placeholder:text-blue m-2'/>
            </div>
            <div className="grid-cols-2 grid gap-x-4">
                <FormRow 
                    type="text" 
                    name='semester' 
                    labelText='Semester *' 
                    placeholder="Fall" 
                    className='bg-picton-blue placeholder:text-blue m-2'
                    defaultValue={classInfo? classInfo.semester : ''}/>
                <FormRow 
                    type="number" 
                    name='year' 
                    labelText='Year *' 
                    className='bg-picton-blue placeholder:text-blue m-2'
                    defaultValue={classInfo? classInfo.year : currentYear}/>
            </div>
                <FormRow 
                    type="text" 
                    name='professorName' 
                    labelText="Professor's Name *" 
                    placeholder="Professor Smith" 
                    className='bg-picton-blue placeholder:text-blue m-2'
                    defaultValue={classInfo? classInfo.professorName : ''}/>
                <FormRow 
                    type="text" 
                    name='professorContact' 
                    labelText="Professor's Contact" 
                    placeholder="psmith@youruniversity.com" 
                    className='bg-picton-blue placeholder:text-blue m-2'
                    defaultValue={classInfo? classInfo.professorContact : ''}/>
        </div>
    )
}

export default ClassInfo