import React from 'react';
import '../App.css'
import { Row, Col, Input, Container, Label, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';

class PasswordChange extends React.Component {

    state = {
        email: '',
        username: '',
        image: '',
        oldpassword: '',
        newpassword: '',
        checkpassword: ''
    }

    componentDidMount() {
        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].email === localStorage.getItem('user')) {
                        console.log(data[i]);
                        this.setState({
                            email: data[i].email,
                            image: data[i].avatarUrl,
                            username: data[i].username
                        })
                        console.log(this.state)
                    }
                }
            })
            .catch(error => console.log(error));
    }
    handleInputChangeOldPassword = (value) => {
        this.setState({
            oldpassword: value
        })
        console.log(this.state)
    }

    handleInputChangeNewPassword = (value) => {
        this.setState({
            newpassword: value
        })
        console.log(this.state)
    }

    handleInputChangeCheckPassword = (value) => {
        this.setState({
            checkpassword: value
        })
        console.log(this.state)
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
                    if (data[i].email === localStorage.getItem('user')) {
                        if (this.state.oldpassword !== data[i].password) {
                            console.log('Old password wrong');
                            valid = false;
                            break;
                        } else if(this.state.newpassword !== this.state.checkpassword){
                            console.log('New password not match the checkpassword');
                            valid = false;
                            break;
                        } else if(this.state.newpassword ===''||this.state.oldpassword===''||this.state.checkpassword===''){
                            console.log('Input all feild');
                            valid = false;
                            break;
                        }
                    }
                }


                if (valid === false) {
                    console.log('Edit false')
                } else {
                    console.log('Edit success')
                    console.log(this.state)
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].email === localStorage.getItem('user')) {
                            axios({
                                url: `${config.baseUrl}/updatepasswordprofile/${data[i]._id}/${this.state.newpassword}`,
                                method: 'get'
                            })
                                .then((response) => {
                                    console.log(response.data);
                                    window.location.href = 'http://localhost:3000/profile'
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='EditProfile' style={{ backgroundColor: '#fafafa', height: '750px' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <div className='passwordeditprofilemain'>
                    <Container style={{ backgroundColor: 'white', padding: '0px' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row style={{ color: 'hsl(0, 0%, 15%)' }}>
                                <Col xs="4" style={{ borderRight: '1px solid rgba(0, 0, 0, .0975)', height: '280px', padding: '0px' }}>
                                    <a href='http://localhost:3000/editprofile'
                                        style={{ color: 'hsl(0, 0%, 15%)' }}
                                        className='row2link'>
                                        <div className="row2"
                                            style={{
                                                textAlign: 'left',
                                                lineHeight: '20px',
                                                padding: '16px 16px 16px 30px'
                                            }}>
                                            Chỉnh sửa trang cá nhân
                                        </div>
                                    </a>
                                    <div className="row1"
                                        style={{
                                            borderLeft: '2px solid black',
                                            textAlign: 'left',
                                            fontWeight: '600',
                                            lineHeight: '20px',
                                            padding: '16px 16px 16px 30px'
                                        }}>
                                        Đổi mật khẩu
                                </div>
                                </Col>
                                <Col xs="8"
                                    style={{ padding: '10px' }}>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='4'
                                            style={{ textAlign: 'right' }}>
                                            <img src={this.state.image}
                                                alt="weima-userEditImage"
                                                className='userEditImage' style={{ marginTop: '1.5px' }} />
                                        </Col>
                                        <Col xs='8'>
                                            <div className="editName" style={{
                                                fontSize: '24px',
                                                lineHeight: '38px',
                                                margin: '0px 0px 2px'
                                            }}>
                                                {this.state.username}</div>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '20px' }}>
                                        <Col xs='4'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '3.5px'
                                            }}>
                                            <Label
                                                style={{
                                                    display: 'inline',
                                                    fontWeight: '600',
                                                    lineHeight: '18px'
                                                }}
                                            >Mật khẩu cũ</Label>
                                        </Col>
                                        <Col xs='8'>
                                            <Input type='text'
                                                style={{ width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangeOldPassword(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='4'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '3.5px'
                                            }}>
                                            <Label
                                                style={{
                                                    display: 'inline',
                                                    fontWeight: '600',
                                                    lineHeight: '18px'
                                                }}
                                            >Mật khẩu mới</Label>
                                        </Col>
                                        <Col xs='8'>
                                            <Input type='text'
                                                style={{
                                                    width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)'
                                                }}
                                                onChange={(e) => { this.handleInputChangeNewPassword(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='4'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '3.5px'
                                            }}>
                                            <Label
                                                style={{
                                                    display: 'inline',
                                                    fontWeight: '600',
                                                    lineHeight: '18px'
                                                }}
                                            >Xác nhận mật khẩu mới</Label>
                                        </Col>
                                        <Col xs='8'>
                                            <Input type='text'
                                                style={{
                                                    width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)',
                                                    marginTop: '9px'
                                                }}
                                                onChange={(e) => { this.handleInputChangeCheckPassword(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='4'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '3.5px'
                                            }}>
                                        </Col>
                                        <Col xs='8'>
                                            <Button style={{
                                                backgroundColor: 'hsl(209, 86%, 58%)',
                                                borderColor: 'hsl(209, 86%, 58%)',
                                                paddingTop: '4px',
                                                paddingBottom: '4px',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                            }}>Đổi mật khẩu</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
                <div className="footer" style={{ marginBottom: '10px' }}>
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
        )
    }
}

export default withRouter(PasswordChange);