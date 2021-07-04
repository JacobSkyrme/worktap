import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useAuth } from "../../../firebase/auth";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { useForm, Controller  } from "react-hook-form";
import 'firebase/firestore';
import {firebaseClient} from "../../../firebase/firebaseClient"
import LocationSearchInput from "../../places-autocomplete"

const AddEmployment = (props) => {

    const { register, handleSubmit, watch, control, formState: { errors,isValid } } = useForm();
    const toggle_end = watch("currently_employed");
    const start_date = watch("start_date")
    const { user } = useAuth();

    const onSubmit = async (data) => {
        if(user){
            let db = firebaseClient.firestore();
            db.collection('users').doc(user.uid).collection('employment').doc().set(data)
            .then(() => {
                console.log("Success")
                //Refreshes the area data.
                props.RefreshData();
                props.close();
            }).catch(err => {
                console.log(err)
            })
        }
        else console.log("User Invalid")
    }
 
    return (

      <div className="modal-blackout">
      <div className="modal-container centre-translate">
          <div className="modal"> 
              <h2 className="modal-heading">Add Employment</h2>
              <FontAwesomeIcon className="fa-lg fa-profile-option modal-close" icon={faTimes} onClick={props.close} />
              <form onSubmit={handleSubmit(onSubmit)}>
               
                  <label className="modal-label">Company</label>
                  <input className="modal-input" name="company" {...register("company",{required: true })} style={errors.field ? {backgroundColor: "#ff7675"} : null}></input>
                  <label className="modal-label">Job Title</label>
                  <input className="modal-input" name="job_title" {...register("job_title",{ required: true })} style={errors.institution ? {backgroundColor: "#ff7675"} : null}></input>
                  <label className="modal-label">Location</label>
                  <input className="modal-input" name="location" {...register("location", { required: true })} style={errors.location ? {backgroundColor: "#ff7675"} : null}></input>


                  <label className="modal-label">Currently Employed</label>
                  <input className="modal-input" name="currently_employed" type="checkbox" {...register("currently_employed")}></input>
                  <label className="modal-label">Start Date</label>
                  <input className="modal-input" name="start_date" type="month" {...register("start_date", { required: true })} style={errors.start_date ? {backgroundColor: "#ff7675"} : null}></input>
                  {!(toggle_end) ? (
                      <>
                        <label className="modal-label">End Date</label>
                        <input 
                            className="modal-input" 
                            name="end_date" 
                            type="month" 
                            {...register("end_date", {
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
                  <button type="submit" className="modal-button">Add Employment</button>

              </form>
          </div>
      </div>
  </div>
        
    )
}

export default AddEmployment;
