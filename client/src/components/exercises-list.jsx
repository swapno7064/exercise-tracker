import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExercisesList() {

    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        axios.get('/api/exercises/')
            .then(response => {
                const newExercise = response.data;
                // console.log(newExercise);
                setExercises(newExercise);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const Exercise = (props) => {
        return (
            <tr>
                <td>{props.exercise.username}</td>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date.substring(0,10)}</td>
                <td>
                    <Link className="btn btn-link btn-sm" to={"/edit/" + props.exercise._id}>edit</Link> | <button className="btn btn-link btn-sm" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
                </td>
            </tr>)
    }
    function deleteExercises(id) {
        // console.log('id is',id);
        axios.delete('/api/exercises/' + id)
            .then(res => console.log(res.data));

        setExercises(prevExercises => {
            return prevExercises.filter((prevExercise) => {
                return prevExercise._id !== id;
            });
        });
    }

    console.log(exercises);
    return (

        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thread-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.map((currentExcercise, index) => {
                            return (
                                <Exercise exercise={currentExcercise} deleteExercise={deleteExercises} id={index} key={index} />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList;