import axios from 'axios';
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
        
         .then(async ({data, status, statusText}) => {
            if (status < 200 || status >= 300) {
                throw new Error(statusText);
            }
            else {
                localStorage.setItem('auth', `${data['token_type']} ${data['access_token']}`);
                refresh()
                await axiosInstance({
                    url: '/users/me', 
                    method: "get"
                }).then(({data, status, statusText}) => {
                    localStorage.setItem('permissions', JSON.stringify(data))
                    localStorage.setItem('permissions_time', JSON.stringify((new Date).getTime()))
                })
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
        localStorage.removeItem('permissions');
        localStorage.removeItem('permissions_time');
        
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
        let perms = localStorage.getItem('permissions')
        const lastTime = JSON.parse(localStorage.getItem('permissions_time'))
        const currentTime = (new Date).getTime()
        if (perms && lastTime && ( lastTime + 100000 ) < currentTime ) return Promise.resolve(JSON.parse(perms))
        else return axiosInstance({
            url: '/users/me', 
            method: "get"
        }).then(({data, status, statusText}) => {
            if (status < 200 || status >= 300) {
                throw new Error(statusText);
            }
            else {
                
            }
            return Promise.resolve(data)
        })
        // return Promise.resolve()
    },
};