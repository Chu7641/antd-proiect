import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main';
import axios from 'axios';
import { Button, Input, message, Popconfirm, Space, Table } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import PokemonForm from './PokemonForm';




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
            setTotal(response.count)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    const getPokemon =async(id)=>{
        try {
            const response = await axios.get(id);
            console.log(response);
            setItem(response)
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
            render: text => <a>{text}</a>,
            // ...getColumnSearchProps('username'),

        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleOpenModal(record.url)}>Infor</a>
                    <Popconfirm title="Are you sure？"
                        okText="Yes" cancelText="No">
                        <a  >Delete</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ]


    async function getNewData(pagination) {
        try {
            setLoading(true)
            const parram = {
                offset: pagination.pageSize * (pagination.current - 1),
                limit: 20
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
    // const getPokemon=async(url)=>{
    //     try {
    //         const response = await axios.get(url);
    //         // console.log(response);
    //         setItem(response)
    //       } catch (error) {
    //         console.error(error);
    //       }
    // }
    const handleOpenModal = async(id) => {
        
            setLoading(true);
            await getPokemon(id);
            await console.log(item);
            setLoading(false);
            setmodal(true);
           
       

    }

    return (
        <Main active='4'>
            <Table
                onChange={onChangeTable}
                pagination={{ pageSize: 20, total: total, showSizeChanger: false }}
                scroll={{ y: 590 }}
                loading={loading}
                dataSource={pokemons}
                columns={columns}
            ></Table>

            <PokemonForm
                open={modal}
                onClose={handleOnClose}
                currentPokemon={item}
            />
        </Main>
    );
}
export default Pokemon;