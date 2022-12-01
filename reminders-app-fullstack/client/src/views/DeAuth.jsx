import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeAuth = (link = "") => {
    const Navigate = useNavigate();


    axios({
        method: "GET",
        withCredentials: true,
        url: 'http://localhost:8080/user/deauth'
    })
        .then(res => {
            if (res.data.msg) {
                return console.log("User Has Been Logged out")
            } else {
                return Navigate('/' + link)
            }
        })
        .catch(err => {
            console.log(err)
            Navigate("/" + link)
        })
}

export default DeAuth;