import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main';
import axios from 'axios';
import { Button, Input, message, Popconfirm, Space, Table } from 'antd';



Pokemon.propTypes = {

};

function Pokemon(props) {

    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemon] = useState();
    const [total,setTotal]=useState();
    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            setLoading(true)
            // setDeleting(false)
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            console.log(response);
            setPokemon(response.data.results);
            setTotal(response.data.count)
            setLoading(false)
            console.log(total);


        } catch (error) {
            console.error(error);
            setLoading(false);
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
                    <a>Edit</a>
                    <Popconfirm title="Are you sure？"
                        okText="Yes" cancelText="No">
                        <a  >Delete</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ]


    async function getNewData(pagination){
        try {
            setLoading(true)
            let offset=pagination.pageSize*(pagination.current-1);
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
            setPokemon(response.data.results);
            setTotal(response.data.count)
            setLoading(false)


        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    
    const onChangeTable=(pagination)=>{
        getNewData(pagination);

    }


    return (
        <Main active='4'>
            <Table
                onChange={onChangeTable}
                pagination={{pageSize:20, total:total,showSizeChanger:false}  }
                scroll={{ y: 590 }}
                loading={loading}
                dataSource={pokemons}
                columns={columns}
            ></Table>
        </Main>
    );
}
export default Pokemon;