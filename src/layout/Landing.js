import React from 'react'
import './Main.css'
import {useNavigate } from 'react-router-dom';
import Header  from './Header';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

const Landing = () =>{
    const navigate = useNavigate();
    const check = "";
    const [address, setAddress] = useState('');
    const connectWallet = async() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const accounts = await provider.send("eth_requestAccounts", []);

        const balance = await provider.getBalance(accounts[0]);

        const network = await provider.getNetwork();

        console.log(network)

        console.log(Number(balance));

        console.log(accounts);

        await setAddress(accounts[0]);
    }

    useEffect(() => {
        connectWallet()
    }, [])

    useEffect(() => {
        if(address !== '')
            navigate("/connect");
    }, [address])

    return(
        <div className="body">
            <Header check={check}/>
            <div className="main flex-container">
                <button onClick={connectWallet} className='font-2 button-width-50 border-radius-10 button-height-8 connect-button-background border-none text-white flex-container' >
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}

export default Landing;