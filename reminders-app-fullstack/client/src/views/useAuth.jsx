import axios from 'axios';
import { useNavigate } from 'react-router-dom';


/// This is an option arguement, not a variable

const useAuth = () => {
    const navigate = useNavigate();


    axios({
        method: "GET",
        withCredentials: true,
        url: 'http://localhost:8080/user/auth'
    })
        .then(res => {
            if (!res.data.user) {
                return navigate('/')
            } else {
                return console.log("User Has Been Authenticated")
            }
        })
        .catch(err => {
            console.log(err)
            navigate("/")
        })
}

export default useAuth;