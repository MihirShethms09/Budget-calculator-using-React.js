import React from "react"

const alert = ({type,text}) => {
    return(
        <div className={`alert alert-${type}`}>
            {text}
        </div>
    )
}


export default alert