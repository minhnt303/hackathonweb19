import React from 'react';
import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Container, Input, Button, Form } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar'
class Register extends React.Component {
    state = {
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        password: '',
    };

    handleInputChangeEmail = (value) => {
        this.setState({
            email: value
        })
        console.log(this.state)
    }

    handleInputChangeUsername = (value) => {
        this.setState({
            username: value
        })
        console.log(this.state)
    }

    handleInputChangeFacebookId = (value) => {
        this.setState({
            facebookid: value
        })
        console.log(this.state)
    }

    handleInputChangeZaloId = (value) => {
        this.setState({
            zaloid: value
        })
        console.log(this.state)
    }

    handleInputChangePhone = (value) => {
        this.setState({
            phone: value
        })
        console.log(this.state)
    }

    handleInputChangeAddress = (value) => {
        this.setState({
            address: value
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
                    <div className="main-register">
                        <div className="register-form">
                            <h1 className="logo-name">Weiba</h1>
                            <h3 className="register-text">Đăng ký để xem sản phẩm.</h3>
                            <Form onSubmit={this.handleSubmit}>
                                <Input
                                    type='text'
                                    placeholder='Email'
                                    onChange={(e) => { this.handleInputChangeEmail(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Tên đầy đủ'
                                    onChange={(e) => { this.handleInputChangeUsername(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Id facebook của bạn'
                                    onChange={(e) => { this.handleInputChangeFacebookId(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Id zalo của bạn'
                                    onChange={(e) => { this.handleInputChangeZaloId(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Số điện thoại của bạn'
                                    onChange={(e) => { this.handleInputChangePhone(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Địa chỉ của bạn'
                                    onChange={(e) => { this.handleInputChangeAddress(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Input
                                    type='text'
                                    placeholder='Mật khẩu'
                                    onChange={(e) => { this.handleInputChangePassword(e.target.value) }} />
                                <div style={{ height: 18 }}></div>
                                <Button className="loginButton">Đăng ký</Button>
                            </Form>
                            <p className="register-text2">Bằng cách đăng ký, bạn đồng ý với <a href="http://localhost:3000/register">Điều khoản,</a> <a href="http://localhost:3000/register">Chính sách dữ liệu</a> và <a href="http://localhost:3000/register">Chính sách cookie</a> của chúng tôi.</p>
                        </div>
                        <div className="login-of-register">
                            <span className="donthaveid">Bạn đã có tài khoản? <a className="registerlink" href="http://localhost:3000/login">Đăng nhập</a></span>
                        </div>
                        <div className="footer">
                            <ul>
                                <li><a href="http://localhost:3000/register" className="link1">Giới thiệu về chúng tôi</a></li>
                                <li><a href="http://localhost:3000/register">Hỗ trợ</a></li>
                                <li><a href="http://localhost:3000/register">Quền riêng tư</a></li>
                                <li><a href="http://localhost:3000/register">Điều khoản</a></li>
                                <li><a href="http://localhost:3000/register">Trang cá nhân</a></li>
                                <li><a href="http://localhost:3000/register">Hashtag</a></li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div >
        )
    }

}

export default withRouter(Register);