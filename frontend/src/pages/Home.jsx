import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get('http://localhost:8000/books')
        .then((response)=>{
            setBooks(response.data);
            setLoading(false)
        }).catch((error)=>{
            console.log(error);
            setLoading(false)
        })
    },[])
    console.log(books);
  return (
    <div className='p-4'>
        <div className="flex justify-between items-center">
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>

            </Link>
        </div>
        {loading ? (
            <Spinner/>
        ) :(
            <table className='w-full boder-sperate border-spacing-2'>
               <thead>
                <tr>
                    <th className='border border-slate-500 rounded-md'>No</th>
                    <th className='border border-slate-500 rounded-md'>Title</th>
                    <th className='border border-slate-500 rounded-md max-md:hidden'>Author</th>
                    <th className='border border-slate-500 rounded-md mx-md:hidden'>Publish Year</th>
                    <th className='border border-slate-500 rounded-md'>Operations</th>
                </tr>
               </thead>
               <tbody>
                {books.map((book,index)=>(
                    <tr key={book._id} className='h-8'>
                        <th className='border border-slate-700 rounded-md text-center'>  { index+1 }</th>
                        <th className='border border-slate-700 rounded-md text-center '>  {book.title }</th>
                        <th className='border border-slate-700 rounded-md text-center '>  {book.author }</th>
                        <th className='border border-slate-700 rounded-md text-center  max-md:hidden '>  {book.publishYear }</th>
                        <th className='border border-slate-700 rounded-md text-center'>
                            <div className='flex justify-center gap-x-4 '>
                                <Link to={`/books/details/${book._id}`}>
                                <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                <AiOutlineEdit className='text-2xl text-blue-800' />
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                <AiOutlineDelete className='text-2xl text-red-800' />
                                </Link>
                            </div>
                        </th>
                      
                    </tr>
                ))}
               </tbody>
            </table>
        )}
    </div>
  )
}

export default Home