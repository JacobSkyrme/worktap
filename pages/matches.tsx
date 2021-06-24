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
  try {
    const cookies = nookies.get(ctx);

    console.log(JSON.stringify(cookies, null, 2));
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: { user: user }
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
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
    jobs.collection('matches').where('user_id', '==', user.uid).get()
      .then(documents => {

        let dataHold = new Array();
        documents.forEach((doc) => {
          const job = doc.data()
          job.job_ref.get().then(snap => {
            dataHold.push({ ...snap.data(), id: doc.id })
          })
        });
        setMatches(dataHold)
        setLoading(true)

      }).catch(err => {
        /* error! */
        console.log("error")
        console.log(err)
      });
    // or
  }, [user]);

  useEffect(() => {
    setTimeout(function () {
      setLoadingMin(true)
    }, 500);
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
      <Header user={props.user}></Header>
      <div className="wt-container">
        <Sidebar></Sidebar>
        <main className="wt-content">
          {loading && loadingMin ? 
          <div className="match-wrapper">
            {matches.length === 0 ? <div className="match-row"><h2 className="no-matches">No Matches Found!</h2></div> :
            <>
            {matches.map((match, index) =>
              <div className="match-row" key={match.id}>
                <div className="match-img-container">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img className="match-icon" src={match.company_logo} alt="Company Logo"/>
                </div>
                <div className="job-details" style={{width: "auto", flexGrow: 1}}>
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