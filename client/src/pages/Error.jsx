import { Link, useRouteError } from 'react-router-dom'

function Error (){
    const error = useRouteError()
    
    return (
        <div>
            <h1>Error</h1>
            {console.log(error)}
            <Link to='/'>Home</Link>
        </div>
    )
}

export default Error