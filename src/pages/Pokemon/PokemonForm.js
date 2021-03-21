import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Descriptions, Input, Form, Modal, Button } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
PokemonForm.propTypes = {

};

function PokemonForm(props) {
    const [form] = useForm();
    const [loading, setLoading] = useState(false)
    const { open, onClose, currentPokemon } = props;
    console.log(currentPokemon);
    const handleOk = () => {
        onClose();
    };
    const imgPkm = currentPokemon.data.sprites.front_default;
    console.log(imgPkm);
    const initialData = {
        name: currentPokemon.data.name.charAt(0).toUpperCase() + currentPokemon.data.name.slice(1),
        height: currentPokemon.data.height * 10 + ' cm',
        weight: currentPokemon.data.weight / 10 + ' kg',
    }
    
    
    return (
        <Modal
            // width='30%'
            onCancel={handleOk}
            title={ currentPokemon.data.name.charAt(0).toUpperCase() + currentPokemon.data.name.slice(1)}
            visible={open}
            onOk={handleOk}
            // onCancel={null}
            //  afterClose={true}
            // closable={handleOk}
            footer={[
                <Button
                    loading={loading}
                    key="cancer"
                    type="primary"
                    onClick={handleOk}>
                    OK
            </Button>,
                // <Button
                //         key="cancer"
                //         type="primary"
                //         onClick={handleGetData}>
                //         ok
                // </Button>,


            ]}
        >

            <Form
                form={form}
                {...layout}
                name="basic"
                initialValues={initialData}
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            >
            <Form.Item
                    label='Image'
                    name="img"
                >
                    <Image
                        loading='true'
                        width={150}
                        src={imgPkm}
                    />

                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="Height"
                    name="height"
                >
                    <Input readOnly />

                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                >
                    <Input readOnly />

                </Form.Item>
                
            </Form>



        </Modal>
    );
}

export default PokemonForm;