import axios from "axios"
import qs from 'qs'

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
            axios({
              url: url,
              method: 'post',
              data: data,
              headers: { 'Content-Type': 'multipart/form-data' }
            })
              .then((res) => {
                resolve(res)
              })
              .catch((err) => {
                reject(err)
              })
          })
    }
}
