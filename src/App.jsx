import detectEthereumProvider from '@metamask/detect-provider';
import 'bootstrap/dist/css/bootstrap.css';

import { useEffect, useState } from 'react';
import Web3 from 'web3';


function App() {

  const [web3Api , setWeb3Api] = useState({provider : null,  web3 :null})
  const [address , setAddress] = useState(null)


  

  const loadProvider = async () => {
    const provider = await detectEthereumProvider();
    if(provider) {
      setWeb3Api({
        provider,
        web3 :new Web3(provider),
      })
    }
  }

  const getAccount = async () => {
    let myAddress = await web3Api.web3?.eth.getAccounts()
    console.log('myAddress: ',myAddress)
    setAddress(myAddress ? myAddress : null)


  }

  const loginMetaMask = async () => {
    let myAddress = await web3Api.provider.request({method :"eth_requestAccounts"})
    console.log('myAddress: ',myAddress)
    setAddress(myAddress ? myAddress : null)


  }

 

  useEffect(() => {
    loadProvider()
  },[])

  useEffect(()=>{
    getAccount()

  },[web3Api])


  console.log('address : ',address)
  return (
    <div style={{height:'100vh',display:'grid',placeItems:'center'}}>
      <div>
        <div style={{fontSize : 30}}>Current Banlance : <span style={{fontWeight:600}}>10 ETH</span></div>
        <div style={{margin:'20px 0'}}>
        <button type="button" class="btn btn-success">Donate</button>
        <button style={{margin:'0 10px'}} type="button" class="btn btn-danger">Withdraw</button>
        {address?.length > 0 ? <button  type="button" class="btn btn-primary">Login Success !</button> :
         <button onClick={() => loginMetaMask()} type="button" class="btn btn-primary">Connect Wallet</button>}
        </div>
        <div style={{fontWeight:600}}>Your Wallet :      <span>{address?.length >0 ?address[0] : "let's connect metamask" }</span> </div>
      </div>


    
    </div>
  )
}

export default App
