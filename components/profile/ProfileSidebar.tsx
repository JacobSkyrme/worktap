import React, { useEffect, useState } from 'react';
import {firebaseClient} from '../../firebase/firebaseClient'
import CSS from 'csstype';
import {faGraduationCap, faBriefcase, faTools} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfileSidebar = (props) =>{


    const [educationHistory, setEducationHistory] = useState([]);
    const [employmentHistory, setEmploymentHistory] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        FetchEducationHistory()
        FetchEmploymentHistory()
        FetchSkills()
    }, []);


    function FetchEmploymentHistory(){
        let db = firebaseClient.firestore();
        db.collection('users').doc(props.user.uid).collection('employment').get()
        .then(documents => {
    
          let dataHold = new Array();
  
          documents.forEach((doc) => dataHold.push({ ...doc.data(), id: doc.id }));
          setEmploymentHistory(dataHold)
          console.log(dataHold)
          
        }).catch(err => { 
            /* error! */
            console.log("error") 
            console.log(err)
        });
    }


    function FetchEducationHistory(){
        let db = firebaseClient.firestore();
        db.collection('users').doc(props.user.uid).collection('education').get()
        .then(documents => {
    
          let dataHold = new Array();
  
          documents.forEach((doc) => {dataHold.push({id: doc.id, ...doc.data()}); console.log(doc.id)});
           setEducationHistory(dataHold)
           console.log(dataHold)

          
        }).catch(err => { 
            /* error! */
            console.log("error") 
            console.log(err)
        });
    }
    function FetchSkills(){
        let db = firebaseClient.firestore();
        db.collection('users').doc(props.user.uid).collection('skill').get()
        .then(documents => {
    
          let dataHold = new Array();
  
          documents.forEach((doc) => {dataHold.push({id: doc.id, ...doc.data()}); console.log(doc.id)});
          setSkills(dataHold)
           console.log(dataHold)

          
        }).catch(err => { 
            /* error! */
            console.log("error") 
            console.log(err)
        });
    }



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
            <button className="logout-button"
                    onClick={async () => {
                        await firebaseClient.auth().signOut(); 
                        window.location.href = '/';
                    }}>Logout
                </button>
                <h3 className="profile-sidebar-card-text name">{props.user.name}</h3>
                <h3 className="profile-sidebar-card-text titleJob">Job Title</h3>
                <h3 className="profile-sidebar-card-text titleLocation">Brick Layer | England</h3>
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img className="profileImage" src={props.user.picture} alt={props.user.name + " profile picture"}/>
            </div>
            <div className="profile-sidebar-middle" style={{flexGrow: 1, position: "relative"}}>
                
                <div className="profile-sidebar-information">

                <div className="profile-row">
                    <h3 className="profile-row-heading">Education</h3>
                    <ul>
                    {educationHistory.map((education, index) => 
                        <li className="profile-row-text" key ={index}>
                            <FontAwesomeIcon className="fa-2x profile-row-svg" icon={faGraduationCap}/>

                            <span className="profile-row-span">- {education.qualification} in {education.field} </span>
                        </li>

                        )}

                    </ul>
                </div>
                <div className="profile-row">
                    <h3 className="profile-row-heading">Employment</h3>
                    <ul>
                    {employmentHistory.map((employment, index) => 
                        <li className="profile-row-text" key ={index}>
                            <FontAwesomeIcon className="fa-2x profile-row-svg" icon={faBriefcase}/>
                            <span className="profile-row-span">-  {employment.job_title} at {employment.company}</span>
                        </li>
                        )}

                    </ul>
                </div>
                <div className="profile-row">
                    <h3 className="profile-row-heading">Skills</h3>
                    <ul>
                    {skills.map((skill, index) => 
                        <li className="profile-row-text" key ={index}>
                            <FontAwesomeIcon className="fa-2x profile-row-svg" icon={faTools}/>
                            <span className="profile-row-span">-  {skill.skill}</span>
                            </li>
                        )}
                    </ul>
                    
                </div>
                        </div>

            </div>

            <div className="miniGalleryContainer">
                {fillerImage.map((url, index) => 
                    /*eslint-disable-next-line @next/next/no-img-element*/
                    <img key={index} src={url} className="miniGalleryImg" alt={`Gallery Image ${index}`}/>
                )}
            </div>


        </div>
    )
}

export default ProfileSidebar;