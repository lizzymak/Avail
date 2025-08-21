import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {getDatabase, set, get, update, remove, ref, child, push} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyADHLDnizFKhVtBkLELBdzHSeCpECJSk28",
    authDomain: "availabilityapp-ca633.firebaseapp.com",
    databaseURL: "https://availabilityapp-ca633-default-rtdb.firebaseio.com",
    projectId: "availabilityapp-ca633",
    storageBucket: "availabilityapp-ca633.firebasestorage.app",
    messagingSenderId: "662180929815",
    appId: "1:662180929815:web:88f22af3b15c5c3c15d752"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getDatabase();
const auth=getAuth();


const userSignIn=async()=>{
  const email=document.getElementById("email").value
  const password=document.getElementById("password").value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredentials)=>{
    const user = userCredentials.user
    localStorage.setItem("User", user.displayName)
    window.location.href="../frontend/home.html"
  })
  .catch((error)=>{
    const errorCode=error.code
    const errorMessage=error.message
    alert(errorCode + errorMessage)
  })
}


document.getElementById("signInButton").addEventListener('click', () => {
  userSignIn()
})

// function NextPage(){
//     if(user){
        
//         window.location.href = "mainPage.html?user=" + encodeURIComponent(JSON.stringify(user));

//     }
//     else {
//         console.log("user isn't defined");
//     }

// }


