import React from 'react'

import { ClipLoader } from 'react-spinners'

function Spinner(_props:any) {
    return (
        <ClipLoader color={_props.color} cssOverride={_props.override} size={_props.size}/>
    )
}

export default Spinner