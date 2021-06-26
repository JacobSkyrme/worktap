import React, { useState, useEffect } from 'react'
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import Deck from '../components/deck'
import { firebaseClient } from '../firebase/firebaseClient';
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import { CircularProgress } from '@material-ui/core';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import { useAuth } from '../firebase/auth';

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

const Jobs = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingMin, setLoadingMin] = useState(false);
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // Update the document title using the browser API


    let db = firebaseClient.firestore();
    let matches = []

    db.collection('matches')
    db.collection('matches').where('user_id', '==', user ? user.uid : "").get()
      .then(documents => {

        documents.forEach((doc) => matches.push(doc.data().job_id));
      }).catch(err => {
        /* error! */
        console.log("error")
        console.log(err)
      });
      console.log(matches)

    db.collection('jobs').get()
      .then(documents => {

        let dataHold = [];
        documents.forEach((doc) => dataHold.push({ ...doc.data(), id: doc.id }));

        
        dataHold = dataHold.filter(data => !matches.includes(data.id))
        console.log(dataHold)
        setJobs(dataHold)
        setLoading(true)
      }).catch(err => {
        /* error! */
        console.log("error")
        console.log(err)
      });
    // or
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setLoadingMin(true)
    }, 500);
  })

  return (
    <div className="page-gradient root">

      <div className="wt-container">
        <Header user={props.user}></Header>
        <Sidebar></Sidebar>
        <main className="wt-content">
          {loading && loadingMin ? <Deck data={jobs}></Deck> : <CircularProgress className="centre-translate" />}
        </main>
      </div>
    </div>
  )
}
export default Jobs;


