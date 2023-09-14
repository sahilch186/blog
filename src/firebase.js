import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDlcn6xX9DD939iaF_LcDHjvwWS3Vo9Oi4",
    authDomain: "blog-app-3f727.firebaseapp.com",
    projectId: "blog-app-3f727",
    storageBucket: "blog-app-3f727.appspot.com",
    messagingSenderId: "437069379305",
    appId: "1:437069379305:web:f83958d26600423acce278"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {db, storage, auth} ;