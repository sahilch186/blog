import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import BlogSection from '../components/BlogSection';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Home = ({user}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
        })
        setBlogs(list)
        setLoading(false);
      },
      (err) => {
        console.log(err)
      }
    )

    return () => {
      unsub();
    }
  }, []);

  // console.log('blogs', blogs)

  if(loading){
    return (<Spinner />);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='container-fluid py-4'>
      <div className='container'>
        <div className='row mx-0'>
          <div className='col-md-12'>
            <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home