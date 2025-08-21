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
var storedName=localStorage.getItem('GroupName')

async function displayInfo(){
  var groupNameLabel=document.getElementById("groupNameLabel")
  var storedName=localStorage.getItem('GroupName')
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



async function TimeAvg(){
  const usersRef = ref(db, `Groups/${storedName}/Users`)
  const timeRef = ref(db, `Groups/${storedName}/Times`)
  
  try{
    const users= await get(usersRef)
    const userCount =  users.exists() ? Object.keys(users.val()).length : 1
    const times = await get(timeRef)
    let availabilityCount={}

    users.forEach((user) => {
      const userTimes = user.child("Times").val()
      Object.keys(userTimes).forEach((timeSlot) => {
        availabilityCount[timeSlot]=(availabilityCount[timeSlot] || 0) +1
      })
    })

    await set(timeRef,availabilityCount)
    
    times.forEach((element)=>{
      var percentAvailable=(element.val()/userCount)*100
      const checkbox = document.getElementById(element.key)
      if(percentAvailable>=75){
       checkbox.style.backgroundColor="var(--williamGreen)"
      }
      else if(percentAvailable<75 & percentAvailable>=50){
        checkbox.style.backgroundColor="var(--williamGreen)"
      }
      else{
        checkbox.style.backgroundColor="var(--williamGreen)"
      }
    })
  }
  catch(error){
    console.log(error.code + error.message)
  }
}

document.addEventListener('DOMContentLoaded', async function () { 
  TimeAvg()
  displayInfo()
})

document.getElementById("myPage").addEventListener('click', () =>{
  window.location.href='./myView.html'
})

document.getElementById("homePage").addEventListener('click', () =>{
  window.location.href='./home.html'
})

document.getElementById("memberPage").addEventListener('click', () =>{
  window.location.href='./members.html'
})