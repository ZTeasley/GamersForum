import axios from 'axios';
/// This is an option arguement, not a variable

const useGetUser = () => {


    axios({
        method: "GET",
        withCredentials: true,
        url: 'http://localhost:8080/user/auth'
    })
        .then(res => {

            return res.data.user
        })
        .catch(err => {
            console.log(err)

        })


    
}

export default useGetUser;