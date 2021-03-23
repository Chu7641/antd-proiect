import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main';
import axios from 'axios';
import { Button, Input, message, Popconfirm, Space, Table } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import PokemonForm from './PokemonForm';
import './Pokemon.css'




Pokemon.propTypes = {

};

function Pokemon(props) {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemon] = useState();
    const [total, setTotal] = useState();
    const [modal, setmodal] = useState(false);
    const [item, setItem] = useState();
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
        window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
    }
    const getPokemon = async (url) => {
        try {
            const response = await axios.get(url);
            console.log(response);
            setItem(response);
            setLoading(true);
            console.log(item);
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
            render: text => <a onClick={() => goToPage(text)} >{text}</a>,
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
            <Table
                onChange={onChangeTable}
                pagination={{ pageSize: 10, total: total, showSizeChanger: false }}
                // scroll={{ y: 590 }}
                loading={loading}
                dataSource={pokemons}
                columns={columns}
            ></Table>

            {modal ? <PokemonForm
                open={modal}
                onClose={handleOnClose}
                currentPokemon={item}
            />
                : null}

        </Main>
    );
}
export default Pokemon;