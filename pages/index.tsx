import React from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import Header from "../components/header"
import 'firebase/firestore';
import Sidebar from '../components/sidebar';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

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






const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  
  return(
      <div className="page-gradient root">
        <Header user={props.user}></Header>
        <div className="wt-container"> 
          <Sidebar></Sidebar>
          <main className="wt-content">
            <div className="medium-container centre-translate">
              <h1 className="text-white">Welcome To Worktap</h1>
            </div>
          </main>
        </div>
      </div>
);
}

export default Home;