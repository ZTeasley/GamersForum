import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import handleChange from '../actions/handleChange';


// export default function New(props) {
//     // Init state with a fresh/blank reminder object - based on our model from server folder
//     const [reminder, setReminder] = useState({
//         title:"",
//         description: '',
//         isDone: false,
//         days: Date.now()
//     });

//     //Var access to useNav hook
//     const navigate = useNavigate();

//     // called from submit button - sends state reminder obj to API - creating obj in db - navs home when done
//     const submitHandler = e => {
//         e.preventDefault();
//         axios.post(`http://localhost:8080/api/create`, reminder )
//             .then(res => console.log(res))
//             .catch(err => console.log(err))
//         navigate(`/`)
//     }

//     //exporting logic for modifying state Reminder obj - then setting state to that reminder
//     // We do this to save time on repeating code - and its clearer to read
//     const changeHandler = event => {
//         setReminder(
//             handleChange(reminder, event))
        
//     }

//     return (
//         <div>
//             {/* Ternary to gracefully await API data from state - loads when state is set */}
//             {/* we really dont need this when creating a new reminder bc state has initial values - even tho blank */}
//             { reminder ?
//             <div>
//                 <input value={reminder.title} onChange={changeHandler} placeholder="Reminder title"name="title"/>
//                 <input value={reminder.description} onChange={changeHandler}  placeholder="Description" name="description"/>

//             <br/>
//             <button onClick={submitHandler}>Submit</button>
//             </div>

//             : <p>Loading reminder....</p>}

//         </div>
//     )
// }

//======================================================================================================================================================================================\\




export default function NewPost(props) {
    // Init state with a fresh/blank post object - based on our model from server folder
    const [post, setPost] = useState({
    title:"",
    name: '', 
    description: '',
    // image: '',
    open: true,
    dateCreated: new Date()
});

    //Var access to useNav hook
    const navigate = useNavigate();

    // called from submit button - sends state post obj to API - creating obj in db - navs home when done
    const submitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/create`, post, {withCredentials: true} )
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate(`/home`)
    }

    //exporting logic for modifying state post obj - then setting state to that post
    // We do this to save time on repeating code - and its clearer to read
    const changeHandler = event => {
        setPost(
            handleChange(post, event))
        
    }

    const backHandler = (e) => {
        e.preventDefault();
        navigate('/home')
    }


    return (
        <div className="newpostDiv">
            <button className="btn light-blue lighten-2" onClick={backHandler}>Back</button>
            <br/>
            <br/>
            {/* Ternary to gracefully await API data from state - loads when state is set */}
            {/* we really dont need this when creating a new post bc state has initial values - even tho blank */}
            { post ?
            <div>
                <input value={post.title} onChange={changeHandler} placeholder="post Title" name="title" className="form-control textareas"/>
                <br/>
                <input value={post.name} onChange={changeHandler} placeholder="Name" name="name" className="form-control textareas"/>
                <br/>
                <input value={post.description} onChange={changeHandler}  placeholder="Description" name="description" className="form-control textareas"/>
            <br/>
            <br/>
            <button onClick={submitHandler} className="btn light-blue lighten-1">Submit</button>
            </div>

            : <p>Loading post....</p>}

        </div>
    )
}



