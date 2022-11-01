import React, { useState } from 'react'
import { Icon } from '@mui/material';

const Pill = ({ id, catname, passparam }) => {

  const handleLink = () => {
    passparam(id)
  }

  return (
    <div className='pill' onClick={handleLink}>
      {/* <Icon color="inherit">{icon}</Icon> */}
      <h4>{catname}</h4>
    </div>
  )
}

export default Pill