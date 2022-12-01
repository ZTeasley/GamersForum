import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleChange from "../actions/handleChange"
import useAuth from './useAuth';


// export default function OneReminder(props) {
//     //Init state
//     const [reminder, setReminder] = useState(null);

//     //Accessing Params from URL - returns object - { destructuring } to have single variable to use on other page logic
//     const { _id } = useParams()
//     // Accessing useNavigate Hook
//     const navigate = useNavigate();

//     // Lifecycle: on first render - get reminder from DB with _id var from Params
//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/${_id}`)
//             .then(res => {
//                 console.log(res.data);
//                 setReminder(res.data) // update state from API reminder data 
//             })
//             .catch(err => console.log(err))
//     }, [])

//     // Handling Delete function - sends API req - nav back to home after - called from delete button
//     const deleteHandler = e => {
//         e.preventDefault();
//         axios.delete(`http://localhost:8080/delete/${_id}`)
//             .then(res => console.log(res))
//             .catch(err => console.log(err))
//         navigate("/")
//     }

//     return (
//         <div>
//             <Link to={"/"} >Go Home</Link>
//             {/*  Ternary to gracefully handle the loadtime from our useEffect retrieving API data and setting it to state */}
//             {reminder ?
//                 <div>
//                     <h1> {reminder.title}</h1>
//                     <h4>{reminder.description}</h4>
//                     <br />
//                     <button><Link to={`/edit/${_id}`} > Edit </Link></button>
//                     <span>   </span>
//                     <button onClick={deleteHandler}>Delete</button>
//                 </div>

//                 : <p>Loading reminder....</p>}

//         </div>
//     )
// }

//======================================================================================================================================================================================\\

export default function OneTicket(props) {
    //Init state
    const [ticket, setTicket] = useState(null);
    const [LUser, setLUser] = useState({username: ""})
    const [reload, setReload] = useState(true)
    const [comment, setComment] = useState({
        username: "", // this will have to be more logic later once u create users and whatnot to have the username auto added here upone entering this page
        commenttext: "",
        datecreated: new Date()

    })


    //Accessing Params from URL - returns object - { destructuring } to have single variable to use on other page logic
    const { _id } = useParams()
    // Accessing useNavigate Hook
    const navigate = useNavigate();

    // Lifecycle: on first render - get ticket from DB with _id var from Params
    useEffect(() => {
        axios.get(`http://localhost:8080/api/${_id}`)
            .then(res => {
                console.log(res.data);
                setTicket(res.data) // update state from API ticket data 
            })
            .catch(err => console.log(err))
        axios.get("http://localhost:8080/user/auth", { withCredentials: true })
        .then(res => {
            setLUser(res.data.user)
            setComment({...comment, username: res.data.user.username})
            })
        .catch(err => console.log(err))

    }, [reload])

    // Handling Delete function - sends API req - nav back to home after - called from delete button
    const deleteHandler = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/delete/${_id}`, ticket)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate("/home")
    }

    const backHandler = (e) => {
        e.preventDefault();
        navigate('/home')
    }

    const testHandler = e => {
        setComment(
            handleChange(comment, e)
        )
    }

    const commentHandler = (e) => {
        e.preventDefault()
        console.log(comment)
        axios.post(`http://localhost:8080/comment/${_id}`, comment)
            .then(res => {
                console.log(res)
                setComment({ ...comment, commenttext: "" })
                setReload(!reload)
            })
            .catch(err => console.log(err))
    }

    useAuth()



    return (
        <div className="oneTicketDiv">

            {/*  Ternary to gracefully handle the loadtime from our useEffect retrieving API data and setting it to state */}
            {ticket ?
                <div>
                    <br />
                    <br />
                    <div className="innerOnePostDiv">
                        { LUser ? <h3> Welcome back {LUser.username}</h3> : null}
                        <h3> {ticket.title}</h3>
                        <br />
                        <h4> {ticket.name}</h4>
                        <span>{ticket.dateCreated}</span>
                        <br />
                        <h3>{ticket.description}</h3>
                        <br />
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="commenttext" name="commenttext" type="text" value={comment.commenttext} onChange={testHandler} data-length="1000" className="textareas" />
                                        <label for="input_text">Comment On Post</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button className="btn light-blue lighten-2" onClick={commentHandler}>Submit Comment</button>
                        <br />
                        <br />
                    </div>
                    <br />
                    {
                        ticket.comments.length > 0 ?
                            ticket.comments.map((c, i) => {
                                return <div className="comments">
                                    {c.commenttext}
                                </div>
                            })
                            : <p>No Comments</p>
                    }
                    <br />
                    <br />
                    {/* <Link to={`/editTicket/${_id}`}><button className="btn btn-primary">Edit Ticket</button></Link> */}
                    {/* <span>   </span>` */}
                    {/* <button onClick={deleteHandler} className="btn btn-primary">Delete Ticket</button> */}
                    <button onClick={backHandler} className="btn light-blue lighten-2 darken-3">Back</button>
                </div>

                : <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

//====================================================================================================================================================================\\

