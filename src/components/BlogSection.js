import React from 'react'
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { excerpt } from '../utility';

const BlogSection = ({blogs, user, handleDelete}) => {
    // console.log(blogs);
  return (
    <>
    <div className='blog-heading text-start py-2 mb-4'>Daily Blogs</div>
    <div className='row'>
    {blogs?.map((blog) => {
        // {console.log(blog.description)}
        return (<div className='col-lg-6 mt-3' key={blog.id}>
            <div className='d-flex align-items-strech border rounded overflow-hidden bg-white shadow-sm mb-3 h-100' >
            <div className='col-md-4'>
                    <div className='blog-img w-100 h-100' style={{backgroundImage: `url(${blog.imgUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                        {/* <img src={blog.imgUrl} alt={blog.title} className='img-fluid' /> */}
                        <div></div>
                    </div>
            </div>
            <div className='col-md-8 p-3 d-flex flex-column justify-content-between'>
                <div className='text-start'>
                    <span className='badge text-bg-dark fw-medium mb-2'>{blog.category}</span>
                    <h4>{blog.title}</h4>
                    <div className='meta-info'>
                        <p className='author me-3 mb-1'><FontAwesome name="user" /> {blog.author}</p>
                        <FontAwesome name="calendar" /> {blog?.timestamp?.toDate().toDateString()}
                    </div>
                </div>
                <div className='short-description pb-2'>
                    { excerpt(blog.description, 120) }
                </div>
                <div className='actions'>
                <Link to={`/detail/${blog.id}`}>
                    <button type='button' className='btn btn-warning btn-sm'>Read More</button>
                </Link>
                {user && user.uid === blog.userId && (
                    <div className='float-end'>
                        <button className='btn btn-sm btn-danger text-white mx-1' onClick={() => handleDelete(blog.id)}><FontAwesome name='trash' /></button>
                        <Link to={`/update/${blog.id}`} className='btn btn-sm btn-info text-white mx-1'><FontAwesome name='edit' /></Link>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>)
    })}
    </div>
    </>
  )
}

export default BlogSection