import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import React, {useState} from 'react';
import ProfileRight from "./profile/ProfileSidebar"
import {useRouter} from "next/router"



const Header = (props) => {


    const [showMenu, setShowMenu] = useState(-400); 

    function ToggleMenu(){
        if(showMenu === 0){
            setShowMenu(-400)
        }
        else{
            setShowMenu(0)
        }
    }

    const path = useRouter().pathname;

    return(
        <header className="wt-header">
            <div className="headerLogoContainer">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img className="headerLogo" src="/assets/worktap-orange.png" alt="Worktap Logo"/>
                <span className="headerLogoText wt-header-logo-text">Worktap</span>
            </div>

            <div className="userPanel"> 
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img src={props.user.picture} className="headerUserImage" alt="user-logo"/>
                <span className="userName">{props.user.name}</span>
                <FontAwesomeIcon className="menuIcon fa-lg" icon={faBars} onClick={ToggleMenu}/>

            </div>
            {   
                path === "profile" ? null : <ProfileRight user={props.user} margin={showMenu}></ProfileRight>
            }

        </header>
    );

}

export default Header