// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log("hhh","AIzaSyDVdOF5jYlmiqmTHdmHDQOwi5jiXfH9sbk")
const firebaseConfig = {
  apiKey: "AIzaSyDVdOF5jYlmiqmTHdmHDQOwi5jiXfH9sbk",
  authDomain: "blog-portal-dd611.firebaseapp.com",
  projectId: "blog-portal-dd611",
  storageBucket: "blog-portal-dd611.appspot.com",
  messagingSenderId: "676960316852",
  appId: "1:676960316852:web:5f59cc3618d4b6db9416e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);