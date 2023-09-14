import React, {useState, useEffect} from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const initFormData = {title: "", tags: [], trending: "no", category: '', description: ""};
const categoryOptions = ['fashion', 'business', 'technology', 'food', 'health', 'sports'];


const AddEditBlog = ({user}) => {
    const [formData, setFormData] = useState(initFormData);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const {id} = useParams();
    
    const navigate = useNavigate();

    const {title, tags, trending, category, description} = formData;

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);

                switch(snapshot.state){
                    case 'paused' : console.log('file upload pasued'); break;
                    case 'running' : console.log('file upload running'); break;
                    default : break;
                }
            }, 
            (error) => {console.log(error)}, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
                    setFormData((prev) => ({...prev, imgUrl: downloadUrl}))
                })        
            }
            )
            // console.log(formData)
        }

        file && uploadFile();
    }, [file])

    useEffect(() => {
        const getBlogDetails = async () => {
          const docRef = doc(db, 'blogs', id);
          const blogDetails = await getDoc(docRef);
          setFormData({...blogDetails.data()});
        //   setLoading(false);
        }
        id && getBlogDetails();
      }, [id]);

    const handleInputChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value})}
    const handleTags = (tags) => {setFormData({...formData, tags})}
    const handleTrending = (e) => {setFormData({...formData, trending: e.target.value})}
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title && tags && trending && category && description){
            if(id){
                try{
                    await updateDoc(doc(db, 'blogs', id), {
                        ...formData,
                        // timestamp: serverTimestamp(),
                        // author : user.displayName,
                        // userId: user.uid
                    })
                    navigate('/');
                }
                catch(err){
                    console.log(err)
                }
            }
            else{
                try{
                    await addDoc(collection(db, 'blogs'), {
                        ...formData,
                        timestamp: serverTimestamp(),
                        author : user.displayName,
                        userId: user.uid
                    })
                    navigate('/');
                }
                catch(err){
                    console.log(err)
                }
            }
        }
        else{
            return toast.error('All Fields are Mandatory !!!')
        }
    }
  return (
    <div className="container-fluid mb-4">
        <div className="container mt-3">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-5 mt-5">
                    <form className='row blog-form bg-white rounded border shadow-sm'>
                        <div className="col-12 text-center py-3">
                            <div className="text-center heading py-2 text-capitalize h3">{id ? "Edit" : "Add"} Blog</div>
                        </div>
                        <div className="col-12 py-2">
                            <input className='form-control' placeholder='Enter Blog Title' name='title' value={title} type='text' onChange={handleInputChange} />
                        </div>
                        <div className="col-12 py-2">
                            <ReactTagInput tags={tags} placeholder="Tags" onChange={handleTags} />
                        </div>
                        <div className="col-12 py-2 d-flex">
                            <p>Is Blog Featured ?</p>
                            <div className="form-check-inline mx-2">
                                <input type="radio" className='form-check-input mx-2' value="yes" name="radioOption" id="radioOptionYes" checked={trending === 'yes'} onChange={handleTrending} />
                                <label className="form-check-label" htmlFor="radioOptionYes">Yes &nbsp;</label>
                                <input type="radio" className='form-check-input mx-2' value="no" name="radioOption" id="radioOptionNo" checked={trending === 'no'} onChange={handleTrending} />
                                <label className="form-check-label" htmlFor="radioOptionNo">No </label>
                            </div>
                        </div>
                        <div className="col-12 py-2">
                            <select className='form-control' value={category} name="category" onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                {categoryOptions.map((option, index) => (<option value={option || ""} key={index}>{option}</option>))}
                            </select>
                        </div>
                        <div className="col-12 py-2">
                            <textarea className='form-control' rows="6" placeholder='Enter Description' value={description} onChange={handleInputChange} name="description"></textarea>
                        </div>
                        <div className="col-12 py-2">
                            <input className='form-control' name='confirmPassword' type='file' onChange={(e) => {setFile(e.target.files[0])}} />
                        </div>
                        <div className="col-12 py-2 text-center">
                            <button type="submit" className="btn btn-warning text-capitalize w-100" onClick={handleSubmit}  disabled={progress !== null && progress < 100}>{id ? "Save" : "Add"} Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEditBlog