import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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
  const user=localStorage.getItem("User")


  //loads users availability based on whats stored in the db under their name
  document.addEventListener('DOMContentLoaded', async function () {
    const userRef = ref(db, `Groups/${storedName}/Users/${user}/Times/`);
    try{
      const times=await get(userRef)
      times.forEach((time)=>{
        document.getElementById(time.key).checked=true
      })
    }
    catch(error){
      console.log(error.code + error.message)
    }
  })

//label on left with group and user name
// var groupNameLabel=document.getElementById("groupNameLabel")
// var storedName=localStorage.getItem('GroupName')
// groupNameLabel.innerHTML="Group: "+storedName


//stores checkboxes that are checked into users folder
function print(){
  const userRef = ref(db, `Groups/${storedName}/Users/${user}/Times/`);
  set(userRef, null)
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    const timeSlot = checkbox.id; // Example: "Monday_08AM"
    const timeRef = ref(db, `Groups/${storedName}/Users/${user}/Times/${timeSlot}`);
    set(timeRef,1)
    
    .then(() => console.log(`Availability for ${timeSlot} updated!`))
    .catch(error => console.error("Error updating availability:", error));
});
}

document.getElementById("submit").addEventListener('click', print)

document.getElementById("groupPage").addEventListener('click', () =>{
  window.location.href='./groupView.html'
})

document.getElementById("homePage").addEventListener('click', () =>{
  window.location.href='./home.html'
})

document.getElementById("memberPage").addEventListener('click', () =>{
  window.location.href='./members.html'
})









    

    
  
    

 
    