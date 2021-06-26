import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import {firebaseClient} from '../firebase/firebaseClient'
import Header from "../components/header"
import 'firebase/firestore';
import Sidebar from '../components/sidebar';
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


const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  let data = {
    company: "Daniel Owen Ltd",
    company_logo: "https://firebasestorage.googleapis.com/v0/b/worktap-7e14f.appspot.com/o/company-logos%2Fdaniel-owen.png?alt=media",
    job_image: "https://firebasestorage.googleapis.com/v0/b/worktap-7e14f.appspot.com/o/card-backgrounds%2FLabourers-1-a.jpg?alt=media",
    location: "Portsmouth",
    pay: "£11.35 Per Hour",
    sector: "Construction",
    title: "Labourer",
    type: "Contract"
  }

  function createJob(){
    let db = firebaseClient.firestore();
    db.collection('jobs').doc().set(data)
    .then(() => {
      console.log("Success")
      //Refreshes the area data.
    }).catch(err => {
      console.log(err)
    })


  }
  
  return(
      <div className="page-gradient root">
        <div className="wt-container"> 
          <Header user={props.user}></Header>
          <Sidebar></Sidebar>
          <main className="wt-content">
            <div className="medium-container centre-translate">
              <h1 className="text-white">Welcome To Worktap</h1>
              <a onClick={createJob}>CLICK ME</a>
            </div>
          </main>
        </div>
      </div>
);
}

export default Home;