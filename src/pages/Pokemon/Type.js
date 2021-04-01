import React from 'react';
import PropTypes from 'prop-types';
import './Type.css';

Type.propTypes = {

};

function Type(props) {
    const { classPkm1, classPkm2 } = props
    return (
        <>
            <div className={classPkm1} >
                {classPkm1}
            </div>
            <div className={classPkm2} >
                {classPkm2}
            </div>
        </>

    );
}

export default Type;