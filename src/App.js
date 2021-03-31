import { auth } from './firebase';
import './App.css';
import Constact from "./component/Contacts.js";
import AllComplaint from "./component/AllComplaint.js";
import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./App.css";
import { NavLink } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import { Route, Switch, Redirect } from "react-router-dom";

const getModelStyle = ()=>{
  const top = 50;
  const left = 50;
  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper:{
    position: `absolute`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `2px slid #000`,
    boxShadow: theme.shadows[5],
    padding:theme.spacing(2, 4, 3),
  },
}))

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModelStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [ContactPage, setContactPage] = useState(true);
  let count = 0;
  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user LogIN
        //console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
        //user logOut
      }
    })
    return () =>{
      //perform cleanup action
      unsubscribe();
    }
  }, [user, username]);
	//signUp event handler 
  const signUp = (event)=>{
      // event.preventDefault();

      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) =>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=> alert(error.message));

      setOpen(false);
  } 

//signIn event handler
  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }
  return (
    <div className ="row">
      <div className ="col-md-8 offset-md-2">
      	<Modal open = {open} onClose = {() => setOpen(false)} >
          
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signup">
             <center > 
              <img 
                className="app__headerImage"
                src="http://www.instagam.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="img" />
              </center>
              <Input 
                placeholder="username"
                type="text"
                value = {username}
                onChange = {(e)=> setUsername(e.target.value)} />

              <Input 
                placeholder="email"
                type="text"
                value = {email}
                onChange = {(e)=> setEmail(e.target.value)} />

              <Input 
                placeholder="password"
                type="password"
                value = {password}
                onChange = {(e)=> setPassword(e.target.value)} />    
             
              <Button type="submit" onClick= {signUp}> Sign Up </Button>  
            </form>    
          </div>

     	 </Modal>

    {/* This is modal for Sign In (It's like a pop up of signIN) */}  
      	<Modal open = {openSignIn} onClose = {() => setOpenSignIn(false)} >
          
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signup">
             <center > 
              <img 
                className="app__headerImage"
                src="http://www.instagam.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="img" />
              </center>

              <Input 
                placeholder="email"
                type="text"
                value = {email}
                onChange = {(e)=> setEmail(e.target.value)} />

              <Input 
                placeholder="password"
                type="password"
                value = {password}
                onChange = {(e)=> setPassword(e.target.value)} />    
             
              <Button type="submit" onClick= {signIn}> Sign In </Button>  
            </form>    
          </div>

      	</Modal>

      	<div className="app__header">    
            {user ? (
              user.email == "jennie123@gmail.com"?(
                            <div className="twoButtonSet">
                              <div className="LogoutButton">
                                <Button onClick={()=> auth.signOut()}>LOGOUT</Button>
                              </div>
                              <div className="ComplaintsButton">
                                <Button onClick={()=> setContactPage(true)}>Complaint Form</Button>
                                <Button onClick={()=> setContactPage(false)}>Complaints</Button>
                              </div>
                            </div>):(
                              <div className="LogoutButton">
                                <Button onClick={()=> auth.signOut()}>LOGOUT</Button>
                              </div>
                            )
            ):(
              <div className = "app__loginContainer">
                <Button onClick={()=> setOpenSignIn(true)}> Sign In</Button>
                <Button onClick={()=> setOpen(true)}> Sign Up</Button>
              </div>
            )}
          {/* Button which make modal appear*/}
      
      	</div>

      	{user?.displayName ? (
            user.email == "jennie123@gmail.com"?(
                               <div>
                                 {ContactPage?(
                                    <Constact />
                                  ):(
                                    <AllComplaint />
                                  )}
                              </div>
                            ):(
                              <div>you are not Allowed to access this site</div>
                            )
	      ):(
	      	<>
	        <h3>You need to signUp first and refresh again</h3>
	     	  <h3>Or if you have account than signIn</h3>
	     	</>
	      )}
      
      </div>
    </div>
  );
}

export default App;
