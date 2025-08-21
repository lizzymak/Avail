import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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
  const user=localStorage.getItem("User")
  
  //initialize buttons, inupt boxes, and event listeners
  var createGroup=document.getElementById("createGroup");
  var joinGroup=document.getElementById("joinGroup");

  var createButton=document.getElementById("createButton");
  createButton.addEventListener('click', CreateGroup);

  var joinButton=document.getElementById("joinButton");
  joinButton.addEventListener('click', JoinGroup);


  //adds group name from input box into db
  function CreateGroup(){
    const groupName = createGroup.value;
    const dbRef = ref(db);
    get(child(dbRef, "Groups/"+groupName))
    .then((snapshot)=>{
      if(snapshot.exists()){
        alert("Name already exists")
      }
      else{
        console.log("Group in db")
        set(ref(db, "Groups/" + groupName),{
          GroupName: groupName
      })
      }
    })
  }

//opens page for group that was put into input box  
  function JoinGroup() {
    const dbRef = ref(db);
    const groupName = joinGroup.value;
    get(child(dbRef, "Groups/" + groupName))
    .then((snapshot)=>{
      if(snapshot.exists()){
        localStorage.setItem('GroupName', groupName)
        window.location.href = "myView.html";
      }
      else{
        alert("group doesnt exists")
      }
    })
  }
    
  
onAuthStateChanged(auth, (user) => {
  if (user) {
      console.log("logged in")
      console.log(user)
  } else {
      window.location.href="../frontend/signIn.html"
  }
})
