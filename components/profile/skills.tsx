import React, {useState, useEffect, useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTools, faPen, faTrash, faPlusCircle} from "@fortawesome/free-solid-svg-icons"
import {firebaseClient} from "../../firebase/firebaseClient"
import 'firebase/firestore';
import AddEducation from "./inputs/add-education"
import EditEducation from "./inputs/edit-education"
import {EditContext} from "../../pages/profile"

//TODO Add error checking on start - end date
//TODO Style button
//TODO Add descriptions to each input
//TODO Add list of qualifications to qualifications list (UK ONLY ATM)
//TODO Use qualification + field for the qualification name.
//TODO Write confirmation/error messages in a global message element. This needs to be a component that can be used on every page.
//TODO Adapt the Education component/sub components for other sections: Skills, Work experience.
//TODO Fix autofill text colour/background colour.
//TODO Look at other date picker components.
//TODO Add edit toggle button for the entire section which shows/hides edit, delete and add button
//TODO Add fade effect on showing/hiding modal windows.



const Skills = (props) => {
    const edit = useContext(EditContext);

    const [data, setData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({
        complete: null,
        field: null,
        id: null,
        institution: null,
        location: null,
        qualification: null,
        start_date: null,
        end_date: null,
    })

    //FETCHES USER DATA FROM DATABASE
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function FetchData(){
        let db = firebaseClient.firestore();
        db.collection('users').doc(props.user.uid).collection('skills').get()
        .then(documents => {
    
          let dataHold = new Array();

            documents.forEach((doc) => dataHold.push({ ...doc.data(), id: doc.id }));
            
         
          setData(dataHold)
          
        }).catch(err => { 
            /* error! */
            console.log("error") 
            console.log(err)
        });
    }

    useEffect(() => {
        FetchData();
    }, [FetchData]);


    //TODO Add confirmation to the delete function.
    //DELETE ITEM
    function Delete(id){
        let db = firebaseClient.firestore();
        db.collection('users').doc(props.user.uid).collection('education').doc(id).delete()
        .then(res => {
            console.log(res)
            console.log("success")
            FetchData();
        }).catch(err => {
            console.log("error")
            console.log(err)
        })
    }

    //EACH ITEM IN LIST
    function ListItem(props) {
        return (
            <li className="profile-row">
                <h3 className="profile-row-heading">{props.value.qualification} in {props.value.field}</h3>
                <div className="container">
                    <div className="profile-column">
                        <h4 className="profile-row-text"> {props.value.institution} - {props.value.location}</h4>
                        <span className="profile-row-text"> {props.value.start_date} to {props.value.complete === false ? "Present" : props.value.end_date}</span>
                    </div>
                    {edit ?
                        <div className="profile-edit-options-container">
                            <FontAwesomeIcon className="fa-lg fa-profile-option"  icon={faPen} onClick={() => {setShowEdit(true); setCurrentEdit(props.value)}}/>
                            <FontAwesomeIcon className="fa-lg fa-profile-option" icon={faTrash} onClick={() => {Delete(props.value.id)}}/>
                        </div>
                    : null}
                </div>
            </li>
        )
    }



    return(
            <>
                <div className="wt-container profile-container">
                    <div className="profile-icon-container">
                        <div className="profile-section-icon" >
                            <FontAwesomeIcon className="fa-3x centre-translate profile-section-icon" icon={faTools}/>
                        </div>
                    </div>

                    <div style={{width: "100%", padding: "0 1em", fontSize: "0.9rem"}}>
                        <ul style={{width: "100%"}}>
                            {data.length > 0 ?
                            <>
                            {data.map((data, index) => 
                                <ListItem key={data.id} index={index} value={data} />
                            )}
                             </>
                            : <h3 className="profile-no-data">No data found</h3>}
                            {edit || data.length === 0 ?
                            <li className="profile-row-heading profile-row-noborder">
                                <FontAwesomeIcon className="fa-mg profile-add" icon={faPlusCircle} onClick={() => setShowAdd(true)} />                           
                            </li>
                            : null}

                        </ul>

                    </div>
                </div>

                {showAdd
                ? ( <AddEducation RefreshData={FetchData} close={() => {setShowAdd(false)}}></AddEducation>
                ) : null}

                {showEdit
                ? ( <EditEducation EditData={currentEdit} RefreshData={FetchData} close={() => {setShowEdit(false)}}></EditEducation>
                ) : null}


            </>
    )
 }


export default Skills;


