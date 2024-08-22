import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllClassesContext } from '../pages/AllClasses'

function PageContainer (){
    const {data:{numOfPages, currentPage}} = useAllClassesContext()
    const pages = Array.from({ length:numOfPages }, (_, index)=>{
        return index + 1 
    })

    const {search, pathname} = useLocation()
    const navigate = useNavigate()

    const handlePageChange = (pageNumber) =>{
        const searchParams = new URLSearchParams(search)
        searchParams.set('page', pageNumber)
        navigate(`${pathname}?${searchParams.toString()}`)
    }
    return(
        <div className='flex gap-2 text-picton-blue mx-auto items-center font-medium mb-6 w-fit xl:my-12 xl:text-lg'>
            <button 
                onClick={()=>{
                    let prevPage = currentPage - 1
                    if(prevPage < 1) prevPage = 1
                    handlePageChange(prevPage)
                }}
                className='flex rounded-lg hover:bg-picton-blue hover:text-dark-blue duration-200 bg-dark-blue border-2 border-picton-blue 
                items-center px-2 py-1'>
                <HiChevronDoubleLeft />
                Prev
            </button>
            <div className='flex gap-2'>
                {pages.map((pageNumber)=>{
                    return <button 
                            key={pageNumber}
                            onClick={()=> handlePageChange(pageNumber)}
                            className='bg-dark-blue border-2 border-picton-blue rounded-lg hover:bg-picton-blue 
                                hover:text-dark-blue duration-200 px-2 xl:px-3 py-1'>
                                {pageNumber}
                            </button>
                })}
            </div>
            <button 
                onClick={()=>{
                    let nextPage = currentPage + 1
                    if(nextPage > numOfPages) nextPage = numOfPages
                    handlePageChange(nextPage)
                }}
                className='flex rounded-lg hover:bg-picton-blue hover:text-dark-blue duration-200 bg-dark-blue border-2 border-picton-blue 
                items-center px-2 py-1'>
                Next
                <HiChevronDoubleRight />
            </button>
        </div>
    )
}

export default PageContainer