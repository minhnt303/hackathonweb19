import React from 'react';
import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Container, Input, Button, Form } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar'
class Login extends React.Component {
    state = {
        email: '',
        password: '',
    };

    handleInputChangeEmail = (value) => {
        this.setState({
            email: value
        })
        console.log(this.state)
    }

    handleInputChangePassword = (value) => {
        this.setState({
            password: value
        })
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);

    }

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
                            <Form onSubmit={this.handleSubmit}>
                                <Input
                                    type='text'
                                    placeholder='Tên người dùng hoặc email'
                                    onChange={(e) => { this.handleInputChangeEmail(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Mật khẩu'
                                    onChange={(e) => { this.handleInputChangePassword(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Button className="loginButton">Đăng nhập</Button>
                            </Form>
                        </div>
                        <div className="register-of-login">
                            <span className="donthaveid">Bạn không có tài khoản? <a className="registerlink" href="http://localhost:3000/register">Đăng ký</a></span>
                        </div>
                        <div className="footer">
                            <ul>
                                <li><a href="http://localhost:3000/login" className="link1">Giới thiệu về chúng tôi</a></li>
                                <li><a href="http://localhost:3000/login">Hỗ trợ</a></li>
                                <li><a href="http://localhost:3000/login">Quền riêng tư</a></li>
                                <li><a href="http://localhost:3000/login">Điều khoản</a></li>
                                <li><a href="http://localhost:3000/login">Trang cá nhân</a></li>
                                <li><a href="http://localhost:3000/login">Hashtag</a></li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

}

export default withRouter(Login);