import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBriefcase, faSearch, faComment } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import Link from 'next/link'//


const Sidebar = (props) => {

    return(
        <aside className="aside-nav">
            <nav>
            <ul className="wt-menu">

                <> 
                    <Link href="/">
                    <li>
                        <FontAwesomeIcon className="fa-lg menu-icon" icon={faSearch}/>
                        <span className="sidebar-text">Jobs</span>
                    </li>
                    </Link>
                    <Link href="/matches">
                    <li>
                        <FontAwesomeIcon className="fa-lg menu-icon" icon={faBriefcase}/>
                        <span className="sidebar-text">Matches</span>
                    </li>
                    </Link>
                    <Link href="/chat">
                    <li>
                        <FontAwesomeIcon className="fa-lg menu-icon" icon={faComment}/>
                        <span className="sidebar-text">Chat</span>
                    </li>
                    </Link>
                    <Link href="/profile">
                    <li>
                        <FontAwesomeIcon className="fa-lg menu-icon" icon={faUser}/>
                        <span className="sidebar-text">Profile</span>
                    </li>
                    </Link>
                </>
            </ul>
            
            </nav>
        </aside>
    );

}

export default Sidebar