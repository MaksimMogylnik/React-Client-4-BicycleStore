import React, { useState, useEffect } from 'react';
import Bicycle from './Bicycles'


async function getTokenAsync(login, password) {
    const credentials = {
        login: login,
        password: password
    }

    const response = await fetch('https://localhost:44000/api/account/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
        sessionStorage.setItem("accessToken", data.access_token)
    } else {
        console.log(response.status, data.errorText)
    }

}

async function getBicycles() {


    const token = sessionStorage.getItem("accessToken")
    let Bicycles = [""]



    const response = await fetch('https://localhost:44316/api/Bicycles', {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + token
        }
    })

    if (response.ok === true) {
        Bicycles = await response.json()
    }

    return Bicycles
}


function Bicycles() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [Bicycles, setBicycles] = useState([""])

    useEffect(async () => {
        let tmp = await getBicycles()
        setBicycles(tmp)
    }, []);

    var items = [""]
    if (Bicycles.length > 0) {
        items = Bicycles.map(item => <Bicycle key={item.BicycleId} info={item}></Bicycle>);
    }


    return (
        <>
            <div>
                <input type="text" onChange={(e) => (setLogin(e.target.value))}></input>
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button className="btn btn-success" onClick={async () => {
                    getTokenAsync(login, password)
                    let tmp = await getBicycles()
                    console.log(tmp)
                    setBicycles([])
                    setBicycles(tmp)

                }}>Login</button>
            </div>
            <table className="table table-success table-bordered">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Wheel Size</th>
                        <th>Material</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </>
    )
}

export default Bicycles