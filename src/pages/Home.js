import React from 'react';
import Main from '../components/Main';
import { useCookies } from "react-cookie";


function Home(props) {
    const active='1';
    const [cookies,setCookie]=useCookies(['access_token','user_info','user_name']);
    console.log(active);
    return (
        <Main active='1'>
            Xin Chào {cookies.user_name} 
        </Main>
    );
}

export default Home;