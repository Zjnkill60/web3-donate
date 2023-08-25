import detectEthereumProvider from '@metamask/detect-provider';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';


function App() {

  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null, contract: null })
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  // const contractJson = fs.readFileSync('./contracts/Faucet.json')



  const loadProvider = async () => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider)
    const abi = await fetch('/contracts/Faucet.json')
    const abiJSON = await abi.json()

    const contract = new web3.eth.Contract([abiJSON], "0x7af2b76997D1Fff2A52B96487B3d7E9EF05AB42d")
    contract.setProvider(provider)
    console.log(contract)
    if (provider) {
      setWeb3Api({
        provider,
        web3,
        contract
      })
    }
  }

  const getAccount = async () => {
    let myAddress = await web3Api.web3?.eth.getAccounts()
    let myBalance = await web3Api.web3?.eth.getBalance(web3Api?.contract?._address)
    setAddress(myAddress ? myAddress : null)
    setBalance(myBalance ? myBalance : null)


  }

  const loginMetaMask = async () => {
    let myAddress = await web3Api.provider.request({ method: "eth_requestAccounts" })
    setAddress(myAddress ? myAddress : null)

  }

  const addFunds = async () => {
    const { contract, web3 } = web3Api
    await contract.addFunds({
      from: address,
      value: web3.utils.toWei('1', 'ether')
    })
  }



  useEffect(() => {
    loadProvider()
  }, [])

  useEffect(() => {
    getAccount()

  }, [web3Api])


  console.log('address : ', address)
  return (
    <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      <div>
        <div style={{ fontSize: 30 }}>Current Banlance Donate : <span style={{ fontWeight: 600 }}>{balance} ONUS</span></div>
        <div style={{ margin: '20px 0' }}>
          <button onClick={addFunds} type="button" class="btn btn-success">Donate</button>
          <button style={{ margin: '0 10px' }} type="button" class="btn btn-danger">Withdraw</button>
          {address?.length > 0 ? <button type="button" class="btn btn-primary">Login Success !</button> :
            <button onClick={() => loginMetaMask()} type="button" class="btn btn-primary">Connect Wallet</button>}
        </div>
        <div style={{ fontWeight: 600 }}>Your Wallet :      <span>{address?.length > 0 ? address[0] : "let's connect metamask"}</span> </div>
      </div>



    </div>
  )
}

export default App
