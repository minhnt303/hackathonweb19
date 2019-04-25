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
import Popup from "reactjs-popup";
class UserProfile extends React.Component {

    state = {
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        files: '',
        post: '',
        facebooklink: '',
        productimage: [],
        productid: [],
        product: [{ id: [], name: [], image: [], catalog: [], price: [], discount: [], info: [], like: [] }],
        showPopup: false,
        // popupProduct: { id: [], name: [], image: [], catalog: [], price: [], discount: [], info: [], like: [] },
        // test: false,
        popupProduct:''
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
                            files: data[i].avatarUrl,
                            facebooklink: 'https://www.messenger.com/t/' + data[i].fbId,
                        })
                        let path = config.baseUrl + '/' + this.state.files;
                        console.log(path)
                        this.setState({
                            files: path
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
                                            productid: [...this.state.productid, product[j]._id],
                                            // product:[{id:[product[0]._id],image:[product[0].image_link]}]
                                            product: [...this.state.product, {
                                                id: [product[j]._id],
                                                name: [product[j].name],
                                                image: [product[j].image_link],
                                                catalog: [product[j].catalog_Id],
                                                price: [product[j].price],
                                                discount: [product[j].discount],
                                                info: [product[j].info],
                                                like: [product[j].like],
                                            }]
                                        })
                                    }
                                }
                                this.state.product.shift();
                                console.log(this.state.product)
                                this.setState({
                                    product: this.state.product,
                                    post: count,
                                })
                            })
                            .catch(error => console.log(error));
                        console.log(this.state)
                    }
                }
            })
            .catch(error => console.log(error));
    }

    clickimage(item) {
        console.log(JSON.stringify(item.id).slice(2, JSON.stringify(item.id).search('"]')));
        this.setState({
            showPopup: true,
            popupProduct: item,
        });
        axios.get(`${config.baseUrl}/api/product`)
            .then(productdata => {
                let product = productdata.data;
                for (let j = 0; j < product.length; j++) {
                    if (product[j]._id === JSON.stringify(item.id).slice(2, JSON.stringify(item.id).search('"]'))) {
                        console.log(product[j])
                        this.setState({
                            popupProduct: product[j]
                        })
                        console.log(this.state.popupProduct)
                    }
                }
            }).catch(error => console.log(error));
        // if (this.state.popupProduct.id.length === 0) {
        //     this.setState({
        //         test: true,
        //         popupProduct: item,
        //     })
        //     console.log(this.state.popupProduct)
        // } else {
        //     this.setState({
        //         test: false
        //     })
        // }
    }
    closePopup() {
        this.setState({
            showPopup: false,
        })
    }
    logOut() {
        localStorage.removeItem('user')
        console.log('logout')
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
                                <img src={this.state.files}
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
                                        <Popup trigger={<Button
                                            style={{
                                                backgroundColor: 'white',
                                                color: 'hsl(0, 0%, 15%)',
                                                padding: '0px',
                                                border: '0px',
                                            }}
                                        ><img src={SettingLogo}
                                            alt="weima-settinglogo"
                                            className='settinglogo'
                                            style={{ fontSize: '14px', lineHeight: '18px', height: '25px' }} /></Button>} position="right center">
                                            <div>
                                                <div style={{ textAlign: 'center', paddingBottom: '6px', }}>
                                                    <a href='http://localhost:3000/password/change' style={{
                                                        backgroundColor: 'white',
                                                        color: 'hsl(0, 0%, 15%)',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        border: '0px',
                                                        paddingRight: '45px',
                                                        paddingLeft: '45px',
                                                        paddingBottom: '12px',
                                                        paddingTop: '10px',
                                                        borderBottom: '1px solid whitesmoke'
                                                    }} className='popupLink'>Đổi mật khẩu</a>
                                                </div>
                                                <div style={{ textAlign: 'center', paddingBottom: '6px', }}>
                                                    <a href='http://localhost:3000/login' onClick={this.logOut} style={{
                                                        backgroundColor: 'white',
                                                        color: 'hsl(0, 0%, 15%)',
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        border: '0px',
                                                        paddingRight: '56px',
                                                        paddingLeft: '56px',
                                                        paddingBottom: '12px',
                                                        paddingTop: '8px',
                                                    }} className='popupLink'>Đăng xuất</a>
                                                </div>
                                            </div>
                                        </Popup>

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
                            {this.state.product.map((item, index) => (
                                <a onClick={() => this.clickimage(item)} key={index} style={{ width: '25%', height: '25%' }}>
                                    <img src={item.image} alt='imagase' style={{ width: '100%', height: '100%', border: '1px solid rgba(0, 0, 0, .0975)' }} />
                                </a>
                            ))}
                            {this.state.showPopup ?

                                <div className='popup'>
                                    <div className='popup_inner'>
                                            <Row style={{ height: '100%' }}>
                                                <Col xs='8' style={{ borderRight: '1px solid whitesmoke' }}>
                                                    <img src={this.state.popupProduct.image_link}/>   
                                                </Col>
                                                <Col xs='4'>asdasd</Col>
                                            </Row>
                                        <Button onClick={() => this.closePopup()}>close</Button>
                                    </div></div>
                                : null
                            }
                        </Row>
                        {/* </Container> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile);