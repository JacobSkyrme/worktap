import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useAuth } from "../../../firebase/auth";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { useForm, Controller  } from "react-hook-form";
import 'firebase/firestore';
import {firebaseClient} from "../../../firebase/firebaseClient"
import LocationSearchInput from "../../places-autocomplete"



const EditEducation = (props) => {
    const { register, handleSubmit, watch, control, formState: { errors, isValid }} = useForm({
        defaultValues: {
            qualification: props.EditData.qualification,
            field: props.EditData.field,
            institution: props.EditData.institution,
            location: props.EditData.location,
            complete: props.EditData.complete,
            start_date: props.EditData.start_date,
            end_date: props.EditData.end_date
        }
    });



    const toggle_end = watch("complete");
    const start_date = watch("start_date")
    const { user } = useAuth();   
    
        const onSubmit = async (data) => {
        if(user){
            let db = firebaseClient.firestore();
            db.collection('users').doc(user.uid).collection('education').doc(props.EditData.id).set(data)
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
                <h2 className="modal-heading">Edit Education</h2>
                <FontAwesomeIcon className="fa-lg fa-profile-option modal-close" icon={faTimes} onClick={props.close} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Qualification</label>
                    
                    <select className="modal-input" name="qualification" {...register("qualification", { required: true })} style={errors.qualification ? {backgroundColor: "#ff7675"} : null}>
                        <option value="" selected disabled hidden>Choose here</option>
  
                        {qualification_Options.map((qualification_item, index) => 
                            <option key={index} value={qualification_item}>{qualification_item}</option>                        
                        )}
  
                    </select >                   
                    <label className="modal-label">Qualification Field</label>
                    <input className="modal-input" name="field" {...register("field", { required: true })} style={errors.field ? {backgroundColor: "#ff7675"} : null}></input>
                    <label className="modal-label">School, College or University</label>
                    <input className="modal-input" name="institution" {...register("institution", { required: true })} style={errors.institution ? {backgroundColor: "#ff7675"} : null}></input>
                    <label className="modal-label">Location</label>
                    <input className="modal-input" name="location" {...register("location", { required: true })} style={errors.location ? {backgroundColor: "#ff7675"} : null}></input>


                    <label className="modal-label">Course Complete</label>
                    <input className="modal-input" name="complete" type="checkbox" {...register("complete")}></input>
                    <label className="modal-label">Start Date</label>
                    <input className="modal-input" name="start_date" type="month" {...register("start_date", { required: true })} style={errors.start_date ? {backgroundColor: "#ff7675"} : null}></input>
                    {toggle_end ? (
                        <>
                          <label className="modal-label">End Date</label>
                          <input 
                              className="modal-input" 
                              name="end_date" 
                              type="month" 
                              {...register("end_date",{
                                  required: true, 
                                  validate: {
                                      GreaterThanStart: value => {
                                          return value > start_date;
                                      }
                                  }
                              })} 
                            style={errors.end_date ? {backgroundColor: "#ff7675"} : null}
                          />    
                        </>
                    ) : null}
                    <button type="submit" className="modal-button">Edit Education</button>
  
                </form>
            </div>
        </div>
    </div>
        
    )
}

export default EditEducation;