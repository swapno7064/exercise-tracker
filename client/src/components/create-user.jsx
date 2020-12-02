import React, { useState } from 'react';
import axios from "axios"

function CreateUser() {
    const[username,setUsername]=useState("");

    function handleChange(event){
        const value=event.target.value;
        setUsername(value);
    }
    function onSubmit(event){
        event.preventDefault();
        console.log(username);
        axios.post('/api/users/add',{username})
        .then(res=> console.log(res.data));
        setUsername("");

    }
    return (
        <div>
           <h3>Create New User</h3>
           <form>
               <div className="form-group">
                 <label>Username: </label>
                 <input className="form-control" name="user" type="text" value={username} onChange={handleChange} />
               </div>
               <div className="form-group">
                 <button className="btn btn-primary" onClick={onSubmit}>CreateUser</button>
               </div>
           </form>
        </div>
    )
}

export default CreateUser;