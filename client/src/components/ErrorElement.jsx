import { useRouteError } from "react-router-dom";

function ErrorElement(){
    const errors = useRouteError()
    return(
        <div className="p-6 text-3xl text-cream">
            There was an error...
        </div>
    )
}

export default ErrorElement