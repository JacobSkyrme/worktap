import React, { useState, useEffect } from 'react'
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { firebaseClient } from '../firebase/firebaseClient';
import Deck from '../components/deck'
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import { CircularProgress } from '@material-ui/core';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

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


  const [loading, setLoading] = useState(false);
  const [loadingMin, setLoadingMin] = useState(false);
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    let jobs = firebaseClient.firestore();
    jobs.collection('jobs').get()
      .then(documents => {

        let dataHold = [];
        documents.forEach((doc) => dataHold.push({ ...doc.data(), id: doc.id }));
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

      <Header user={props.user}></Header>
      <div className="wt-container">
        <Sidebar></Sidebar>
        <main className="wt-content">
          {loading && loadingMin ? <Deck data={jobs}></Deck> : <CircularProgress className="centre-translate" />}
        </main>
      </div>
    </div>
  )
}
export default Jobs;


