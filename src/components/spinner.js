import React, { Fragment } from 'react';
import {CircularProgress} from '@material-ui/core';
function spinner() {
    return (
        <div style={{height:'90vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className='spinneritem' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <CircularProgress size={45} style={{color:'black'}}/>
            <h1 style={{fontFamily:'Poppins,sans-serif'}}>Loading...</h1>
        </div>
        </div>
    )
}

export default spinner;
