import React from "react";

const Button = (props) => {
    // console.log(props);

    return <button onClick={props.functionToExecute}>{props.text}</button>;
}

export default Button;