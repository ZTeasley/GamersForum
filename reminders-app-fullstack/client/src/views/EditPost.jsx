import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleChange from '../actions/handleChange';


// export default function Edit(props) {
//     const [reminder, setReminder] = useState(null);

// // Destructuring _id from useParams - which returns a obj containing all params in URL
//     const { _id } = useParams();
//     // Setting var access to useNavigate Hook
//     const navigate = useNavigate();

//     // Lifecycle - on first render - gets single reminder data from API - uses _id from Params
//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/${_id}`)
//             .then(res => {
//                 console.log(res.data);
//                 setReminder(res.data)
//                 // setLoad(!load);
//             })
//             .catch(err => console.log(err))
//     }, [])

//     //Called from Submit button - handles submitting new Reminder obj from state to our API route // then nav's to that reminder page
//     const submitHandler = e => {
//         e.preventDefault();
//         axios.put(`http://localhost:8080/api/${_id}`, reminder )
//             .then(res => console.log(res))
//             .catch(err => console.log(err))
//         navigate(`/${_id}`)
//     }

//     //Called from inputs onChange - exports updating reminder obj, then sets that to state - a common utility we need to do
//     //on multiple pages - exported to its own file for quick access and D.R.Y. 
//     // +++++ see ../actions/handleChange.jsx +++
//     const changeHandler = (event) => {
//         setReminder(
//             handleChange(reminder, event)
//         )
//     }

//     return (
//         <div>
//             {/* Ternary to gracefully await reminder data from API/DB */}
//             { reminder ?
//             <div>
//                 <input value={reminder.title} onChange={changeHandler} name="title"/>
//                 <input value={reminder.description} onChange={changeHandler} name="description"/>

//             <br/>
//             <button onClick={submitHandler}>Submit</button>
//             </div>

//             : <p>Loading reminder....</p>}

//         </div>
//     )
// }


//======================================================================================================================================================================================\\


export default function Edit(props) {

    const [post, setPost] = useState(null);
    const { _id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/api/${_id}`)
            .then(res => {
                console.log(res.data);
                setPost(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/${_id}`, post)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate(`/home`)
    }

    const changeHandler = (event) => {
        setPost(
            handleChange(post, event)
        )
    }

    const backHandler = (e) => {
        e.preventDefault();
        navigate(`/home`)
    }

    return (
        <div className="editpostDiv">
            {post ?

                <div className="editPost">
                    <button className="btn light-blue lighten-2" onClick={backHandler}>Back</button>
                    <br />
                    <br />
                    <input value={post.title} onChange={changeHandler} name="title" className="form-control textareas" placeholder="Title" />
                    <br />
                    <input value={post.name} onChange={changeHandler} name="name" className="form-control textareas" placeholder="Username" />
                    <br />
                    <input value={post.description} onChange={changeHandler} name="description" className="form-control textareas" placeholder="Post Text" />
                    <br />
                    <br />
                    <button onClick={submitHandler} className="btn light-blue lighten-3">Submit</button>
                </div>

                : <p>Loading post....</p>}

        </div>
    )
}
