import axiosInstance, { refresh } from '../constants/axiosInstance'

export default {
    // called when the user attempts to log in
    login: ({ username, password }) => {

        return axiosInstance({
            url: '/auth/login', 
            method: "post",
            data: {
                username: username,
                password: password
            } 
        })
        
         .then(({data, status, statusText}) => {
            if (status < 200 || status >= 300) {
                throw new Error(statusText);
            }
            else {
                localStorage.setItem('auth', `${data['token_type']} ${data['access_token']}`);
                refresh()

            }
            return Promise.resolve()
        })
        .catch(() => {
            throw new Error('Problème de connexion')
        });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('auth');
        console.log("logout")
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: (err) => {
        if (err.status === 401 || err.status === 403) {
            // localStorage.removeItem('auth');
            // localStorage.removeItem('x-code');
            console.log(err)
            return Promise.reject();
        }
        console.log("check errors")

        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        if(localStorage.getItem('auth')){
            console.log('YOU ARE AUTH')
            return Promise.resolve()
        }
        else {
            console.log('You are not authenticated')
            return Promise.reject();

        }
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: (props) => {
        console.log("get permissions with", props)
        return Promise.resolve()
    },
};