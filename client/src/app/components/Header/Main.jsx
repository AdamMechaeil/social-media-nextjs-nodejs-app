import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const Header = () => {
    const router=useRouter();
    const {dispatch}=useContext(AuthContext);
    function logOut(){
        try {
            dispatch({
                type:"SIGNOUT"
            })
            router.push("/Auth")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-brand">
                    Profile
                </button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page">Home</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={()=>{
                                router.push("/CreatePost")
                            }}>Create Post</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={()=>{
                                router.push("/FindYourTribe")
                            }}>Find your Tribe</button>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-end" style={{ width: "80%" }}>
                        <button className="btn btn-danger" onClick={()=>{
                            console.log("Hell");
                            logOut()
                        }}>Sign Out</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header