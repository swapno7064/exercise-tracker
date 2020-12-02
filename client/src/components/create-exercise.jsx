import React, { useEffect, useState } from 'react';
import axios from "axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {

    const [createExercises, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect(() => {
        axios.get('/api/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setExercise((prevState) => ({
                        ...prevState,
                        users: response.data.map(user => user.username)
                    }))
                }
            })
    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        setExercise(prevExercise => {
            return {
                ...prevExercise,
                [name]: value
            };
        });

    }
    function changeDate(date) {
        setExercise(prevExercise => {
            return {
                ...prevExercise,
                date: date,
            };
        });
    }



    function onSubmit(event) {
        event.preventDefault();
        console.log(createExercises);
        axios.post('/api/exercises/add', createExercises)
            .then(res => console.log(res.data));

        setExercise({
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: []
        });
        window.location = '/';
    }

    return (
        <div>
            <h3>Create New Exercise log</h3>
            <form >
                <div>
                    <label>Username: </label>
                    <select
                       name="username"
                        required
                        
                        className="form-control"
                        value={createExercises.username}
                        onChange={handleChange}>
                        {
                            createExercises.users.map(function (user, index) {
                                return <option key={user} value={user}>{user}</option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        value={createExercises.description}

                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        name="duration"
                        className="form-control"
                        onChange={handleChange}
                        value={createExercises.duration}

                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <DatePicker
                        selected={createExercises.date}
                        onChange={changeDate}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" onClick={onSubmit} >Create Exercise Log</button>
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;