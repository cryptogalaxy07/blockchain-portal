import React, { useState , useEffect, useRef } from 'react';
import Header from './Header';
import './Main.css'
import ToggleButton from './ToggleButton'
//import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {
    supportChainId,
    // portalContract
    providers,
    Contrats
} from '../contracts';


const Connect = () => {
    
   // const walletvalues = useRef(0);
    const gamevalues = useRef(0);
    const [walletvalues ,setWalletvalues] = useState('');
    const [gameValueTest ,setGameValueTest] = useState("");
    const [transferType,setTransferType] = useState("Deposit");
    const [walletBalance, setBalance] = useState(0);
    const [gameBalance, setGameBalance] = useState(0);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const portalContract = new ethers.Contract(Contrats.portalcontract.address, Contrats.portalcontract.abi, signer);
    
    const getWalletBalance = async () => {
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance_ = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance_));
    }

    const getGameBalance = async() => {
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance_ = await portalContract.isDeposit(accounts[0]);
        setGameBalance(ethers.utils.formatEther(balance_)); 
        setGameValueTest(ethers.utils.formatEther(balance_));
        //console.log(ethers.utils.formatEther(balance_));
        
    }

    useEffect( () => {
        getWalletBalance();
        getGameBalance();
     }, []);

    const changeTransferType = () =>{
        if(transferType === "Deposit")
            setTransferType("WithDraw");
        else setTransferType("Deposit");
    }

    const DepositClick = async() => {
        //console.log(provider.getBalance);
        //console.log(await provider.getBalance());
        //console.log(values.inputWalletValue);
        const depositVaule = walletvalues;
        //console.log(depositVaule);
        if(Number(depositVaule) !== NaN){
            console.log(depositVaule);
            //const accounts = await provider.send("eth_requestAccounts", []);
            //console.log(Number(ethers.utils.parseEther(String(depositVaule)));
            //await portalContract.deposit(accounts[0], { value: Number(ethers.utils.parseEther(depositVaule) )});

            const transaction = await portalContract.deposit({ value: ethers.utils.parseEther(depositVaule) })
            
            //sends 0.1 eth
            await transaction.wait()
        }
    }

     const onWalletChange = async(e) => {
        // const { name, value } = e.target;
        // setValues({
        //     ...values,
        //     [name]: value
        //   });
        // console.log(value);
        // setWalletvalues(e.target.value);
       //(gameValueTest) += Number(e.target.value);
       //console.log(e.target.value);
        setWalletvalues(e.target.value);
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance_ = await portalContract.isDeposit(accounts[0]);
        let balance = Number(ethers.utils.formatEther(balance_));
       // console.log(gameValueTest_);
       balance += Number(e.target.value);
       // console.log(Number(e.target.value));
        setGameValueTest(balance);
     }

    const WithDrawClick = async() => {
        const gameVaule = gamevalues.current.value;
        //console.log(depositVaule);
        if(Number(gameVaule) !== NaN){
            console.log(gameVaule);
            //const accounts = await provider.send("eth_requestAccounts", []);
            //console.log(Number(ethers.utils.parseEther(String(depositVaule)));
            //await portalContract.deposit(accounts[0], { value: Number(ethers.utils.parseEther(depositVaule) )});

            const transaction = await portalContract.withDraw(ethers.utils.parseEther(gameVaule));
            
            //sends 0.1 eth
            await transaction.wait()
        }
    }

//     const DepositScreen = () => {
        
//         return(
//         <div>
//             <div className='row mt-20'>
//                 <div className='col-6'>
//                     <p className='text-white'><strong>Wallet Balance:{walletBalance}</strong></p>
//                     <input className="form-control form-control-lg background-dark text-white"
//                      type="text" 
//                      placeholder="0.0" 
//                      //ref={walletvalues}
//                      value = {walletvalues}
//                      name="inputWalletValue"
//                      onChange={e => setWalletvalues(e.target.value)}
//                      />
//                 </div>
//                 <div className='col-4'>
//                     <p className='text-white'><strong>Game Balance:{gameBalance}</strong></p>
//                     <input className="form-control form-control-lg background-dark text-white" 
//                     type="text" 
//                     placeholder="0.0" 
//                     key={gameValueTest}
//                     value={gameValueTest}
//                     readOnly />
//                 </div>
//             </div>
//             <div className='mt-5'>
//                 <button onClick={DepositClick} className='m-auto font-2 button-width-80 border-radius-10 button-height-8 connect-button-background border-none text-white flex-container' >
//                     Deposit
//                 </button>
//             </div>
//         </div>
//         )
// }

    const WithDrawScreen = () => (
        <div>
            <div className='row mt-20'>
                <div className='col-4'>
                    <p className='text-white'><strong>Game Balance:{gameBalance}</strong></p>
                    <input className="form-control form-control-lg background-dark text-white" 
                    type="text" 
                    ref={gamevalues}
                    placeholder="0.0"  />
                </div>
                <div className='col-6'>
                    <p className='text-white'><strong>Wallet Balance:{walletBalance}</strong></p>
                    <input className="form-control form-control-lg background-dark text-white" 
                    type="text" 
                    placeholder="0.0" 
                    value={walletBalance}
                    readOnly />
                </div>
            </div>
            <div className='mt-5'>
                <button onClick={WithDrawClick} className='m-auto font-2 button-width-80 border-radius-10 button-height-8 connect-button-background border-none text-white flex-container' >
                    WithDraw
                </button>
            </div>
        </div>
    )

    return(
        <div className='body'>
            <Header check={transferType}/>
            <div className='container'>
                <label className='text-white mr-3'>Deposit</label>
                <ToggleButton check = {changeTransferType}/>
                <label className='text-white'>WithDraw</label>
                {transferType === "Deposit" 
                ? <div>
                <div className='row mt-20'>
                    <div className='col-6'>
                        <p className='text-white'><strong>Wallet Balance:{walletBalance}</strong></p>
                        <input className="form-control form-control-lg background-dark text-white"
                         type="text" 
                         placeholder="0.0" 
                         //ref={walletvalues}
                         value = {walletvalues}
                         name="inputWalletValue"
                         onChange={onWalletChange}
                         />
                    </div>
                    <div className='col-4'>
                        <p className='text-white'><strong>Game Balance:{gameBalance}</strong></p>
                        <input className="form-control form-control-lg background-dark text-white" 
                        type="text" 
                        placeholder="0.0" 
                        key={gameValueTest}
                        value={gameValueTest}
                        readOnly />
                    </div>
                </div>
                <div className='mt-5'>
                    <button onClick={DepositClick} className='m-auto font-2 button-width-80 border-radius-10 button-height-8 connect-button-background border-none text-white flex-container' >
                        Deposit
                    </button>
                </div>
            </div>: 
                    <WithDrawScreen />
                }
                <div className='mt-3'>
                    <p className='text-white pl-20 background-darkgray border-radius-10'>Use this portal to depositand withdraw game coins
                    <br />
                    There is a maximum withdrawal amount of 1000 coins perday
                    <br/><br/>
                    Game coins will automatically appear in your game wallet.
                    <br/>
                    The ratio is set 1:1
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default Connect;