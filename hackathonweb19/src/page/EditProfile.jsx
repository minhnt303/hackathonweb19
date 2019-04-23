import React from 'react';
import '../App.css'
import { Row, Col, Input, Container, Label, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';

class EditProfile extends React.Component {

    state = {
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        image: ''
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
                            username: data[i].username,
                            facebookid: data[i].fbId,
                            zaloid: data[i].zaloId,
                            phone: data[i].phone,
                            address: data[i].address,
                            image: data[i].avatarUrl
                        })
                        console.log(this.state)
                    }
                }
            })
            .catch(error => console.log(error));
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

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(config.baseUrl);

        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                let valid = true;
                console.log(data);
                if (this.state.password === '' || this.state.username === '' || this.state.zaloid === '' ||
                    this.state.facebookid === '' || this.state.address === '') {
                    console.log('Please input all feild');
                    valid = false;
                }

                if (valid === false) {
                    console.log('Edit false')
                } else {
                    console.log('Edit success')
                    console.log(this.state)
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].email === localStorage.getItem('user')) {
                            axios({
                                url: `${config.baseUrl}/updateprofile/${data[i]._id}/${this.state.username}&${this.state.facebookid}&${this.state.zaloid}&${this.state.phone}&${this.state.address}`,
                                method: 'get'
                            })
                                .then((response) => {
                                    console.log(response.data);
                                    window.location.href='http://localhost:3000/profile'
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
                <div className='editprofilemain'>
                    <Container style={{ backgroundColor: 'white' }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row style={{ color: 'hsl(0, 0%, 15%)' }}>
                                <Col xs="4" style={{ borderRight: '1px solid rgba(0, 0, 0, .0975)', height: '407px', padding: '0px' }}>
                                    <div className="row1"
                                        style={{
                                            borderLeft: '2px solid black',
                                            textAlign: 'left',
                                            fontWeight: '600',
                                            lineHeight: '20px',
                                            padding: '16px 16px 16px 30px'
                                        }}>
                                        Chỉnh sửa trang cá nhân
                                </div>
                                    <div className="row2"
                                        style={{
                                            textAlign: 'left',
                                            lineHeight: '20px',
                                            padding: '16px 16px 16px 30px'
                                        }}>
                                        Đổi mật khẩu
                                </div>
                                </Col>
                                <Col xs="8"
                                    style={{ padding: '10px' }}>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
                                            style={{ textAlign: 'right' }}>
                                            <img src={this.state.image}
                                                alt="weima-userEditImage"
                                                className='userEditImage' style={{ marginTop: '1.5px' }} />
                                        </Col>
                                        <Col xs='9'>
                                            <div className="editName" style={{
                                                fontSize: '20px',
                                                lineHeight: '22px',
                                                margin: '0px 0px 2px'
                                            }}>
                                                {this.state.username}</div>
                                            <a href='http:/localhost:3000/'
                                                style={{
                                                    color: 'hsl(209, 86%, 58%)',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    margin: '0px 0px 2px'
                                                }}>
                                                Thay đổi ảnh đại diện</a>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
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
                                            >Tên</Label>
                                        </Col>
                                        <Col xs='9'>
                                            <Input type='text'
                                                style={{ width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangeUsername(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
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
                                            >FaceBook</Label>
                                        </Col>
                                        <Col xs='9'>
                                            <Input type='text'
                                                style={{ width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangeFacebookId(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
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
                                            >Zalo</Label>
                                        </Col>
                                        <Col xs='9'>
                                            <Input type='text'
                                                style={{ width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangeZaloId(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
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
                                            >Mobile</Label>
                                        </Col>
                                        <Col xs='9'>
                                            <Input type='text'
                                                style={{ width: '90%', height: '32px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangePhone(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
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
                                            >Địa chỉ</Label>
                                        </Col>
                                        <Col xs='9'>
                                            <Input type='textarea'
                                                style={{ width: '90%', height: '64px', color: 'hsl(0, 0%, 15%)' }}
                                                onChange={(e) => { this.handleInputChangeAddress(e.target.value) }}></Input>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' }}>
                                        <Col xs='3'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '3.5px'
                                            }}>
                                        </Col>
                                        <Col xs='9'>
                                            <Button style={{
                                                backgroundColor: 'hsl(209, 86%, 58%)',
                                                borderColor: 'hsl(209, 86%, 58%)',
                                                paddingTop: '4px',
                                                paddingBottom: '4px',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                            }}>Gửi</Button>
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

export default withRouter(EditProfile);