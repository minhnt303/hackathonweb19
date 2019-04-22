import React from 'react';
import '../App.css'
// import { Row, Col } from 'reactstrap';
// import { Input, Button, Form } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2'
class UserProfile extends React.Component {
    render() {
        return (
            <div className='Login' style={{ backgroundColor: '#fafafa', height: '635px' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
            </div>
        )}
}

    export default withRouter(UserProfile);