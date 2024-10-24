import React,{useState,useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import "./style/buy.css"
function Buy() {

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

///Buy Nft with Number


const [buy ,setBuy]=useState()

const BuyNft=async(e)=>{
  const { signer } = state;
  if (signer) {
    try {
      const contractss = new ethers.Contract(contractAddress, abi, signer);
      const tickets = await contractss.buyNFt(buy);
   console.log(tickets)
    } catch (error) {
      console.log(error);
    }
  }
}


//getbuy all tranaction

const [nftItems, setNftItems] = useState([]);

const BuyNfts=async(e)=>{
  const { signer } = state;
  if (signer) {
    try {
      const contractss = new ethers.Contract(contractAddress, abi, signer);
      const tickets = await contractss.getAllTransactions();
   console.log(tickets)
   setNftItems(tickets);
    } catch (error) {
      console.log(error);
    }
  }
}

useEffect(() => {
  BuyNfts();
}, [state.signer]);



//!SECTION all sell nft all

const SellNft=async(e)=>{
  const { signer } = state;
  if (signer) {
    try {
      const contractss = new ethers.Contract(contractAddress, abi, signer);
      const tickets = await contractss.sellNft();
   console.log(tickets)
    } catch (error) {
      console.log(error);
    }
  }
}






  return (
    <div>

      <div className="backgroundallone">


<div className="buyinforme">
<center>
  <input type="text" name="" id="" placeholder='enter a number' onChange={(e)=>setBuy(e.target.value)}/>
  <br />
  <button onClick={BuyNft}>buyNft</button>
  </center>
</div>

<br />
<br />
<div className="sellyourNft">
  <center>

 
<button onClick={SellNft}>sellNft</button>
</center>

</div>



<br />
<br />



<div className="flex-images">



{nftItems.map((item, index) => {
      return (
        <div key={index} className='allflexs' >
          <h1>{item.name}</h1>
          <img src={item.url} alt="" width="200px"  height="200px"/>
          <h1>{item.number.toString()}</h1>
          <h1>{item.addresss}</h1>
          <h1>{item.gender}</h1>
        </div>
      );
    })
  }

  </div>


       
</div>
    </div>
  )
}

export default Buy