import { Typography } from '@material-ui/core'
import React from 'react'

function Footer() {
    return (
        <div className='footer1'>
            <div className="innerfooter">
            <Typography variant="h5" style={{fontFamily:'Poppins',fontWeight:"bold"}}>WeatherInformatica</Typography>
            <Typography variant="h7" style={{fontFamily:'Poppins'}}>&copy;2021 WeatherInformatica.All rights reserved.</Typography>
            </div>
        </div>
    )
}

export default Footer
