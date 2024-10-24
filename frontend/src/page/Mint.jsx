import React,{useState , useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import { Link, useNavigate } from 'react-router-dom';
import "./style/mint.css"
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
function Mint() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("usersdatatoken")) {
      navigate("/form");
    }
  }, []);
  
  const [state , setState]=useState({
    provider:null,
    signer:null,
    address:null
})

//address
const [Addresss, setAddresss]=useState();

const contractAddress="0xa736Cfe9A617C8cfbe40370b663fc7B36aD064cD";


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


///Mint yout Nft Start row class ////////////

const client = new Web3Storage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFNjRjODIwMGM4MzdlZWVlMDE0NWIwNWM1MTFiZUFCYjFjMThlODUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY1NDQ2MDQyNzEsIm5hbWUiOiJJbWFnZVVwIn0.FSNy4TIrk24P_bG8vAnB2PTI3rMb8paCPVwiwv_mrvE',
})



const [file, setFile]=useState("")

// const [price, setPrice] = useState(ethers.utils.parseUnits('150', 'wei'));


const [name , setName]=useState("")

const [gender , setGender]=useState()



const UploadNft=async(e)=>{
  const {signer}=state;
  // console.log('Price in wei:', price.toString()); 
  const fileInput = document.querySelector('#files')
  e.preventDefault()
     const rootCid = await client.put(fileInput.files)
 
     console.log(rootCid)
     const res = await client.get(rootCid)
     console.log(res)
     const  files  = await res.files()
 
 
     for(let fil of files){
 
    let uploadUrl=`https://${fil.cid}.ipfs.w3s.link/?filename=${fil.name}`
 
    console.log(uploadUrl)
  const contractss=new ethers.Contract(contractAddress, abi , signer)

  const imageUpload=await contractss.MintNftAll(  name , uploadUrl , gender );

  console.log(imageUpload)
}

}



  return (
    <div>

<div className="background-mint">

<div className="mint">

 
</div>

<div className="mints">
<h1>mint your nft</h1>
  <center>
{/* 
    <input type="number"  name="" id="" onChange={(e)=>setPrice(e.target.value)}   placeholder='price' />
    <br /> */}
    <input type="text" name="" id=""  onChange={(e)=>setName(e.target.value)} placeholder='name'/>
    <br />
    <input type="file" name="" id="files"  onChange={(e)=>setFile(e.target.files[0])}/>
    <br />
    <input type="text" name="" id=""  onChange={(e)=>setGender(e.target.value)} placeholder='gender'/>
    <br />
    <button onClick={UploadNft}>Mint-nft</button>
  </center>
</div>

</div>


    </div>
  )
}



export default Mint