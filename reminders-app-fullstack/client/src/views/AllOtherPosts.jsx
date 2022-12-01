import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleChange from '../actions/handleChange';
import AllPosts from './ForumPage';
import { Link } from 'react-router-dom';
import DeAuth from "./DeAuth"


export default function AllOtherPosts(props) {

    const [post, setPost] = useState(null);
    const { _id } = useParams();
    const navigate = useNavigate();

    const [allPosts, setAllPosts] = useState([])
    const [ticket, setTicket] = useState(null);

    const { refresh, setRefresh, ForumPosts } = props;


    // const [useState, useEffect] = useState(null);

    const Navigate = useNavigate()



    // useEffect(() => {
    //     axios.get(`http://localhost:8080/posts/all`)
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    // const submitHandler = e => {
    //     e.preventDefault();
    //     axios.put(`http://localhost:8080/api/${_id}`, post)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //     navigate(`/`)
    // }

    // const changeHandler = (event) => {
    //     setPost(
    //         handleChange(post, event)
    //     )
    // }

    // const backHandler = (e) => {
    //     e.preventDefault();
    //     navigate(`/`)
    // }

    // const findAllPosts = (e) => {
    // console.log(post);

    // }

    useEffect(() => {
        axios.get(`http://localhost:8080/find/all`)
            .then(res => {
                setAllPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [ForumPosts])


    // const findAllPosts = (e) => {
    //     e.preventDefault();
    //     axios.get(`http://localhost:8080/find/all`)
    //         .then(res => setAllPosts(res.data))
    //         .catch(err => console.log(err))
    // }

    // console.log(allPosts);

    // const viewPostHandler = (e) => {
    //     e.preventDefault();
    //     navigate(`/ticket/${_id}`)
    // }

    // const logoutHandler = (e) => {
    //     e.preventDefault();
    //     navigate('/')
    // }

    // const logOutHandler = (e) => {
    //     e.preventDefault();
    //     axios({
    //         method: "GET",
    //         withCredentials: true,
    //         url: 'http://localhost:8080/user/deauth'
    //     })
    //     .then(
    //         navigate("/")
    //     )
    //     .catch(err => {console.log(err)})
    // }

    // const LogOutHandler =  DeAuth()

    const logOutHandler = (e) => {
        e.preventDefault();
        axios({
            method: "GET",
            withCredentials: true,
            url: 'http://localhost:8080/user/deauth'
        })
            .then(res => {
                if (res.data.msg) {
                    Navigate('/')
                    return console.log("User Has Been Logged out")
                } else {
                    return Navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
                Navigate("/")
            })
    }


    // const logOutHandler = (e) => {
    //     e.preventDefault();

    // }


    return (
        <div className="AllPostspostDiv">
            {/* {post ? */}

            <div className="otherPostsDiv">
                <h3 className="lclPosts">Local Posts</h3>
                <div>
                    {/* <button className="btn light-blue lighten-2" onClick={findAllPosts}>Refresh</button> */}
                    <button className="btn red logoutBtn" onClick={logOutHandler}>Logout</button>
                </div>
                {
                    allPosts ? allPosts.map((item, idx) => {

                        // console.log(item);

                        return (
                            <div className="postsInLclPosts">
                                <h4>
                                    {item.title}
                                </h4>
                                <h5>
                                    {item.name}
                                </h5>
                                <h6>
                                    {item.dateCreated}
                                </h6>
                                <h4>
                                    {item.description}
                                </h4>
                                <br />
                                <div>
                                    {/* <button className="btn purple lighten-2 AButton">Veiw Post</button> */}
                                    {/* <div class="row">
                                        <form class="col s12">
                                            <div class="row">
                                                <div class="input-field col s12">
                                                    <input id="input_text" type="text" data-length="1000"></input>
                                                    <label for="input_text">Comment On Post</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div> */}
                                    {/* <button className="btn grreen">Submit Comment</button> */}
                                </div>
                                <Link to={"/ticket/" + item._id} ref={node => node}><button className="btn light-blue lighten-2">View Post</button></Link>
                            </div>
                        )
                    }) :
                        <div className="otherPostsDiv">
                            <h3 className="lclPosts">Local Posts</h3>
                            <br />
                            <div className="preloader-wrapper big active loaderForLclPosts">
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

                        </div>
                }
            </div>













        </div>
    )
}


// export default AllPosts; 