import detectEthereumProvider from '@metamask/detect-provider';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import  Web3 from 'web3'

function App() {

  const loadProvider = async () => {
    const provider = await detectEthereumProvider();

    if(provider) {
      const chainId = await  provider.request({method : 'eth_requestAccounts'})
      console.log(chainId)

    }
  }

  useEffect(() => {
    loadProvider()
  },[])


  return (
    <div style={{height:'100vh',display:'grid',placeItems:'center'}}>
      <div>
        <div style={{fontSize : 30}}>Current Banlance : <span style={{fontWeight:600}}>10 ETH</span></div>
        <div style={{margin:'20px 0'}}>
        <button type="button" class="btn btn-success">Donate</button>
        <button style={{margin:'0 10px'}} type="button" class="btn btn-danger">Withdraw</button>
        <button type="button" class="btn btn-primary">Connect Wallet</button>
        </div>
        <div style={{fontWeight:600}}>Your Wallet :      <span>anc</span> </div>
      </div>


    
    </div>
  )
}

export default App
