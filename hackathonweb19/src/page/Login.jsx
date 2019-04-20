import React from 'react';
import '../App.css'
import { Container, Row, Col } from 'reactstrap';
// import { Button, Container, Form, Input, Alert } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import logo from '../logo.png'
class Login extends React.Component {

    render() {
        return (
            <div className='Login'>
                <div className="navbar">
                    <div className="navbar-area">
                        <Container>
                            <Row>
                                <Col>
                                    <img src={logo} alt="weima-logo" className='classLogo' />

                                </Col>
                                <Col>
                                    <div className="user">adsh</div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>

            </div>
        )
    }

}

export default withRouter(Login);