import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import Header from "../components/header"
import {faCheck, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
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






const Chat = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const { user } = useAuth();


  return (
    <div className="root">
      <div className="wt-container">
        <Header user={props.user}></Header>
        <Sidebar></Sidebar>
        <main className="wt-content matches-container medium-container">
          <div className="messages">
            <div className="message-wrapper" style={{borderTop: '1px solid #ddd'}}> 
              <div className="ribbon check" style={{backgroundColor: '#2ecc71'}}>
                <div className="content">
                  <FontAwesomeIcon className="svg-inline--fa fa-check fa-w-16" icon={faCheck}/>                
                </div>
              </div>
              <div className="message-img-wrapper">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img className="message-img center" alt="Carnival Cruises Logo" src="https://firebasestorage.googleapis.com/v0/b/worktap-7e14f.appspot.com/o/company-logos%2Fcarnival-logo.png?alt=media" />
              </div>
              <div className="message-details">
                <h3 className="message-title matches-title job-title">Personal Cruise Advisor</h3>
                <p>{"Thanks for applying for 'personal cruise advisor' You'll hear back from our HR team regarding your interview!"}</p>
              </div>
            </div>
            <div className="message-wrapper">
              <div className="ribbon check" style={{backgroundColor: '#f1c40f'}}>
                <div className="content">
                  <FontAwesomeIcon className="svg-inline--fa fa-check fa-w-16" icon={faMinus}/>                
                </div>
              </div>
              <div className="message-img-wrapper">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img alt="checkatrade logo" className="message-img center" src="https://firebasestorage.googleapis.com/v0/b/worktap-7e14f.appspot.com/o/company-logos%2Fcheckatrade.png?alt=media" />
              </div>
              <div className="message-details">
                <h3 className="message-title matches-title job-title">Brick Layer</h3>
                <p>Your application is pending review!</p>
              </div>
            </div>
            <div className="message-wrapper">
              <div className="ribbon check" style={{backgroundColor: '#e74c3c'}}>
                <div className="content">
                  <FontAwesomeIcon className="svg-inline--fa fa-check fa-w-16" icon={faTimes}/>                
                </div>
              </div>
              <div className="message-img-wrapper">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img alt="ASDA Logo" className="message-img center" src="https://firebasestorage.googleapis.com/v0/b/worktap-7e14f.appspot.com/o/company-logos%2Fasda-logo.png?alt=media" />
              </div>
              <div className="message-details">
                <h3 className="message-title matches-title job-title">Store Assistant</h3>
                <p>Sorry, Your application has been declined.</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Chat;