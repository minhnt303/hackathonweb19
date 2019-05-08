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
import DotLogo from '../doticon.png'
import CloseLogo from '../closeLogo.png'
import HeartLogo from '../heartlogo.png'
import HeartLogoClick from '../heartlogoclick.png'
import Popup from "reactjs-popup";
import { Element } from 'react-scroll'
class UserProfile extends React.Component {

    state = {
        home:'',
        userid: '',
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
        like: '',
        product: [{
            id: [], name: [], image: [], catalog: [], price: [], discount: [], info: [], like: [],
            likeclick: false,
        }],
        showPopup: false,
        showPopup2: false,
        // popupProduct: { id: [], name: [], image: [], catalog: [], price: [], discount: [], info: [], like: [] },
        // test: false,
        popupProduct: '',
    }

    async componentDidMount() {
        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].email === localStorage.getItem('user')) {
                        // console.log(data[i]);
                        this.setState({
                            home: 'http://localhost:3000/home',
                            userid: data[i]._id,
                            email: data[i].email,
                            username: data[i].username,
                            facebookid: data[i].fbId,
                            zaloid: data[i].zaloId,
                            phone: data[i].phone,
                            address: data[i].address,
                            files: data[i].avatarUrl,
                            facebooklink: 'https://www.messenger.com/t/' + data[i].fbId,
                        })
                        // let path = config.baseUrl + '/' + this.state.files;
                        let path ='';
                        if (this.state.files.search('data') === -1 && this.state.files !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
                            path = config.baseUrl + '/' + this.state.files;
                        } else if (this.state.files.search('data') !== -1 && this.state.files !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
                            path = this.state.files;
                        } else {
                            path = this.state.files;
                        }
                        this.setState({
                            files: path
                        })
                        axios.get(`${config.baseUrl}/api/product`)
                            .then(productdata => {
                                let product = productdata.data;
                                let count = 0;
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
                                                likeclick: false,
                                            }]
                                        })
                                    }
                                }
                                this.state.product.shift();
                                this.setState({
                                    product: this.state.product,
                                    post: count,
                                })
                                // for(let j = 0; j < this.state.product.length; j++){
                                //     // console.log(this.state.product[j].like[0].length)
                                //     // if(this.state.product[j].like[0][j])
                                //     for(let a = 0; a < this.state.product[j].like[0].length; a++){
                                //         console.log(this.state.product[j].like[0][a])
                                //         if(this.state.product[j].like[0][a] === this.state.userid){
                                //             console.log(this.state.product)
                                //             let stateproduct = this.state.product[j];
                                //         }else{
                                //             // let stateproduct = this.state.product[j];
                                //             // this.setState({...this.state,
                                //             //     product:[{...stateproduct, likeclick:false,}]
                                //             // })
                                //         }
                                //     }
                                // }
                                this.state.product.map(async (productValue) => {
                                    // console.log(productValue)
                                    if (productValue.like[0].indexOf(this.state.userid) !== -1) {
                                        await this.setState({
                                            product: this.state.product.map((value) => {
                                                // console.log(value.id, productValue.id)
                                                if (value.id === productValue.id) {
                                                    return {
                                                        ...value,
                                                        likeclick: true
                                                    }
                                                }
                                                else {
                                                    return {
                                                        ...value
                                                    };
                                                }
                                            })
                                        })
                                    }
                                })

                                console.log(this.state);
                                let likecount = 0;
                                for (let j = 0; j < product.length; j++) {
                                    if (data[i]._id === product[j].user_Id) {
                                        likecount = (product[j].like.length) + likecount;
                                    }
                                }
                                this.setState({
                                    like: likecount,
                                })
                            })
                            .catch(error => console.log(error));

                        // console.log(this.state)
                    }
                }
            })
            .catch(error => console.log(error));
    }

    clickimage(item) {
        this.setState({
            showPopup: true,
            popupProduct: item,
        });
        console.log(item)
        axios.get(`${config.baseUrl}/api/product`)
            .then(productdata => {
                let product = productdata.data;
                for (let j = 0; j < product.length; j++) {
                    if (product[j]._id === JSON.stringify(item.id).slice(2, JSON.stringify(item.id).search('"]'))) {
                        this.setState({
                            popupProduct: product[j]
                        })
                        this.setState({
                            popupProduct: {
                                ...this.state.popupProduct,
                                likeclick: item.likeclick
                            }
                        })
                        console.log(this.state.popupProduct, j)
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
    openPopup2() {
        this.setState({
            showPopup2: true,
        })
    }
    closePopup2() {
        this.setState({
            showPopup2: false,
        })
    }
    copyLink() {
        const copyText = window.location.pathname;
        console.log(copyText)
        document.execCommand("copy");
        alert("Copied the text: " + copyText);
    }
    logOut() {
        localStorage.removeItem('user')
        console.log('logout')
    }
    like() {
        axios.get(`${config.baseUrl}/like/${this.state.popupProduct._id}/${this.state.userid}`).then(response => { console.log(response) }).catch((error) => {
            console.log(error);
        });
        console.log(this.state.popupProduct.likeclick)
        this.setState({
            popupProduct: {
                ...this.state.popupProduct,
                likeclick: true
            }
        })
        console.log(this.state.popupProduct.likeclick)
    }

    dislike() {
        axios.get(`${config.baseUrl}/dislike/${this.state.popupProduct._id}/${this.state.userid}`).then(response => { console.log(response) }).catch((error) => {
            console.log(error);
        });
        console.log(this.state.popupProduct.likeclick)
        this.setState({
            popupProduct: {
                ...this.state.popupProduct,
                likeclick: false
            }
        })
        console.log(this.state.popupProduct.likeclick)
    }

    createPostDetail() {
        window.location.href = 'http://localhost:3000/profile';
    }

    render() {
        return (
            <div className='Profile' style={{ backgroundColor: '#fafafa', height: '635px' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar value={this.state.home}/>
                    </div>
                </div>
                <div className="profileMain">
                    <div className="profileArea">
                        {/* <Container> */}
                        <Row style={{ borderBottom: '1px solid rgba(0, 0, 0, .0975)', paddingBottom: '20px' }} className="desktop">
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
                                                <span style={{ fontWeight: '600' }}>{this.state.like}
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
                        <Row style={{ marginLeft: '10%', marginRight: '10%' }} className='desktop'>
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
                                <a href='http://localhost:3000/savedproduct' style={{
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
                                <a href='http://localhost:3000/likedproduct' style={{
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

                        <Row style={{ marginLeft: '5%', marginRight: '5%' }} className='desktop'>
                            {this.state.product.map((item, index) => (// eslint-disable-next-line
                                <a onClick={() => this.clickimage(item)} key={index} style={{ width: '25%', height: '25%' }}>
                                    <img src={item.image} alt='imagase' style={{ width: '100%', height: '100%', border: '1px solid rgba(0, 0, 0, .0975)' }} />
                                </a>
                            ))}
                            {this.state.showPopup ?

                                <div className='popup'>
                                    <Button onClick={() => this.closePopup()} style={{ float: 'right', height: '40px', width: '40px', backgroundColor: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)' }}>
                                        <img src={CloseLogo} alt='closelogo' style={{ float: 'center', height: '20px', width: '20px' }} />
                                    </Button>
                                    <div className='popup_inner'>
                                        <Row style={{ height: '100%' }}>
                                            <Col xs='8'
                                                style={{
                                                    borderRight: '1px solid whitesmoke',
                                                    height: '100%',
                                                    width: '100%',
                                                }}>
                                                <img src={this.state.popupProduct.image_link}
                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                    }} alt='imageProduct' />
                                            </Col>
                                            <Col xs='4'>
                                                <Row style={{ borderBottom: '1px solid whitesmoke', width: '100%', height: '64px', paddingTop: '5%' }}>
                                                    <Col xs='2'>
                                                        <img src={this.state.files} alt='imageUser'
                                                            style={{
                                                                borderRadius: '50%',
                                                                border: '1px solid whitesmoke',
                                                                height: '35px',
                                                                width: '35px'
                                                            }} />
                                                    </Col>
                                                    <Col xs='8'>
                                                        <a className='popupname' href='/profile'>{this.state.username}</a>
                                                    </Col>
                                                    <Col xs='2'>
                                                        <Button onClick={() => this.openPopup2()} className='dotButton'>
                                                            <img src={DotLogo}
                                                                alt='dotlogo'
                                                                style={{ height: '15 px', width: '12px', paddingBottom: '3px' }} />
                                                        </Button>
                                                        {this.state.showPopup2 ?
                                                            <div className='popup2'>
                                                                <div className='popup_inner2'>
                                                                    <Button onClick={() => this.createPostDetail()} className='popup2Button'>Đi tới bài viết</Button><br />
                                                                    <Button className='popup2Button'>Chia sẻ</Button><br />
                                                                    <Button onClick={() => this.copyLink()} className='popup2Button'>Sao chép liên kết</Button><br />
                                                                    <Button onClick={() => this.closePopup2()} className='popup2Button'>Hủy</Button><br />
                                                                </div>
                                                            </div> : null
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row style={{ borderBottom: '1px solid whitesmoke', width: '100%', height: "450px", paddingTop: '5%' }}>
                                                    <Col xs='2'>
                                                    </Col>
                                                    <Col xs='10'>
                                                        <a className='popupname' href='/profile'>{this.state.popupProduct.name}</a>
                                                        <div className='scrollcontent'>
                                                            <Element
                                                                className="element"
                                                                id="scroll-container"
                                                                style={{
                                                                    position: "relative",
                                                                    height: "390px",
                                                                    width: "238px",
                                                                    overflowY: "scroll"
                                                                }}>
                                                                <Element
                                                                    name="scroll-container-first-element"
                                                                    style={{
                                                                        marginBottom: "200px",
                                                                        overflow: "auto",
                                                                        paddingRight: "15px",
                                                                    }}>
                                                                    <span className='popupProductInfo'> {this.state.popupProduct.info}</span>
                                                                </Element>
                                                            </Element>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                {/* <Row style={{ borderBottom: '1px solid whitesmoke', width: '100%', height: '100%', paddingTop: '5%' }}> */}
                                                {console.log(this.state.popupProduct.likeclick)}
                                                {
                                                    this.state.popupProduct.likeclick ?
                                                        <Button onClick={() => this.dislike()} className='dislikeButton'>
                                                            <img src={HeartLogoClick}
                                                                alt='heartlogoclick'
                                                                style={{ height: '30 px', width: '30px' }} />
                                                        </Button>
                                                        :
                                                        <Button onClick={() => this.like()} className='likeButton'>
                                                            <img src={HeartLogo}
                                                                alt='heartlogo'
                                                                style={{ height: '30 px', width: '30px' }} />
                                                        </Button>}
                                                {/* </Row> */}
                                            </Col>
                                        </Row>

                                    </div></div>
                                : null
                            }
                        </Row>

                        <Row className="mobile">
                            <Row style={{ marginBottom: '5px' }}>
                                <Col style={{ textAlign: 'center' }} xs='4'>
                                    <img src={this.state.files}
                                        alt="weima-userProfileImage"
                                        className='userProfileImage' />
                                    <a href="http://localhost:3000/editprofile">
                                        <Button style={{
                                            marginTop: '10px',
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
                                </Col>
                                <Col xs='8'>
                                    <div className="profilerow1" style={{ color: 'hsl(0, 0%, 15%)' }}>
                                        <h1 style={{ fontSize: '28px', fontWeight: '300', lineHeight: '32px' }}>{this.state.username}
                                            <Popup trigger={<Button
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: 'hsl(0, 0%, 15%)',
                                                    padding: '0px',
                                                    border: '0px',
                                                    marginBottom: '5px', marginLeft: '10px',
                                                }}
                                            ><img src={SettingLogo}
                                                alt="weima-settinglogo"
                                                className='settinglogo'
                                                style={{ fontSize: '14px', lineHeight: '18px', height: '25px', }} /></Button>} position="bottom center">
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
                            <div className="profilerow2" style={{ color: 'hsl(0, 0%, 15%)', borderTop: '1px solid rgba(0, 0, 0, .0975)', width: '100%', textAlign: 'center' }}>
                                <Row>
                                    <Col xs='4'>
                                        <span>
                                            <span style={{ fontWeight: '600' }}>{this.state.post}
                                            </span> bài viết
                                            </span>
                                    </Col>
                                    <Col xs='4'>
                                        <span>
                                            <span style={{ fontWeight: '600' }}>{this.state.like}
                                            </span> lượt thích
                                            </span>
                                    </Col>
                                    <Col xs='4'>
                                        <span>
                                            <span style={{ fontWeight: '600' }}>0
                                                </span> lượt xem
                                            </span>
                                    </Col>
                                </Row>
                            </div>

                            <Row style={{
                                marginLeft: '0%', marginRight: '0%', width: '100%', textAlign: 'center',
                                borderTop: '1px solid rgba(0, 0, 0, .0975)',
                            }}>
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
                                    <a href='http://localhost:3000/savedproduct' style={{
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
                                    <a href='http://localhost:3000/likedproduct' style={{
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
                            <Row>
                                {this.state.product.map((item, index) => (// eslint-disable-next-line
                                    <a onClick={() => this.clickimage(item)} key={index} style={{ flexBasis: '33.33%' }}>
                                        <img src={item.image} alt='imagase' style={{ width: '100%', height: '100%', border: '1px solid rgba(0, 0, 0, .0975)' }} />
                                    </a>
                                ))}
                                {this.state.showPopup ?

                                    <div className='popup'>
                                        <Button onClick={() => this.closePopup()} style={{ float: 'right', height: '40px', width: '40px', backgroundColor: 'rgba(0, 0, 0, 0)', borderColor: 'rgba(0, 0, 0, 0)' }}>
                                            <img src={CloseLogo} alt='closelogo' style={{ float: 'center', height: '20px', width: '20px' }} />
                                        </Button>
                                        <div className='popup_inner'>
                                            <Row style={{ borderBottom: '1px solid whitesmoke', height: '60px', paddingTop: '3%' }}>
                                                <Col xs='2'>
                                                    <img src={this.state.files} alt='imageUser'
                                                        style={{
                                                            borderRadius: '50%',
                                                            border: '1px solid whitesmoke',
                                                            height: '35px',
                                                            width: '35px',
                                                            display: "block",
                                                            marginLeft: "auto",
                                                            marginRight: "auto",
                                                        }} />
                                                </Col>
                                                <Col xs='8'>
                                                    <a className='popupname' href='/profile'>{this.state.username}</a>
                                                </Col>
                                                <Col xs='2'>
                                                    <Button onClick={() => this.openPopup2()} className='dotButton'>
                                                        <img src={DotLogo}
                                                            alt='dotlogo'
                                                            style={{ height: '15 px', width: '12px', paddingBottom: '3px' }} />
                                                    </Button>
                                                    {this.state.showPopup2 ?
                                                        <div className='popup2'>
                                                            <div className='popup_inner2'>
                                                                <Button onClick={() => this.createPostDetail()} className='popup2Button'>Đi tới bài viết</Button><br />
                                                                <Button className='popup2Button'>Chia sẻ</Button><br />
                                                                <Button onClick={() => this.copyLink()} className='popup2Button'>Sao chép liên kết</Button><br />
                                                                <Button onClick={() => this.closePopup2()} className='popup2Button'>Hủy</Button><br />
                                                            </div>
                                                        </div> : null
                                                    }
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    borderRight: '1px solid whitesmoke',
                                                    justifyContent: 'center',
                                                    marginTop: '10px'
                                                }}>
                                                <img src={this.state.popupProduct.image_link}
                                                    style={{
                                                    }} alt='imageProduct' />
                                            </Row>
                                            <Row style={{ borderBottom: '1px solid whitesmoke', width: '100%', height: "190px", paddingTop: '3%', marginLeft: '0px' }}>
                                                <Col xs='12'>
                                                    <a className='popupname' href='/profile'>{this.state.popupProduct.name}</a>
                                                    <div className='scrollcontent'>
                                                        <Element
                                                            className="element"
                                                            id="scroll-container"
                                                            style={{
                                                                position: "relative",
                                                                height: "160px",
                                                                overflowY: "scroll"
                                                            }}>
                                                            <Element
                                                                name="scroll-container-first-element"
                                                                style={{
                                                                    marginBottom: "200px",
                                                                    overflow: "auto",
                                                                    paddingRight: "15px",
                                                                }}>
                                                                <span className='popupProductInfo'> {this.state.popupProduct.info}</span>
                                                            </Element>
                                                        </Element>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {/* <Row style={{ borderBottom: '1px solid whitesmoke', width: '100%', height: '100%', paddingTop: '5%' }}> */}
                                            {console.log(this.state.popupProduct.likeclick)}
                                            {
                                                this.state.popupProduct.likeclick ?
                                                    <Button onClick={() => this.dislike()} className='dislikeButton'
                                                        style={{ marginLeft: '5px' }} >
                                                        <img src={HeartLogoClick}
                                                            alt='heartlogoclick'
                                                            style={{ height: '30 px', width: '30px' }} />
                                                    </Button>
                                                    :
                                                    <Button onClick={() => this.like()} className='likeButton'
                                                        style={{ marginLeft: '5px' }} >
                                                        <img src={HeartLogo}
                                                            alt='heartlogo'
                                                            style={{ height: '30 px', width: '30px' }} />
                                                    </Button>}
                                            {/* </Row> */}

                                        </div></div>
                                    : null
                                }
                            </Row>
                        </Row>

                        {/* </Container> */}
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(UserProfile);