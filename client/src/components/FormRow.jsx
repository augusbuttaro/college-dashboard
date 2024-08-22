function FormRow ({type, name, labelText, placeholder, defaultValue, className, onChange, autoComplete}){
    
    return(
        <div className="w-full">
            <label className="block sm:text-xl text-cream" htmlFor={name}>{labelText}</label>
            <input 
                type={type}
                id={name} 
                name={name} 
                className={`block py-2 px-4 w-full font-semibold outline-none rounded-sm
                    ${className}`}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                autoComplete={autoComplete}
            />
        </div>
    )
}

export default FormRow