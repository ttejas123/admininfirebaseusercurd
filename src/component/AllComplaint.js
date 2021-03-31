import React, {useState, useEffect} from "react";
import firebase from "../firebase";
const AllComplaint = ()=>{
	const [contactObject, setContactObject] = useState({});
	const [currentId, setCurrentId] = useState('');
	//get data from fireBase DataBase and store in setContactObject
	useEffect(()=>{
		firebase.child(`Contact`).on('value', snapshot=>{
			if(snapshot.val()){
				setContactObject({
					...snapshot.val()
				})
			}
		})
	},[])
	
	return (
		<>
			<div className="jumbotron jumbotron-fluid">
			  <div className="container">
			    <h1 className="display-4 text-center">C M S</h1>
			  </div>
			</div>
		    <div className="row">
				<div className="col-md-12">
					<table className="table table-borderless table-stripped">
						<thead className="thead-light">
							<th>full Name</th>
							<th>Class</th>
							<th>Email</th>
							<th>Satus</th>
							<th>Complaint</th>                     
						</thead>
						<tbody>
							{
								Object.keys(contactObject).map(id =>{
									return <tr key={id}>
										<td>{contactObject[id].fullName}</td>
										<td>{contactObject[id].class}</td>
										<td>{contactObject[id].email}</td>
										<td>{contactObject[id].status}</td>
										<td>{contactObject[id].complaint}</td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			</div>
		</>	
		);	
}

export default AllComplaint;