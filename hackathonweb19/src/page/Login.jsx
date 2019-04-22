import React from 'react';
import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
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
        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                let valid = true;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i].email, this.state.email)
                    if (this.state.email === '' || this.state.password === '') {
                        console.log('Please input all feid');
                        valid = false;
                        break;
                    }
                }

                if (valid === false) {
                    console.log('Register false')
                } else {
                    console.log('Register success')
                    localStorage.setItem('user', this.state.email)
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='Login'>
                <div className="navbar">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <div className="main">
                    <div className="login-form">
                        <h1 className="logo-name">Weima</h1>
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
                            <Button className="loginButton" style={{ backgroundColor: 'hsl(209, 86%, 58%)', border: 'hsl(209, 86%, 58%)', fontWeight: 'bold' }}>Đăng nhập</Button>
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
                            <li><span style={{ color: "hsl(0, 0%, 60%)" }}>@ 2019 WEIMA</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Login);