function FormRowSelect({name, labelText,className, list, onChange, value}) {
    function capitalizeFirstLetter(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return(
        <div className={className}>
            <label htmlFor={name} className="block sm:text-xl text-cream">
                {labelText}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={`py-2.5 xl:py-2 px-2.5 text-center rounded-lg block w-full font-semibold outline-none rounded-sm m-2 ${
                    value === 'Not started'
                        ? 'bg-red text-cream'
                        : value === 'In progress'
                        ? 'bg-yellow text-dark-blue'
                        : value === 'Completed'
                        ? 'bg-green text-dark-blue'
                        : 'bg-blue text-peach'
                }`}
            >
                {list.map((itemValue) => {
                    return (
                        <option 
                            key={itemValue} 
                            value={itemValue}
                            className='text-cream bg-blue'>
                            {capitalizeFirstLetter(itemValue)}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default FormRowSelect