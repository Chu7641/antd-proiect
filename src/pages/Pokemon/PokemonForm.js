import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Descriptions, Input, Form, Modal, Button } from 'antd';
import pokemonApi from '../../api/pokemonApi';
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
PokemonForm.propTypes = {

};

function PokemonForm(props) {
    const [loading, setLoading] = useState(false)
    const { open, onClose, currentPokemon } = props;
    const [pokemon, setPokemon] = useState();
    // console.log(currentPokemon.data);
    const handleOk = () => {
        onClose();
    }
    const initialData = {
        name: 'chu',
        version: 'Đức',
        type: 'Hải',
    }
    return (
        <Modal
            visible={open}
            onOk={handleOk}
            // onCancel={null}
            //  afterClose={true}
            // closable={handleOk}
            footer={[
                <Button
                    key="cancer"
                    type="primary"
                    onClick={handleOk}>
                    Return
            </Button>,
            ]}
        >

            <Form
                {...layout}
                name="basic"
              initialValues={initialData}
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="Version"
                    name="version"
                >
                    <Input readOnly />

                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                >
                    <Input readOnly />

                </Form.Item>
                {/* <Form.Item
                    label="Version"
                    name="version"
                >
                    <Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />

                </Form.Item> */}
            </Form>



        </Modal>
    );
}

export default PokemonForm;