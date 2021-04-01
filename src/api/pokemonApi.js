import axiosClient from "./axiosClient";
import axiosClientPkm from "./axiosClientPkm";

const userApi={
    
    getAll:(params)=>{
        const url='/pokemon/';
        return axiosClientPkm.get(url,{params});
    },
    getPokemonId:(id)=>{
        const url=`/pokemon/${id}`;
        return axiosClientPkm.get(url,{id})
    }
    // deleteId:(id)=>{
    //     const url=`/pokemon/${id}`;
    //     return axiosClientPkm.delete(url);
    // },
    // updateId:(id)=>{
    //     const url=`/users/${id}`;
    //     return axiosClientPkm.patch(url);
    // }
}

export default userApi;