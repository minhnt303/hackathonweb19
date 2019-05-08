import React from 'react';
import '../App.css'
// import { Row, Col } from 'reactstrap';
import { Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar'
import FileBase64 from 'react-file-base64';

class Register extends React.Component {
    state = {
        home:'',
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        password: '',
        files: '',
        divVisiable: false
    };
    componentDidMount(){
        if(localStorage.getItem('user')!== null){
            this.setState({
                home: 'http://localhost:3000/home',
            })
        } else (
            this.setState({
                home: 'http://localhost:3000',
            })
        )
    }
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

    getFiles(files) {
        console.log(files);
        this.setState({ files: files[0].base64, divVisiable: true });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(config.baseUrl);

        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                let valid = true;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i].email, this.state.email)
                    if (data[i].email === this.state.email) {
                        console.log('email have used');
                        valid = false;
                        break;
                    } else if (this.state.email === '' || this.state.password === '' || this.state.username === '' || this.state.zaloid === '' ||
                        this.state.facebookid === '' || this.state.phone === '' || this.state.address === '' || this.state.files === '') {
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
                    axios({
                        url: `${config.baseUrl}/api/user`,
                        method: 'post',
                        data: {
                            email: this.state.email, password: this.state.password, username: this.state.username,
                            zaloId: this.state.zaloid, phone: this.state.phone, fbId: this.state.facebookid,
                            address: this.state.address, avatarUrl: this.state.files,
                        },
                    })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    window.location.href = 'http://localhost:3000/home'
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='Login'>
                <div className="navbar">
                    <div className="navbar-area">
                        <NavBar value={this.state.home}/>
                    </div>
                </div>
                <div className="main-register">
                    <div className="register-form">
                        <h1 className="logo-name">Weima</h1>
                        <h3 className="register-text">Đăng ký để xem sản phẩm.</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Input
                                type='text'
                                placeholder='Email'
                                onChange={(e) => { this.handleInputChangeEmail(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Tên đầy đủ'
                                onChange={(e) => { this.handleInputChangeUsername(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Id facebook của bạn'
                                onChange={(e) => { this.handleInputChangeFacebookId(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Id zalo của bạn'
                                onChange={(e) => { this.handleInputChangeZaloId(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Số điện thoại của bạn'
                                onChange={(e) => { this.handleInputChangePhone(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Địa chỉ của bạn'
                                onChange={(e) => { this.handleInputChangeAddress(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <Input
                                type='text'
                                placeholder='Mật khẩu'
                                onChange={(e) => { this.handleInputChangePassword(e.target.value) }} style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                            <div style={{ height: 18 }}></div>
                            <FileBase64
                                multiple={true}
                                onDone={this.getFiles.bind(this)}
                            />
                            {this.state.divVisiable ?
                                (
                                    <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px' }}>
                                        <img src={this.state.files} alt="anh_san_pham" with="20px" height="30px" />
                                    </div>
                                ) : null
                            }
                            <div style={{ height: 18 }}></div>
                            <Button className="registerButton" style={{ backgroundColor: 'hsl(209, 86%, 58%)', border: 'hsl(209, 86%, 58%)', fontWeight: 'bold', width: '100%' }}>Đăng ký</Button>
                        </Form>
                        <p className="register-text2">Bằng cách đăng ký, bạn đồng ý với <a href="http://localhost:3000/register" style={{ fontWeight: "600", textDecoration: "none" }}>Điều khoản,</a>
                            <a href="http://localhost:3000/register" style={{ fontWeight: "600", textDecoration: "none" }}>Chính sách dữ liệu</a> và
                            <a href="http://localhost:3000/register" style={{ fontWeight: "600", textDecoration: "none" }}>Chính sách cookie</a> của chúng tôi.</p>
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
                            <li><span style={{ color: "hsl(0, 0%, 60%)" }}>@ 2019 WEIMA</span></li>
                        </ul>
                    </div>
                </div>
            </div >
        )
    }

}

export default withRouter(Register);