import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import AllOtherPosts from './AllOtherPosts';
import useAuth from './useAuth'
// import useGetUser from "./useGetUser"


export default function AllPosts() {


    const [post, setPost] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null)

    const [refresh, setRefresh] = useState(true)

    const navigate = useNavigate();



    useEffect(() => {
        axios.get('http://localhost:8080/api/all')
            .then(res => {
                // console.log(res.data.results);
                setPost(res.data.results)
            })
            .catch(err => console.log(err))
    }, [refresh])

    useEffect(() => {
        console.log("running")
        axios({
            method: "GET",
            withCredentials: true,
            url: 'http://localhost:8080/user/auth'
        })
            .then(res => { setLoggedUser(res.data.user) })

            .catch(err => { console.log(`The Useeffect err ${err}`) })

    }, [])


    const clearAllHandler = e => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/destroy/all`, { withCredentials: true })
            .then(res => {
                // console.log(res);
                setRefresh(!refresh);
            })
            .catch(err => console.log(err))
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`, { withCredentials: true })
            .then(res => {
                // console.log(res .data)
                setRefresh(!refresh)
            })
            .catch(err => console.log(err))

    }

    useAuth()

    const newPostHandler = (e) => {
        e.preventDefault();
        navigate('/newTicket')
    }



    // const logOutHandler = (e) => {
    //     e.preventDefault();
    //     axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: 'http://localhost:8080/user/auth'
    //     })
    //         .then(res => {
    //             if (res.data.user) {
    //                 return navigate("/")
    //             } else {
    //                 return console.log("User Has Been Authenticated");
    //             }
    //         })
    //         .catch(err => { console.log(err) })
    //     // app.route('/logout').get((req, res) => {
    //     //     req.logout();
    //     //     res.redirect('/');
    //     // });
    // }

    return (
        <div className="allPostsDiv">
            <h3 className="yrPosts">Game Forum 2022</h3>
            <br />
            {loggedUser ? <p className="allPostsDivLoggedUser">{loggedUser.username}</p> : <p>NO USER LOGGED IN</p>}
            <button className="btn blue createPostBtn" onClick={newPostHandler}>Create A Post</button>
            <br />
            <br />
            <button className="btn red deleteAllBtn" onClick={clearAllHandler}> Clear All Your Posts</button>
            <div>
                <br />
                {
                    post ? post.map((ticket, i) => {
                        return (
                            <h3 key={i}>
                                <div className="innerPostDiv">
                                    <div className="postDiv">
                                        <h4>
                                            {ticket.title}
                                            <hr />
                                            <h5>{ticket.description}</h5>
                                            <Link to={"/ticket/" + ticket._id} ref={node => node}><button className="btn purple lighten-2 AButton">Veiw Post</button></Link>

                                            {
                                                loggedUser ? //verify loggedUser is set in state - then see if the names match
                                                    ticket.creator === loggedUser.username?
                                                        <>
                                                            <button onClick={(e) => deleteHandler(ticket._id)} className="btn red darken-1 AButton">Delete Post</button>
                                                            <Link to={"/editTicket/" + ticket._id} ref={node => node}><button className="btn light-blue lighten-1 AButton">Edit Post</button></Link>
                                                        </>
                                                        : null // display buttons if they do, or null or nothing if not
                                                    : null // and same if loggedUser hasnt populated yet - just display nothing until it does
                                            }


                                        </h4>
                                    </div>
                                </div>
                                <br />
                            </h3>
                        )
                    }) : null
                }
                <div>
                    <p>
                        < AllOtherPosts refresh={refresh} setRefresh={setRefresh} ForumPosts={post} />
                    </p>
                </div>
            </div>




        </div>

    )
}




//===================================================================================================================================================================================\\
    // export default function AllReminders() {
    //     // Init state
    //     const [ reminders, setReminders ] = useState(null);

    //     // Lifecycle - On first render - make API call and set state to AllReminders Obj
    //     useEffect(() => {
    //         axios.get('http://localhost:8080/api/all')
    //             .then(res => {
    //                 console.log(res.data.results);
    //                 setReminders(res.data.results)
    //             })
    //             .catch(err => console.log(err))

    //     }, [])


    //     return (
    //         <div>
    //             <h1>All Reminders</h1>
    //             <Link to="/new">New</Link>
    //             {
    //                 // Ternary to gracefully await reminders from API/DB - then display once in state
    //                 reminders ? reminders.map((reminder, i) => {
    //                     return (
    //                         <li key={i}>
    //                             <h2>
    //                                 <Link to={"/" + reminder._id} ref={node => node} >{reminder.title}</Link> </h2>


    //                         </li>
    //                 )}) : null
    //             }
    //         </div>
    //     )
    // }

//===================================================================================================================================================================================\\

