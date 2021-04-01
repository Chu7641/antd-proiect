import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main';
import axios from 'axios';
import { Button, Input, message, Popconfirm, Space, Table } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import PokemonForm from './PokemonForm';
import './Pokemon.css'
import Search from 'antd/lib/input/Search';




Pokemon.propTypes = {

};

function Pokemon(props) {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemon] = useState();
    const [total, setTotal] = useState();
    const [modal, setmodal] = useState(false);
    const [item, setItem] = useState();
    const [filter,setFilter]=useState();


    
    useEffect(() => {
        fetchData();
        // getPokemon();
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await pokemonApi.getAll();
            console.log(response.results);
            setPokemon(response.results);
            setTotal(response.count);
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    // const handleOpenModal = async (id) => {

    //     setLoading(true);
    //     getPokemon(id);
    //     console.log(item);
    //     setLoading(false);
    //     setmodal(true);



    // }
    const goToPage = (url) => {
        // console.log(url);
        let link= `https://www.pokemon.com/us/pokedex/${url.name}`
        // console.log(link);
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
          );
    }
    const onSearch=async(value)=>{
        setLoading(true);
        console.log(value);
        setFilter(value);
        const poke=await pokemonApi.getPokemonId(value);
        console.log(poke);
        setItem(poke); 
        setmodal(true);
        setLoading(false);


    }
    const getPokemon = async (url) => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            console.log(response);
            setItem(response.data); 
            setLoading(false);
            setmodal(true);
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // render: text => <a>{text}</a>,
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: (text, record) => <a onClick={() => goToPage(record)} >Go to {record.name} US Pokedex</a>,
            // ...getColumnSearchProps('username'),

        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a className='infor' onClick={() => getPokemon(record.url)}>Infor</a>
                    <a className='select-pokemon' >Select</a>
                </Space>
            ),
        },
    ]


    async function getNewData(pagination) {
        try {
            setLoading(true)
            const parram = {
                offset: pagination.pageSize * (pagination.current - 1),
                limit: 10
            }
            const response = await pokemonApi.getAll(parram);
            setPokemon(response.results);
            setTotal(response.count)
            setLoading(false)


        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const onChangeTable = (pagination) => {
        getNewData(pagination);
        // console.log(pagination);

    }
    const handleOnClose = () => {
        setmodal(false);
    }

    


    
    return (
        <Main active='4'>
            <div className='search-bar'>
            <Search  placeholder="Name or Number" onSearch={onSearch} enterButton />
            </div>

            <Table
                onChange={onChangeTable}
                pagination={{ pageSize: 10, total: total, showSizeChanger: false }}
                // scroll={{ y: 590 }}
                loading={loading}
                dataSource={pokemons}
                columns={columns}
            ></Table>

            {modal ? <PokemonForm 
                loading={loading}
                open={modal}
                onClose={handleOnClose}
                currentPokemon={item}
            />
                : null}

        </Main>
    );
}
export default Pokemon;