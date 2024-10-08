import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAzDZKZ6-f6PhFrVDxHssFtrrBcPoV7-hU",
    authDomain: "test-app-e7e32.firebaseapp.com",
    projectId: "test-app-e7e32",
    storageBucket: "test-app-e7e32.appspot.com",
    messagingSenderId: "296939994254",
    appId: "1:296939994254:web:58c495d98d092d74bfdddf",
    measurementId: "G-V12JJVQP2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };