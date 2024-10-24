import React,{useState , useEffect} from 'react'
import "./style/home.css"
import { Link,useNavigate } from 'react-router-dom'
import one from "./style/img/one.jpg"
import two from "./style/img/three.jpg"
import three from "./style/img/two.jpg"
 

function Home() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user's authentication status on component mount
    const usersDataToken = localStorage.getItem("usersdatatoken");
    if (usersDataToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data and update login state
    localStorage.removeItem("usersdatatoken");
 
    setIsLoggedIn(false);
    navigate("/form");
  };
  return (
<div>

<div className="first-backGround">

<div className="first-flexl">

<div className="spans">
<span class="material-symbols-outlined">
dataset
</span>
</div>

<div className="head-one">
  <h1>Nft-market-place</h1>
</div>

<div className="nav">

<Link to="/">home</Link>
            <br />
            <Link to="/form">form</Link>
            <br />
            <Link to="/mint">mint</Link>
            {isLoggedIn ? (
              <>
              <Link to="/buy">buy</Link>
                <br />
                <Link to="/mint">mint</Link>
                <br />
                <Link to="/dash">dash</Link>
                <br />
                <Link to="/forget">forget</Link>
                <button onClick={handleLogout}>logout</button>
              </>
            ) : (
              
              <Link to="/login">login</Link>
            )}

{/* <Link to="/">home</Link>
<br />
<Link to="/mint">mint</Link>
<br />
<Link to="/nft">nfts</Link>
<br />
<Link to="/buy">buy</Link>
<br />
<Link to="/form">form</Link>
<br />
<Link to="/login">login</Link> */}
</div>
</div>
{/* ///second row clasds line start */}

<div className="second">

<div className="head-two">
  <h1>collect the awesome </h1>
  <h2>Extraordinary NFTS</h2>
  <h3>and nft mint and buy or sell</h3>
  <br />
  <button>get mint</button>
  </div>

</div>

{/* // thid row class line start */}


<div className="third-row">
<div className="flex-third">


<div className="image1">
<img src={two} alt="" />
</div>
<div className="image2">
<img src={one} alt="" />
</div>

<div className="image3">
<img src={three} alt="" />
</div>
</div>

</div>


</div>


</div>
  )
}

export default Home

{/* <span class="material-symbols-outlined">
dataset
</span> */}