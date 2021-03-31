import React, {useState, useEffect} from "react";

const ContactForm=(props)=>{
	//default empty object
	const initialValues = {
		fullName:"",
		class:"",
		email:"",
		complaint:"",
		status:"pending"
	}
	
	const [values, setValues] = useState(initialValues);
	//for set value to passing to contact.js
	useEffect(()=>{
		if(props.currentId==""){
			setValues({
				...initialValues
			})
		}else{
			//if we get props.currentId mean this is update opration and now we setValue to pass to the Cntact.js
			setValues({
				...props.contactObject[props.currentId]
			})
		}
	},[props.currentId, props.contactObject]);
	const handleInputeChange = (event)=>{
	    const { name, value } = event.target;
		setValues({
			...values,
			[name] : value,
		})
	}
	//after submiting form this data pass to contact.js to save or update data.
	const handleFormSubmit = (event)=>{
		event.preventDefault();
		props.addOrEdit(values);
		setValues(initialValues);
	}
	  return (
	  	<>
	  	<form autoComplete="off" onSubmit={handleFormSubmit}>
	  		<div className ="form-group input-group">
	  			<div className="input-group-prepend">
	  				<div className="input-group-text">
	  					<i className="fas fa-user"></i>
	  				</div>
	  			</div>
	  			<input className="form-control"
		  			 placeholder="fullName"
		  			 name="fullName"
		  			 value={values.fullName}
		  			 onChange={handleInputeChange} />
	  		</div>
	  		<div className ="form-group input-group">
	  			<div className="input-group-prepend">
	  				<div className="input-group-text">
	  					<i className="fas fa-user"></i>
	  				</div>
	  			</div>
	  			<input className="form-control"
		  			 placeholder="status"
		  			 name="status"
		  			 value={values.status}
		  			 onChange={handleInputeChange} />
	  		</div>
	  		<div className="form-row">
	  			<div className ="form-group input-group col-md-6">
		  			<div className="input-group-prepend">
		  				<div className="input-group-text">
		  					<i className="fas fa-address-card"></i>
		  				</div>
		  			</div>
		  			<input className="form-control"
			  			 placeholder="class"
			  			 name="class"
			  			 value={values.class}
			  			 onChange={handleInputeChange} />
	  			</div>
	  			<div className ="form-group input-group col-md-6">
		  			<div className="input-group-prepend">
		  				<div className="input-group-text">
		  					<i className="fas fa-envelope"></i>
		  				</div>
		  			</div>
		  			<input className="form-control"
			  			 placeholder="email"
			  			 name="email"
			  			 value={values.email}
			  			 onChange={handleInputeChange} />
	  			</div>
	  		</div>
	  		<div className="form-group">
	  				<textarea className="form-control" placeholder="complaint" name="complaint"
	  				     value={values.complaint}
			  			 onChange={handleInputeChange} />
	  			</div>
	  			<div className="form-group">
	  				<input type="submit" value ={props.currentId==""?"Save":"Update"} className="btn btn-primary btn-block"/>
	  			</div>
	  	</form>
	  	</>
	  	);
}

export default ContactForm;