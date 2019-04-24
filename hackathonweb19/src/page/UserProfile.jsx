import React from 'react';
import '../App.css'
import { Row, Col, Button } from 'reactstrap';
// import { Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2'
import SettingLogo from '../settinglogo.png'
import GridLogo from '../gridlogo.png'
import BookmarkLogo from '../bookmarklogo.png'
import LikeLogo from '../likelogo.png'
class UserProfile extends React.Component {

    state = {
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        image: '',
        post: '',
        facebooklink: '',
        productimage: [],
        productid: [],
    }

    componentDidMount() {
        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].email === localStorage.getItem('user')) {
                        // console.log(data[i]);
                        this.setState({
                            email: data[i].email,
                            username: data[i].username,
                            facebookid: data[i].fbId,
                            zaloid: data[i].zaloId,
                            phone: data[i].phone,
                            address: data[i].address,
                            image: data[i].avatarUrl,
                            facebooklink: 'https://www.messenger.com/t/' + data[i].fbId,
                        })
                        axios.get(`${config.baseUrl}/api/product`)
                            .then(productdata => {
                                let product = productdata.data;
                                let count = 0;
                                // console.log(product)
                                for (let j = 0; j < product.length; j++) {
                                    // console.log(data[i]._id, product[j].user_Id)
                                    if (data[i]._id === product[j].user_Id) {
                                        count = count + 1;
                                        this.setState({
                                            productimage: [...this.state.productimage, product[j].image_link],
                                            productid: [...this.state.productid, product[j]._id]
                                        })
                                    }
                                }
                                this.setState({
                                    post: count,
                                })
                                // console.log(this.state)
                            })
                            .catch(error => console.log(error));
                        // console.log(this.state)
                    }
                }
            })
            .catch(error => console.log(error));
    }

    clickimage(item){
        console.log(item);
    }

    render() {
        return (
            <div className='Profile' style={{ backgroundColor: '#fafafa', height: '635px' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <div className="profileMain">
                    <div className="profileArea">
                        {/* <Container> */}
                        <Row style={{ borderBottom: '1px solid rgba(0, 0, 0, .0975)', paddingBottom: '20px' }}>
                            <Col style={{ textAlign: 'center' }} xs='4'>
                                <img src={this.state.image}
                                    alt="weima-userProfileImage"
                                    className='userProfileImage' />
                            </Col>
                            <Col xs='8'>
                                <div className="profilerow1" style={{ color: 'hsl(0, 0%, 15%)' }}>
                                    <h1 style={{ fontSize: '28px', fontWeight: '300', lineHeight: '32px' }}>{this.state.username}
                                        <a href="http://localhost:3000/editprofile">
                                            <Button style={{
                                                marginLeft: '20px',
                                                marginRight: '20px',
                                                backgroundColor: '#fafafa',
                                                color: 'hsl(0, 0%, 15%)',
                                                borderColor: 'rgba(0, 0, 0, .0975)',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                lineHeight: '18px'
                                            }}>Chỉnh sửa trang cá nhân</Button>
                                        </a>
                                        <img src={SettingLogo}
                                            alt="weima-settinglogo"
                                            className='settinglogo'
                                            style={{ fontSize: '14px', lineHeight: '18px', height: '25px' }} />
                                    </h1>
                                </div>
                                <div className="profilerow2" style={{ color: 'hsl(0, 0%, 15%)' }}>
                                    <Row>
                                        <Col xs='2'>
                                            <span>
                                                <span style={{ fontWeight: '600' }}>{this.state.post}
                                                </span> bài viết
                                            </span>
                                        </Col>
                                        <Col xs='2'>
                                            <span>
                                                <span style={{ fontWeight: '600' }}>0
                                                </span> lượt thích
                                            </span>
                                        </Col>
                                        <Col xs='2'>
                                            <span>
                                                <span style={{ fontWeight: '600' }}>0
                                                </span> lượt xem
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="profilerow3">
                                    <span>FaceBook:
                                        <span style={{ fontWeight: '600' }}> <a href={this.state.facebooklink} className="facebooklink">{this.state.facebookid}</a>
                                        </span>
                                    </span>
                                </div>
                                <div className="profilerow4">
                                    <span>Zalo:
                                        <span style={{ fontWeight: '600' }}> <a href='https://chat.zalo.me/' className="facebooklink">{this.state.zaloid}</a>
                                        </span>
                                    </span>
                                </div>
                                <div className="profilerow5">
                                    <span>Địa chỉ:
                                        <span style={{ fontWeight: '600' }}> {this.state.address}
                                        </span>
                                    </span>
                                </div>
                                <div className="profilerow6">
                                    <span>Số điện thoại:
                                        <span style={{ fontWeight: '600' }}> {this.state.phone}
                                        </span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <Col xs='4' style={{
                                textAlign: 'center',
                                padding: '0px',
                                marginTop: '9px',
                                marginBottom: '9px'
                            }}>
                                <a href='http://localhost:3000/profile' style={{
                                    borderTop: '1px solid black',
                                    color: 'hsl(0, 0%, 15%)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    lineHeight: '18px',
                                    textTransform: 'uppercase',
                                    paddingTop: '12px'
                                }} className='profilelink'>
                                    <img src={GridLogo}
                                        alt='gridlogo'
                                        style={{ height: '17 px', width: '12px', paddingBottom: '5px' }} />  Bài viết
                                </a>
                            </Col>
                            <Col xs='4' style={{
                                textAlign: 'center',
                                padding: '0px',
                                marginTop: '9px',
                                marginBottom: '9px'
                            }}>
                                <a href='http://localhost:3000' style={{
                                    color: 'hsl(0, 0%, 60%)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    lineHeight: '18px',
                                    textTransform: 'uppercase',
                                    paddingTop: '12px'
                                }} className='profilelink'>
                                    <img src={BookmarkLogo}
                                        alt='gridlogo'
                                        style={{ height: '17 px', width: '12px', paddingBottom: '5px' }} />  Đã lưu
                                </a>
                            </Col>
                            <Col xs='4' style={{
                                textAlign: 'center',
                                padding: '0px',
                                marginTop: '9px',
                                marginBottom: '9px'
                            }}>
                                <a href='http://localhost:3000' style={{
                                    color: 'hsl(0, 0%, 60%)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    lineHeight: '18px',
                                    textTransform: 'uppercase',
                                    paddingTop: '12px'
                                }} className='profilelink'>
                                    <img src={LikeLogo}
                                        alt='gridlogo'
                                        style={{ height: '17 px', width: '12px', paddingBottom: '5px' }} />  Đã thích
                                </a>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: '10%', marginRight: '10%' }}>
                            {this.state.productimage.map((item, index)=>(
                                <a onClick={ () => this.clickimage(item)} key={index}>
                                    <img  src={item}  alt='imagase' style={{width:'25%', height:'25%', border: '1px solid rgba(0, 0, 0, .0975)'}}/>
                                </a>
                            ))}
                        </Row>
                        {/* </Container> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile);