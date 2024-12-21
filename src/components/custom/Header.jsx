import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useUser } from "@/context/UserContext";
// import { UserButton, useUser } from "@clerk/clerk-react"



const Header = () => {
    const { user } = useUser();
    // const {isSignedIn} = true;
  return (
    <div className="p-3 px-5 flex justify-between shadow-sm">
        <Link to='/'>
          <div className="flex justify-center align-middle items-center gap-3">
          <img src="/logo.svg"/>
          <h1 id="headingTitle">Clever<span id="cv">CV</span></h1>
          </div>
        </Link>
        {user?
            <div className="flex gap-4 items-center">
                <Link to={'/dashboard'}><Button variant={'outline'}>Dashboard</Button></Link>
                
            </div>
            : 
        <Link to={'/dashboard'}><Button>Get Started</Button></Link>

        }
        
    </div>
  )
}

export default Header