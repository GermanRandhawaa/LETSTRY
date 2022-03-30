//----------------------------------------

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrqosswzj_hLSgF8mVzcmBbFkrZxYRYSw",
  authDomain: "letstry-ab243.firebaseapp.com",
  projectId: "letstry-ab243",
  storageBucket: "letstry-ab243.appspot.com",
  messagingSenderId: "909548733333",
  appId: "1:909548733333:web:5a38ff1aa3ea795728ac9c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
