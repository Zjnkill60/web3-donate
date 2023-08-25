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

    const contract = new web3.eth.Contract(abiJSON.abi, "0x7af2b76997D1Fff2A52B96487B3d7E9EF05AB42d")
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
    let myBalance = await web3Api.web3?.eth.getBalance(web3Api?.contract?._address) / 1e18
    setAddress(myAddress ? myAddress : null)
    setBalance(myBalance ? myBalance : null)


  }

  const loginMetaMask = async () => {
    let myAddress = await web3Api.provider.request({ method: "eth_requestAccounts" })
    setAddress(myAddress ? myAddress : null)

  }

  const addFunds = async () => {
    const { contract, web3 } = web3Api
    await contract.methods.addFunds().send({
      from: address[0],
      value: web3.utils.toWei('0.01', 'ether')
    })
    getAccount()
  }

  const widthraw = async () => {
    const { contract, web3 } = web3Api
    await contract.methods.withdraw(web3.utils.toWei('0.01', 'ether')).send({
      from: address[0],
    })
    getAccount()
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
        <div style={{ fontSize: 30 }}>Current Banlance Donate : <span style={{ fontWeight: 600 }}>{balance ? balance : 0} ONUS</span></div>
        <div style={{ margin: '20px 0' }}>
          <button onClick={addFunds} type="button" class="btn btn-success">Donate</button>
          <button onClick={widthraw} style={{ margin: '0 10px' }} type="button" class="btn btn-danger">Withdraw</button>
          {address?.length > 0 ? <button type="button" class="btn btn-primary">Login Success !</button> :
            <button onClick={() => loginMetaMask()} type="button" class="btn btn-primary">Connect Wallet</button>}
        </div>
        <div style={{ fontWeight: 600 }}>Your Wallet :      <span>{address?.length > 0 ? address[0] : "let's connect metamask"}</span> </div>
      </div>



    </div>
  )
}

export default App
