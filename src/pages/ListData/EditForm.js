import {Spin, Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { React, useState } from 'react';



EditForm.propTypes = {

};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

function EditForm(props) {
    const [form] = useForm();

    const [loading, setLoading] = useState(false);

    const { onClose, currentData, open, onReload } = props;
    // console.log("current", currentData);
    const handleCancel = () => {
        onClose();
    }
    async function handleSubmit() {
        setLoading(true)
        var value = form.getFieldValue();
        console.log(value);
        await axios.patch(`https://jsonplaceholder.typicode.com/users/${currentData.id}`, {

            name: value.name,
            username: value.username,
            email: value.email
        })
            .then(function (response) {
                onReload();
                form.resetFields();
                console.log(response);
                message.info('Sửa thành công');
                handleCancel();
                console.log(value);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    async function handleAdd() {
        form.validateFields().then(async() => {
            var value = form.getFieldValue();
        console.log(value);
        setLoading(true);
        await axios.post(`https://jsonplaceholder.typicode.com/users/`, {
            id: Math.floor(Math.random() * 10),
            name: value.name,
            username: value.username,
            email: value.email,
            address: {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
            }
        })
            .then(function (response) {
                onReload();
                form.resetFields();
                setLoading(false);
                console.log(response);
                message.info('Thêm thành công');
                handleCancel();
                console.log(value);
                
            })
            .catch(function (error) {
                console.log(error);
            });

        })
        
    }
    const initialValues = {
        name: currentData.name,
        username: currentData.username,
        email: currentData.email,
    };
    return (
        <Spin spinning={loading} size="small" >
             <Modal
            loading={loading}
            title={"Chỉnh sửa"}
            visible={open}
            destroyOnClose={true}
            onCancel={handleCancel}
            width="50%"
            onOk={handleSubmit}

            footer={[
                <Button key="back" type="default" onClick={handleCancel} loading={loading}>
                    Close
            </Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit} loading={loading}>
                    Save
            </Button>,
                <Button key="submit" type="primary" htmlType="submit" onClick={handleAdd} loading={loading}>
                    Thêm mới
            </Button>,
            ]}
        >
            <Form
                initialValues={initialValues}
                {...layout}
                loading={loading}
                form={form}
                labelAlign="left"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message:'Bạn chưa nhập Tên'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </Spin>
    
       
    );
}

export default EditForm;