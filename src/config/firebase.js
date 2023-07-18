// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQIcRWgjoBi2nEnS_KKKBWkkUteTaVH1I",
  authDomain: "list-games-bf18e.firebaseapp.com",
  projectId: "list-games-bf18e",
  storageBucket: "list-games-bf18e.appspot.com",
  messagingSenderId: "398589338695",
  appId: "1:398589338695:web:49ea866ce30ead6ac4fd62",
  measurementId: "G-DWS3HJYG24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);