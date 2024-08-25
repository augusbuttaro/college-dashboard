import { FormRow, FormRowSelect } from '.'
import { Form, useSubmit, Link } from 'react-router-dom'
import { CLASS_SORT_BY } from '../../../utils/constants'
import { useAllClassesContext } from '../pages/AllClasses'
import { FaSearch } from 'react-icons/fa'
import { useState, } from 'react'

function SearchContainer (){
    const {searchValues} = useAllClassesContext()
    const { search, sort } = searchValues
    console.log(sort)
    const submit = useSubmit()
    const handleReset = (e) => {
        setSortValue('newest')
        submit(e.currentTarget.form)
    }

    const debounce = (onChange)=>{
        let timeout
        return (e)=>{
            const form = e.currentTarget.form
            clearTimeout(timeout)
            timeout = setTimeout(()=>{
                onChange(form)
            },1000)
        }
    }

    return(
        <div>
            <Form>
                <div className='flex justify-between'>
                    <FormRow 
                        type='search' 
                        name='search' 
                        labelText=''  
                        placeholder='Search...' 
                        defaultValue={search}
                        onChange={debounce((form) =>{ submit(form) })}
                        autoComplete='off'
                        className='bg-dark-blue placeholder:text-lg placeholder:text-opac-picton-blue 
                            placeholder:font-normal text-lg py-4 text-cream'
                    />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <Link 
                        to='/dashboard'
                        onClick={handleReset}
                        className='xl:mt-8 mx-2 xl:mx-10 bg-peach text-dark-blue text-sm font-semibold px-2 py-1 rounded-lg
                            xl:text-base hover:bg-blue hover:text-peach hover:font-medium duration-200'>
                        Reset Search
                    </Link>
                    <div className='flex items-center mx-6 xl:mx-10 xl:mt-4'>
                        <p className='text-cream'>Sort By:</p>
                        <FormRowSelect 
                            className='text-peach xl:text-lg' 
                            name='sort' 
                            onChange={(e)=>{
                                submit(e.currentTarget.form)
                            }}
                            value={sort}
                            list={[...Object.values(CLASS_SORT_BY)]} 
                        />
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default SearchContainer