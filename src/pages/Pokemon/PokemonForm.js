import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Descriptions, Input, Form, Modal, Button } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import Type from './Type';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
PokemonForm.propTypes = {

};

function PokemonForm(props) {
    const [form] = useForm();
    // const [loading, setLoading] = useState(false)
    const { loading, open, onClose, currentPokemon } = props;
    // const [types,setTypes]=useState();
    // console.log(currentPokemon);
    const handleOk = () => {
        onClose();
    };
    const imgPkm = currentPokemon.sprites.front_default;
    const types1=currentPokemon.types[0].type.name;
    const types2=currentPokemon.types[1]? currentPokemon.types[1].type.name : null;

    // console.log(imgPkm);
    console.log(types1,types2);
    const initialData = {
        id: '#'+currentPokemon.id,
        name: currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1),
        height: currentPokemon.height * 10 + ' cm',
        weight: currentPokemon.weight / 10 + ' kg',
    }
    
    
    return (
        <Modal
            width='40%'
            onCancel={handleOk}
            title={ currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}
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
                    label="# Id"
                    name="id"
                >
                    <Input readOnly />
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
                <Form.Item
                    label="Type"
                    name="type"
                >
                    <Type classPkm1={types1} classPkm2={types2} />

                </Form.Item>
                
            </Form>



        </Modal>
    );
}

export default PokemonForm;