import React from 'react';
import {firebaseClient} from '../../firebase/firebaseClient'
import CSS from 'csstype';

const ProfileSidebar = (props) =>{
    

    const profileSidebarContainer:CSS.Properties = {
        position: props.noDropdown ? "relative" : "absolute",
        marginTop: (props.noDropdown ? "0" : "75"),
        marginRight: props.margin,
        display: (props.static ? "flex" : "none")
    }
      
      const fillerImage = [
          "../assets/images/profile-filler/pexels-alex-powell-1769356.jpg",
          "../assets/images/profile-filler/pexels-burst-374016.jpg",
          "../assets/images/profile-filler/pexels-photo-1181676.jpeg",
      ]


      const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 300
      }

      return(
        <div className="profileSidebarContainer" style={profileSidebarContainer}>
            
            <div className="profileImagecontainer page-gradient">
                <h3 className="profile-sidebar-card-text name">{props.user.name}</h3>
                <h3 className="profile-sidebar-card-text titleJob">Software Developer</h3>
                <h3 className="profile-sidebar-card-text titleLocation">Weston-Super-Mare | England</h3>
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img className="profileImage" src={props.user.picture} alt={props.user.name + " profile picture"}/>
            </div>
            <div style={{flexGrow: 1, position: "relative"}}>
                <button 
                    onClick={async () => {
                        await firebaseClient.auth().signOut(); 
                        window.location.href = '/';
                    }}>Logout
                </button>

                <div className="profile-toggle-container">
                    <label className="switch">
                      <span className="slider round"></span>
                        {/*
                      <CSSTransitionGroup {...transitionOptions}>
                      </CSSTransitionGroup>*/}
                    
                    </label>
                </div>
            </div>

            <div className="miniGalleryContainer">
                {fillerImage.map((url, index) => 
                    /*eslint-disable-next-line @next/next/no-img-element*/
                    <img key={index} src={url} className="miniGalleryImg" alt={`Gallery Image ${index}`}/>
                )}n
            </div>


        </div>
    )
}

export default ProfileSidebar;