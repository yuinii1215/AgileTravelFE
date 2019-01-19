import axios from "axios"
import qs from 'qs'
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

export default{
    fetchPost(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
    fetchSimplePost(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
    fetchGet(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params: params})
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            })
        })
    },
    doUpLoad(url,data){
        return new Promise((resolve, reject) => {
            axios.post(url,data,{
                    headers:{'Content-Type':'multipart/form-data'},
                    // withCredentials: true
                })
                .then(response => {
                    console.log(JSON.stringify(response))
                    resolve(response.data);
                }).catch((error) => {
                    reject(error);
                })
          })
    },
    doUpLoadImage(url,formData){
        return new Promise((resolve, reject) => {
            fetch(url,{  
                method:'POST',  
                headers:{  
                    'Content-Type':'multipart/form-data'
                },  
                body:formData,  
                })  
                .then((response) => {response.text();console.log(JSON.stringify(response)) })  
                .then((responseData)=>{  
                    console.log('responseData',responseData);  
                    resolve(responseData);
                })  
                .catch((error)=>{console.log(error);reject(error);}
            );  
        })
    }
        
}
