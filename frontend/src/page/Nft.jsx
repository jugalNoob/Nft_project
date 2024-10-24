import React,{useState , useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import "./style/nft.css"
function Nft() {

  
  const [state , setState]=useState({
    provider:null,
    signer:null,
    address:null
})


const contractAddress="0x79f93513cf34c383e81644C5d2dEc3C3b130C63B";


//address
const [Addresss, setAddresss]=useState();

useEffect(()=>{
const Checker=async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const account=await provider.send("eth_requestAccounts", []);
  const signer=provider.getSigner()
  const address = await signer.getAddress()
  // console.log("this is account " + account)
  // console.log("this is signer " + signer.toString())
  // console.log(address)
  setAddresss(address)
  setState({provider , signer , address})   


}

Checker()
},[])




const [get, setGet] = useState();
const [nftItems, setNftItems] = useState([]); // Set initial state to an empty array

const GetAllNft = async () => {
  const { signer } = state;
  if (signer) {
    try {
      const contractss = new ethers.Contract(contractAddress, abi, signer);
      const tickets = await contractss.getMinfAll();
      setNftItems(tickets);
    } catch (error) {
      console.log(error);
    }
  }
};

useEffect(() => {
  GetAllNft();
}, [state.signer]);




  return (
 
<div>

<div className="allbackground"> 

<div className="flex-image">


{nftItems.map((item, index) => {
      return (
        <div key={index} className='allflex'>
          <h1>{item.name}</h1>
          <img src={item.url} alt="" width="200px"  height="200px"/>
          <h1>{item.number.toString()}</h1>
          <h1>{item.addresss}</h1>
          <h1>{item.gender}</h1>
        </div>
      );
    })}

</div>
</div>

   </div>
  )
}

export default Nft