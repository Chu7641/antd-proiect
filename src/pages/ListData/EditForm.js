import { Spin, Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { React, useState } from 'react';
import userApi from '../../api/userApi';



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
       form.validateFields().then(async()=>{
        setLoading(true)
        var value = form.getFieldValue();
        console.log(value);
        await userApi.updateId(value.id, value);
        setLoading(false);
        onClose();
        message.info('Sửa thành công');
       })
    }
    async function handleAdd() {
        form.validateFields().then(async () => {
            var value = form.getFieldValue();
            console.log(value);
            setLoading(true);
             await userApi.create(value);
             message.info("Đã thêm: "+ value.name);
            setLoading(false);
            onClose();
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
                                message: 'Bạn chưa nhập Tên'
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