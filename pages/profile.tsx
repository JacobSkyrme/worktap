import React, {useState, useEffect, useContext, createContext} from 'react';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import nookies from 'nookies';
import 'firebase/firestore';
import Header from "../components/header"
import Sidebar from "../components/sidebar"
import Education from "../components/profile/education"
import Employment from "../components/profile/employment"
import ProfileRight from "../components/profile/ProfileSidebar"
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

//TODO Implement all 3 profile input sections.                  1
//TODO Setup account setup wizard.                              2
//TODO Edit user account details.                               3
//TODO User image upload.                                       4
//TODO Edit account profile picture (Select from user uploads.) 5




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

export const EditContext = React.createContext(false)



const UserProfile = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [editMode, setEditMode] = useState(false);

  


  return(

    <EditContext.Provider value={editMode}>
      <div className="root">

        <div className="wt-container"> 
          <Header user={props.user}></Header>
          <Sidebar></Sidebar>
          <main className="wt-content">
            <button style={{height: 50}} onClick={() => setEditMode(!editMode)}>Toggle edit</button>
            <div style={{width: "100%"}}>
              <div className="medium-container">
                <Education user={props.user}></Education>
                <Employment user={props.user}></Employment>
                {/*<Skills user={props.user}></Skills>*/}

              </div>
            </div>

            <ProfileRight static={false} user={props.user} margin={0} noDropdown={true}></ProfileRight>
          </main>
        </div>

      </div>
    </EditContext.Provider>
    )
}
export default UserProfile;