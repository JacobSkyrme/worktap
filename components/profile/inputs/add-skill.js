import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { useAuth } from "../../../firebase/auth";
import {faTimes} from "@fortawesome/free-solid-svg-icons"
import { useForm, Controller  } from "react-hook-form";
import 'firebase/firestore';
import {firebaseClient} from "../../../firebase/firebaseClient"
import LocationSearchInput from "../../places-autocomplete"

const AddSkill = (props) => {

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const { user } = useAuth();

    const onSubmit = async (data) => {

        if(user){
            let db = firebaseClient.firestore();
            db.collection('users').doc(user.uid).collection('skill').doc().set(data)
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
              <h2 className="modal-heading">Add Skill</h2>
              <FontAwesomeIcon className="fa-lg fa-profile-option modal-close" icon={faTimes} onClick={props.close} />
              <form onSubmit={handleSubmit(onSubmit)}>

                  <label className="modal-label">Skill Name</label>
                  <input className="modal-input" name="skill" {...register("skill", { required: true })} style={errors.field ? {backgroundColor: "#ff7675"} : null}></input>
                  <button type="submit" className="modal-button">Add Skill</button>

              </form>
          </div>
      </div>
  </div>
        
    )
}

export default AddSkill;
