import { Button, Col, Spin, message, Modal, Row, Space, Table, Input, Form, } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { useForm } from 'antd/lib/form/Form';
const { Column, ColumnGroup } = Table;


function ListData(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [status, setStatus] = useState(true)
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [data, setData] = useState([]);
    const [form] = useForm();
    const [formEdit] = useForm();
    const [id, setId] = useState();
    const [initialValue, setInitialValue] = useState();
    const [loading, setLoading] = useState(true);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };
    useEffect(() => {
        callApi();

    }, [])
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModal2 = (item) => {
        setIsModalVisible2(true);
        setInitialValue({
            userIdEdit: item.userId,
            idEdit: item.id,
            titleEdit: item.title,
            bodyEdit: item.body,
        })

    };

    const handleOk = () => {
        setLoading(true);
        var values = form.getFieldsValue();
        console.log(values);
        axios.post('https://jsonplaceholder.typicode.com/posts/', {
            userId: values.userId,
            id: data.length + 1,
            title: values.title,
            body: values.body
        })
            .then(function (response) {
                console.log(response);
                setLoading(false);
                message.info('Thêm thành công');
                form.resetFields();
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleOk2 = () => {
        setIsModalVisible2(false);
        var value2 = formEdit.getFieldValue();
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${value2.id}`, {
            userId: value2.userIdEdit,
            title: value2.titleEdit,
            body: value2.bodyEdit
        })
            .then(function (response) {
                console.log(response);
                message.info('Sửa thành công');
                form.resetFields();
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const deleteRecord = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
    const handleCancel2 = () => {
       formEdit.resetFields();
        setIsModalVisible2(false);
        
    };

    async function callApi() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log(response);
            setData(response.data);
            setStatus(false)
        } catch (error) {
            console.error(error);
        }
    }


    const deleteData = (id) => {
        const index = data.findIndex(x => x.id === id)
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
        deleteRecord(id)
        message.info("Xóa thành công")
    }


    return (
        <Main>
            <PlusOutlined onClick={showModal} />
            <Table loading={status} dataSource={data}>
                <Column title="User Id" dataIndex="userId" key="userId" />
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Title" dataIndex="title" key="title" />
                <Column title="Body" dataIndex="body" key="body" />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <a onClick={() => showModal2(record)} >Edit </a>
                            <a onClick={() => deleteData(record.id)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>

            <Modal title='Thêm mới' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form {...layout} form={form} >
                    <Form.Item
                        name="userId"
                        label="User Id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="body"
                        label="Body"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title='Chỉnh sửa' visible={isModalVisible2} onOk={() => handleOk2()} onCancel={handleCancel2}>
                <Form  {...layout} initialValues={initialValue} form={formEdit} >
                    <Form.Item
                        name="userIdEdit"
                        label="User Id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="idEdit"
                        label="Id"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        name="titleEdit"
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="bodyEdit"
                        label="Body"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

        </Main>
    );
}

export default ListData;