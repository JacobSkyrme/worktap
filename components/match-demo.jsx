
import {faArrowLeft, faPoundSign, faUser, faMapPin} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MatchDemo = (props) =>{

    return(
        <div className="match-demo">

            <div className="match-demo-wrapper">
            <div className="arrow-close-window-wrapper" onClick={() => props.closeWindow(false)}>
                <FontAwesomeIcon className="arrow-close-window" icon={faArrowLeft}/>
            </div>
            <div className="match-demo-inner">
            <strong><span>Posted 7 days ago</span></strong>
            <div className="match-demo-image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img className="match-demo-image" alt="nation wide logo" src="../assets/images/nation-wide.png"/>
            </div>
            <h2 className="job-title match-demo-title">Member Representative</h2>
                  <ul className="job-detail-list match-demo-list">
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faMapPin} /><span className="job-info">Bridgewater</span></li>
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faPoundSign} /><span className="job-info">£18,700 - £23,158</span></li>
                    <li className="job-detail-list-item"><FontAwesomeIcon className="fa-lg card-icon" icon={faUser} /><span className="job-info">Permanent, Full Time</span></li>
                    <div className="match-demo-posted-info">
                        <li className="job-detail-list-item"><span className="job-info"><strong>Posted By:</strong> Nation Wide</span></li>
                        <li className="job-detail-list-item"><span className="job-info"><strong>Posted On:</strong> 28/06/21</span></li>
                    </div>

                  </ul>
                  <h3 className="job-title match-demo-jobdesc">Job Description</h3>
                  <p>{"At Nationwide, a Member Representatives role is having the ability to best support our members with our great services. From transactions on the till, online banking demonstrations, to having conversations about protection for their homes and lives – but don’t worry you will be trained up on this. It is an important role within the branch, and we are the gateway to protecting and looking after our members working closely as a team."}</p>
                  <p>{"We need a Member Representative for our branch in Bridgwater, Somerset You will be required to work throughout the cluster of Weston Super Mare, Taunton & Burnham on Sea. This role is Full Time, 35 hours per week, Monday to Saturday and a 12 Month Fixed Term Contract. Our Interview Date is likely to be 16/07/2021"}</p>
                  <p>{"If we receive a high volume of relevant applications, we may close the advert earlier than the advertised date, so please apply as soon as you can. Who we are looking for"}</p>
                  <p>{"What is important is to know every branch is different, and we are all in this together working to have the best version of our branches!"}</p>
                  <p>{"What can’t a Member Rep do! This is the great part about the Member Rep role, it’s so versatile. There is an opportunity to work on the counter completing transactions and educating members on our digital services and easier ways to bank with us."}</p>
                  <p>{"We build up our knowledge day in day out to ensure we can answer all our members queries. They are the most important part of our day."}</p>
                  <p>{"What you'll be doing"}</p>
                  <p>{"We’re not just looking for your experience and skills. We’re also interested in who you are as a person. Why? Because our members are made up of so many different kinds of people and we want our employees to be just as diverse"}</p>
                  <p>{"Are you someone who really does want to make a difference for our members? Working for a building society you will have the opportunity to change someone’s life for the better. You’ll take care of our members/customers from guiding them through online banking to discussing our range of services whilst adapting our style to suit all our member’s needs."}</p>
                  <p>{"We are the front line in protecting our members, building our society."}</p>
                  <p>{"Why work for us?"}</p>
                  <p>{"We’re a building society founded by ordinary people, our members, who came together to help each other get the most from their money, buy homes and save for their futures. For over 130 years, we’ve supported each other and our communities, and we’ve done the right thing for wider society too."}</p>
                  <p>{"If you come to work here at Nationwide, you’ll be part of that. Part of something a bit different. And something really quite special."}</p>
                  <p>{"What’s more, we have a strong ethic of care for each other and our members. We recognise that our employees feel most appreciated when their thoughts and values are respected and considered. We’re committed to creating a culture that recognises and truly values our individual differences and identities. So if you’d like to be a part of an inclusive workplace where you can be yourself, where your talents are nurtured, and you feel empowered to contribute, then please apply and help us in building society, nationwide"}</p>

            </div>
            <div className="demo-apply-button"><h3 className="apply-button">Apply Now</h3></div>
            </div>
        </div>
    )
}

export default MatchDemo;