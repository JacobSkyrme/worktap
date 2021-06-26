import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import Header from "../components/header"
import { faPoundSign, faUser, faMapPin, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuth } from "../firebase/auth";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import 'firebase/firestore';
import { firebaseClient } from "../firebase/firebaseClient"
import { CircularProgress } from '@material-ui/core';


import Sidebar from '../components/sidebar';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);


  try {
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    return {
      props: { user },
    };
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};






const Matches = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const { user } = useAuth();

  const [matches, setMatches] = useState([]);
  const [loadingMin, setLoadingMin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    let jobs = firebaseClient.firestore();
    jobs.collection('matches').where('user_id', '==', user ? user.uid : "").get()
      .then(documents => {
        let dataHold = new Array();
        let i = 0;
        documents.forEach((doc) => {
          const job = doc.data()
          job.job_ref.get().then(snap => {
            dataHold.push({ ...snap.data(), id: doc.id })
          })
            if(i === documents.size -1){
              setLoading(true)
            }
          i++;
        });
        setMatches(dataHold)
      }).catch(err => {
        console.log("error")
        console.log(err)
      });
    // or
  }, [user]);

  useEffect(() => {
    setTimeout(function () {
      setLoadingMin(true)
    }, 1000);
  })
  const removeMatch = (id) =>{
    let db = firebaseClient.firestore();
        db.collection('matches').doc(id).delete()
        .then(res => {
            console.log(res)
            setMatches(matches.filter(match => match.id != id))
            console.log("success")
        }).catch(err => {
            console.log("error")
            console.log(err)
        })
  }

  return (
    <div className="root">
      <div className="wt-container">
        <Header user={props.user}></Header>
        <Sidebar></Sidebar>
        <main className="wt-content matches-container">
          {loading === true && loadingMin === true ? 
          <div className="match-wrapper">
            {matches.length === 0 ? <div className="match-row"><h2 className="no-matches">No Matches Found!</h2></div> :
            <>
            {matches.map((match) =>
              <div className="match-row" key={match.id}>
                <div className="match-img-container">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img className="match-icon" src={match.company_logo} alt="Company Logo"/>
                </div>
                <div className="job-details">
                  <h2 className="job-title">{match.title}</h2>
                  <ul className="job-detail-list">
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faPoundSign} /><span className="job-info">{match.pay}</span></li>
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faMapPin} /><span className="job-info">{match.location}</span></li>
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faUser} /><span className="job-info">{match.type}</span></li>
                  </ul>
                </div>
                <button className="btn-unmatch" onClick={() => removeMatch(match.id)}><FontAwesomeIcon className="fa-lg" icon={faTimes} /></button>
              </div>
            )}</>}
          </div>
          : <CircularProgress className="centre-translate" />}
        </main>
      </div>
    </div>
  );
}

export default Matches;