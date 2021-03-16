import { SearchOutlined } from '@ant-design/icons';
import {Spin, Button, Input, message, Popconfirm, Space, Table } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import Main from '../../components/Main';
import EditForm from '../../pages/ListData/EditForm';
import userApi from '../../api/userApi';
import Test from '../Test';


List.propTypes = {
    items: PropTypes.array,
  
};
List.defaultProps = {
    items: []
}

function List(props) {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [reload, setReload] = useState(true);
    const [selectedRowKey, setSelectedRowKey] = useState([]);
    const [searchText,setSearchText]=useState('');
    const [searchedColumn,setSearchedColumn]=useState('');
    
    var searchInput;


    useEffect(() => {
        async function fletchData() {
            try {
                setLoading(true)
                setDeleting(false)
                const response = await userApi.getAll();
                 console.log(response);
                setItems(response);
                setLoading(false);


            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        } fletchData();
        return () => {
        }
    }, [deleting, reload])

    const onCloseModal = () => {
        setModal(false);
    }

    const onReload = () => {
        setReload(!reload);
    }

    const openModalEdit = (data) => {

        setModal(true);
        setItem(data);
    }

    async function removeItem(item) {
        console.log(item);
        setLoading(true)
        axios.delete(`https://jsonplaceholder.typicode.com/users/${item.id}`, {
        })
            .then(function (response) {
                setLoading(false)
                console.log(response);
                const index = items.findIndex(x => x.id === item.id)
                const newData = [...items];
                newData.splice(index, 1);
                setItems(newData);
                setDeleting(true);
                message.info(`Đã xóa ${item.name}`)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
  
     // search
     const getColumnSearchProps = dataIndex => ({
         
         
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                 searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() =>handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() =>handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput, 100);
          }
        },
        render: text =>
        searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps('username'),
            
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => openModalEdit(record)} >Edit</a>
                    <Popconfirm title="Are you sure？" onConfirm={() => removeItem(record)}
                        okText="Yes" cancelText="No">
                        <a  >Delete</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

   

    const onSelectChange = selectedRowKey => {
        console.log('selectedRowKeys changed: ', selectedRowKey);
        setSelectedRowKey(selectedRowKey);
    };

    const rowSelection = {
        selectedRowKey,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKey.length > 0;


   
     const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex)
       
        
      };
    
     const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
      };

    //   search

    return (
        <Main active='2'>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKey.length} items` : ''}
            </span>
            <Table
                pagination={{pageSize:5}}
                loading={loading}
                dataSource={items}
                columns={columns}
                rowSelection={rowSelection}
                rowKey="id"
            />
            {modal ?
                <EditForm open={modal} onClose={onCloseModal} onReload={onReload} currentData={item} />
                : null}
                
        </Main>
    );
}

export default List;