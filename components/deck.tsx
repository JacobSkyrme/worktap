import React, { useState, useMemo, useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { faPoundSign, faUser, faMapPin, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { firebaseClient } from "../firebase/firebaseClient"
import 'firebase/firestore';
import { useAuth } from "../firebase/auth";


const alreadyRemoved = []
let jobState = null;

function Deck(props) {

  const [jobState, setJobState] = useState(props.data)

  const childRefs = useMemo<any>(() => Array(props.data.length).fill(0).map(i => React.createRef()), [props])
  const [jobs, setJobs] = useState(props.data)
  const { user } = useAuth();


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

  return (
    <>
      <div className='deck'>
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