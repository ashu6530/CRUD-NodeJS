import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function EditBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} =useParams()
  useEffect(()=>{
   setLoading(true)
   axios.get(`http://localhost:8000/books/${id}`).then((responce)=>{
    setAuthor(responce.data.author)
    setPublishYear(responce.data.publishYear)
    setTitle(responce.data.title)
    setLoading(false)
   }).catch((error)=>{
    console.log(error);
    setLoading(false)
   })
  },[])

  const handleEditBook =()=>{
    const data={
      title,
      author,
      publishYear
    };
    setLoading(true)
    axios.put(`http://localhost:8000/books/${id}`,data).then(()=>{
      setLoading(false)
      navigate('/')
    }).catch((error)=>{
      console.log(error);
      setLoading(false)
    })
  }
  return (
   <div className="p4">
    <BackButton/>
    <h1 className='text-3xl my-4'>Edit Book</h1>
    {loading ? (<Spinner/>) :(
      <div className="flex flex-col border-2 border-sky-500 roundex-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
          type='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
          type='text'
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
          <input
          type='text'
          value={publishYear}
          onChange={(e)=>setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className="p-2 bg-sky-300 m-8 "onClick={handleEditBook}>Save</button>
      </div>
    )}
   </div>
  )
}

export default EditBook