import { doc, getDoc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import FontAwesome from 'react-fontawesome';
import Spinner from '../components/Spinner';

const Detail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const getBlogDetails = async () => {
      const docRef = doc(db, 'blogs', id);
      const blogDetails = await getDoc(docRef);
      setBlog(blogDetails.data());
      setLoading(false);
    }
    id && getBlogDetails();
  }, [id]);

  if(loading){
    return (<Spinner />);
  }


  return (
    <div className='single'>
      <div className='blog-title-box text-white' style={{backgroundImage: `url(${blog?.imgUrl})`, maxHeight: '350px'}}>
        <div className='overlay'></div>
        <div className='blog-title'>
          <h1>{blog?.title}</h1>
          <span className='text-white'><FontAwesome name="calendar" /> {blog?.timestamp.toDate().toDateString()} | <FontAwesome name="user" /> {blog?.author} | <FontAwesome name="sitemap" /> {blog?.category}</span>
        </div>
      </div>
      <div className='container-fluid py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 text-justify'>
              <div className='m-3 bg-white rounded p-3 border shadow-sm'>
                {blog?.description}
              </div>
            </div>
            <div className='col-md-4'>
              <h2>Tags</h2>
              <h2>Most Popular</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail