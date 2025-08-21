import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, updateProfile, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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

const userCreate=async()=>{
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    const username=document.getElementById("userName").value

    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredentials.user

        await updateProfile(user, {
            displayName: username
          });
        
        await auth.currentUser.reload();
        localStorage.setItem("User", username)
        window.location.href="../frontend/home.html"
        alert("Account Created")
    }

    catch(error){
        alert(error.code, error.message)
    }
}

document.getElementById("createButton").addEventListener('click', () => {
  userCreate()
})


// const userSignOut=async()=>{
//     signOut(auth).then(()=>{
//         alert("You have signed out successfully!")
//     })
// }



