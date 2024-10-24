import React, {  } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
import Login from './page/Login';
import Mint from './page/Mint';
import Nft from './page/Nft';
import Buy from "./page/Buy"
import Dash from './page/Dash';
import Forget from './page/Forget';

function App() {
 

  return (
    <div>
       
    <Routes>
  
<Route path="/" element={<Home />} />
<Route path="/Mint" element={<Mint/>} />
<Route path="/nft" element={<Nft />} />
<Route path="/buy" element={<Buy />} />
<Route path="/form" element={<Form />} />
<Route path="/login" element={<Login />} />
<Route path="/dash" element={<Dash />} />
<Route path="/forget" element={<Forget/>} />
{/* <Route path="/form" element={<Form />} />
<Route path="/login" element={<Login />} />
<Route path="/page" element={<Page />} />
<Route path="/update" element={<Update />} />
<Route path="/dash" element={<Dash />} />
<Route path="/logout" element={<Logout></Logout>}/> */}

</Routes>


    </div>
  )
}

export default App