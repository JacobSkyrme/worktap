import React, { useState, useMemo, useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { faPoundSign, faUser, faMapPin, faTimes, faCheck, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseClient } from "../firebase/firebaseClient"
import 'firebase/firestore';

import { useAuth } from "../firebase/auth";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, Slider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';


const alreadyRemoved = []
let jobState = null;

function Deck(props) {

  const [jobState, setJobState] = useState(props.data)

  const childRefs = useMemo<any>(() => Array(props.data.length).fill(0).map(i => React.createRef()), [props])
  const [jobs, setJobs] = useState(props.data)
  const { user } = useAuth();
  const [filter, setFilter] = useState(false);
  const [paySlider, setPaySlider] = React.useState([0, 30]);
  const [distanceSlider, setDistanceSlider] = React.useState([0, 500]);

  const swiped = (direction, id) => {

    console.log('removing: ' + id)
    if (direction === 'right') {
      let db = firebaseClient.firestore();
      let jobRef = db.collection("jobs").doc(id)
      db.collection('matches').doc(`${user.uid}.${id}`).set({ user_id: user.uid, job_ref: jobRef, job_id: id })
        .then(() => {
          console.log("Success")
          //Refreshes the area data.
        }).catch(err => {
          console.log(err)
        })

    }
    alreadyRemoved.push(id)

  }
  const outOfFrame = (id) => {
    setJobState(jobState.filter(job => job.id !== id))
    setJobs(jobState);
  }

  const swipe = (dir) => {
    const cardsLeft = jobs.filter(person => !alreadyRemoved.includes(person.id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id // Find the card object to be removed
      const index = props.data.map(job => job.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  const handlePaySlider = (event, newValue) => {
    setPaySlider(newValue);
  };

  const handleDistanceSlider = (event, newValue) => {
    setDistanceSlider(newValue);
  };



  const [state, setState] = React.useState({
    fullTime: false,
    partTime: false,
    apprenticeship: false,
    workExperience: false,
    virtual: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { fullTime, partTime, apprenticeship, workExperience, virtual } = state;

  return (
    <>
      {filter ?
        <div className="filter-modal-wrapper">
          <div className="filter-modal centre-translate">
            <Typography id="range-slider" gutterBottom>
              Pay Range (Per Hour)
            </Typography>
            <Slider
              value={paySlider}
              onChange={handlePaySlider}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              marks={[{ value: 5, label: "£5.00" }, { value: 30, label: "£30.00" }]}
              min={5}
              max={50}
              step={0.5}
            />
            <Typography id="range-slider" gutterBottom>
              Distance Range (Miles)
            </Typography>
            <Slider
              value={distanceSlider}
              onChange={handleDistanceSlider}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              marks={[{ value: 5, label: "0 Miles" }, { value: 500, label: "500 Miles" }]}
              min={0}
              max={500}
              step={25}
            />

            <div className="job-filter-type">
              <h2 className="MuiTypography-body1">Job Type (Multiple Choice)</h2>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={fullTime} onChange={handleChange} name="fullTime" />}
                  label="Full Time"
                />
                <FormControlLabel
                  control={<Checkbox checked={partTime} onChange={handleChange} name="partTime" />}
                  label="Part Time"
                />
                <FormControlLabel
                  control={<Checkbox checked={apprenticeship} onChange={handleChange} name="apprenticeship" />}
                  label="Apprenticeship"
                />
                <FormControlLabel
                  control={<Checkbox checked={workExperience} onChange={handleChange} name="workExperience" />}
                  label="Work Experience"
                />
                <FormControlLabel
                  control={<Checkbox checked={virtual} onChange={handleChange} name="virtual" />}
                  label="Virtual"
                />
              </FormGroup>
            </FormControl>
            </div>


          </div>
        </div> : null}
      <div className='deck'>
        <div className="header-content">
          <div className="button" onClick={() => setFilter(!filter)}>
            <FontAwesomeIcon className="fa-lg button-icon fa-filter" icon={faFilter} />
            <span>Filters</span>
          </div>
        </div>

        <div className="card-collection">
          {jobs.map((job, index) =>
            <div key={job.id} className='card'>
              <TinderCard ref={childRefs[index]} onSwipe={(dir) => swiped(dir, job.id)} onCardLeftScreen={() => outOfFrame(job.id)}>
                <div className="job-img-wrapper">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img className="card-image" src={job.job_image} alt={job.title} />
                </div>
                <div className="job-details-wrapper">
                  <div className="job-details">
                    <h2 className="job-title">{job.title}</h2>

                    <ul className="job-detail-list">
                      <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faPoundSign} /><span className="job-info">{job.pay}</span></li>
                      <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faMapPin} /><span className="job-info">{job.location}</span></li>
                      <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faUser} /><span className="job-info">{job.type}</span></li>
                    </ul>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img className="job-company-logo" src={job.company_logo} alt={job.company} />

                  </div>
                </div>
              </TinderCard>
            </div>
          )}
          <h3 className="no-jobs centre-translate">No Jobs Remaining</h3>
        </div>
        <div className='job-interest'>
          <button onClick={() => swipe('left')} className="button-interest red">
            <FontAwesomeIcon className="fa-lg centre-translate" icon={faTimes} />
          </button>
          <button onClick={() => swipe('right')} className="button-interest green">
            <FontAwesomeIcon className="fa-lg centre-translate" icon={faCheck} />
          </button>
        </div>
      </div>
    </>

  )
}

export default Deck