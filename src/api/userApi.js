import axiosClient from "./axiosClient";

const userApi={
    getAll:(params)=>{
        const url='/users';
        return axiosClient.get(url,{params});
    },
    deleteId:(id)=>{
        const url=`/users/${id}`;
        return axiosClient.delete(url);
    },
    updateId:(id,data)=>{
        const url=`/users/${id}`;
        return axiosClient.patch(url,data);
    },
    create : (data) => {
        const url=`/users`;
        return axiosClient.post(url,data);
    }
}

export default userApi;