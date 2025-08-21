import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {getDatabase, set, get, ref} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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


async function displayInfo(){
  var storedName=localStorage.getItem('GroupName')
  var groupNameLabel=document.getElementById("groupNameLabel")
  groupNameLabel.innerHTML="Group: "+storedName
  const userRef = ref(db, `Groups/${storedName}/Users`)
  const members=document.getElementById("members")
  try{
    const users=await get(userRef)
    users.forEach((user)=>{
      const p=document.createElement("p")
      p.innerHTML=`${user.key}`
      members.appendChild(p)
    })
  }
  catch(error){
    console.log(error.message)
  }
  
}

document.addEventListener('DOMContentLoaded', async function () { 
    displayInfo()
  })
  
  document.getElementById("myPage").addEventListener('click', () =>{
    window.location.href='./myView.html'
  })
  
  document.getElementById("homePage").addEventListener('click', () =>{
    window.location.href='./home.html'
  })
  
  document.getElementById("groupPage").addEventListener('click', () =>{
    window.location.href='./groupView.html'
  })