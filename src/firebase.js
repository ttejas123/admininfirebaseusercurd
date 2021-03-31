  import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyAQe4l3be2FOEBCX47G2S1ustMHSIBXvsI",
    authDomain: "react-curd-2f863.firebaseapp.com",
    databaseURL: "https://react-curd-2f863-default-rtdb.firebaseio.com",
    projectId: "react-curd-2f863",
    storageBucket: "react-curd-2f863.appspot.com",
    messagingSenderId: "305965275974",
    appId: "1:305965275974:web:1f0db2c262c98793476347"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);
  const auth  = firebase.auth();
  export default fireDb.database().ref();
  export { auth };
  