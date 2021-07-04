import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useAuth } from "../../../firebase/auth";
import {firebaseClient} from "../../../firebase/firebaseClient"
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { useForm, Controller  } from "react-hook-form";
import 'firebase/firestore';
import LocationSearchInput from "../../places-autocomplete"



const EditEducation = (props) => {
    const { register, handleSubmit, watch, control, formState: { errors, isValid } } = useForm({
        defaultValues: {
            skill: props.EditData.skill,        }
    });
    const { user } = useAuth();   
    
        const onSubmit = async (data) => {
        if(user){
            let db = firebaseClient.firestore();
            db.collection('users').doc(user.uid).collection('skill').doc(props.EditData.id).set(data)
            .then(() => {
                console.log("Success")
                //Refreshes the area data.
                props.RefreshData();
                props.close();
            }).catch(err => {
                console.log(err)
            })
        } else console.log("User Invalid")
    }
    const qualification_Options = [ 
        "GCSE or Equivalent",
        "A-Level or Equivalent",
        "Certificate of Higher Education",
        "Diploma of Higher Educatuion",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
    ]


 
    return (

        <div className="modal-blackout">
        <div className="modal-container centre-translate">
            <div className="modal"> 
                <h2 className="modal-heading">Edit Skill</h2>
                <FontAwesomeIcon className="fa-lg fa-profile-option modal-close" icon={faTimes} onClick={props.close} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Qualification</label>
                    <label className="modal-label">Skill Name</label>
                    <input className="modal-input" name="skill" {...register("skill", { required: true })} style={errors.field ? {backgroundColor: "#ff7675"} : null}></input>

                    <button type="submit" className="modal-button">Edit Skill</button>
  
                </form>
            </div>
        </div>
    </div>
        
    )
}

export default EditEducation;