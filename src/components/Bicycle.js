import React from 'react';

function Bicycle(props) {
    return (
    <tr>
        <td><img src={props.info.photo} width="50" height="50"></img></td>
        <td>{props.info.title}</td>
        <td>{props.info.wheelDiameter}</td>
        <td>{props.info.material}</td>
        <td>{props.info.price}</td>
    </tr>
)
}

export default Bicycle