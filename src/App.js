import { useEffect, useState } from 'react';
import './App.css';
import './style.scss';
import './media-query.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddEditBlog from './pages/AddEditBlog';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Auth from './pages/Auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setActive] = useState('home');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log(authUser);
      if(authUser){
        setUser(authUser);
      }
      else{
        setUser(null);
      }
    })
  },[])
  
  const logout = async () => {
    await signOut(auth).then(() => {
      setUser(null);
      setActive('login');
      navigate('/auth');
    })
  }
  return (
    <div className="App bg-light min-vh-100">
      <Header active={active} setActive={setActive} user={user} logout={logout} />
      <ToastContainer position='top-center' />
      <main className='pt-5'>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={user?.uid ? <AddEditBlog user={user} /> : <Navigate to='/auth' />} />
        <Route path="/update/:id" element={user?.uid ? <AddEditBlog /> : <Navigate to='/auth' />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      </main>
    </div>
  );
}

export default App;
