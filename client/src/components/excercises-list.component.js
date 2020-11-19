import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'; 

const Exercise = (props) => {
    return(
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={()=>props.deleteExercise(props.exercise._id)}>delete</a>
            </td>
        </tr>
)}

export default class ExercisesList extends Component{

    constructor(props){
        super(props);

        this.state={exercises:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                this.setState({exercises:res.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteExercise=(id)=>{
        axios.delete("http://localhost:5000/exercises/"+id)
            .then(res => console.log(res.data));
        this.setState({
            exercises:this.state.exercises.filter(el => el._id!==id)
        })    
    }

    exerciseList=()=>{
        return this.state.exercises.map(currentexcercise => {
            return <Exercise exercise={currentexcercise} deleteExercise={this.deleteExercise} key={currentexcercise._id}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Logged exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>description</th>
                            <th>duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}