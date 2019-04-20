import React from 'react';
import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Container, Input, Button } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar'
class Login extends React.Component {

    render() {
        return (
            <div className='Login'>
                <Container>
                    <div className="navbar">
                        <div className="navbar-area">
                            <NavBar />
                        </div>
                    </div>
                    <div className="main">
                        <div className="login-form">
                            <h1 className="logo-name">Webma</h1>
                            <Input
                                type='text'
                                placeholder='Tên người dùng hoặc email' />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Mật khẩu' />
                            <div style={{ height: 18 }}></div>
                            <Button className="loginButton">Đăng nhập</Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

}

export default withRouter(Login);