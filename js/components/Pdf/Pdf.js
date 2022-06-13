import React from 'react';

const Pdf = ({url}) => {
    return (
        <object width={'100%'} height={'1190px'} style={{'minHeight': '100vh', 'width': '100%'}} data={url} type={'application/pdf'}>

        </object>
    )
};

export default Pdf;
