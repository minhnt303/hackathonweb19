import React from 'react';
import '../App.css'
import { Row, Col, Input, Container, Label, Button, Form } from 'reactstrap';
import axios, { post } from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';
// import Popup from "reactjs-popup";
// import FileBase64 from 'react-file-base64';
class EditProfile extends React.Component {

    state = {
        email: '',
        username: '',
        facebookid: '',
        zaloid: '',
        phone: '',
        address: '',
        image: '',
        oldimage: '',
        files: '',
        divVisiable: false
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
                            oldimage: data[i].avatarUrl
                        })
                        let path = config.baseUrl + '/' + this.state.image;
                        console.log(path)
                        this.setState({
                            image: path
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
    getFiles(files) {
        console.log(files);
        // this.setState({ files: files[0].base64, divVisiable: true });
        // console.log(this.state)
        this.setState({ files: files.target.files[0] })
    }
    fileUpload(file) {
        console.log(file)
        const url = 'http://localhost:3001/upload';
        const formData = new FormData();
        formData.append('avatar', file)
        console.log(formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.fileUpload(this.state.files).then((response) => {
            console.log(config.baseUrl + '/' + JSON.parse(JSON.stringify(response.data)));
            let path = JSON.parse(JSON.stringify(response.data));
            console.log(path)
            this.setState({
                files: path
            })
            console.log(this.state)
        })
        axios.get(`${config.baseUrl}/deleteimage/${this.state.oldimage}`).then(response => { console.log(response) }).catch((error) => {
            console.log(error);
        });
        axios.get(`${config.baseUrl}/api/user`)
            .then(response => {
                let data = response.data;
                let valid = true;
                console.log(data);
                if (this.state.password === '' || this.state.username === '' || this.state.zaloid === '' ||
                    this.state.facebookid === '' || this.state.address === '' || this.state.fires === '') {
                    console.log('Please input all feild');
                    valid = false;
                }

                if (valid === false) {
                    console.log('Edit false')
                } else {
                    console.log('Edit success')
                    console.log(this.state.files)
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].email === localStorage.getItem('user')) {
                            axios({
                                url: `${config.baseUrl}/updateprofile/${data[i]._id}/${this.state.username}&${this.state.facebookid}&${this.state.zaloid}&${this.state.phone}&${this.state.address}&${this.state.files}`,
                                method: 'get'
                            })
                                .then((response) => {
                                    console.log(response.data);
                                    console.log(this.state)
                                    window.location.href = 'http://localhost:3000/profile'
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            console.log(this.state.files, this.state.image)

                        }
                    }
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='EditProfile' style={{ backgroundColor: '#fafafa' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <div className='desktop'>
                    <div className='editprofilemain'>
                        <Container style={{ backgroundColor: 'white', padding: '0px' }}>
                            <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                                        <a href='http://localhost:3000/password/change'
                                            style={{ color: 'hsl(0, 0%, 15%)' }}
                                            className='row2link'>
                                            <div className="row2"
                                                style={{
                                                    textAlign: 'left',
                                                    lineHeight: '20px',
                                                    padding: '16px 16px 16px 30px'
                                                }}>
                                                Đổi mật khẩu
                                    </div></a>
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
                                                    fontSize: '24px',
                                                    lineHeight: '38px',
                                                    margin: '0px 0px 2px'
                                                }}>
                                                    {this.state.username}</div>
                                                {/* <a href='http:/localhost:3000/'
                                                style={{
                                                    color: 'hsl(209, 86%, 58%)',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    margin: '0px 0px 2px'
                                                }}>
                                                Thay đổi ảnh đại diện</a> */}
                                                {/* <Popup trigger={<Button
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: 'hsl(209, 86%, 58%)',
                                                    padding: '0px',
                                                    border: '0px',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    margin: '0px 0px 2px'
                                                }}
                                            >Thay đổi ảnh đại diện</Button>} position="right center">
                                                <div><FileBase64
                                                        multiple={true}
                                                        onDone={this.getFiles.bind(this)}
                                                    />
                                                        {this.state.divVisiable ?
                                                            (
                                                                <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px', height: '200px' }}>
                                                                    <img src={this.state.files} alt="anh_san_pham" with="200px" height="200px" />
                                                                </div>
                                                            ) : null
                                                        }
                                                        <Button>Đăng ảnh</Button>
                                                </div>
                                            </Popup> */}
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
                                                    marginTop: '0px'
                                                }}>
                                                <Label
                                                    style={{
                                                        display: 'inline',
                                                        fontWeight: '600',
                                                        lineHeight: '18px'
                                                    }}
                                                >Thay đổi ảnh đại diện</Label>
                                            </Col>
                                            <Col xs='9'
                                                style={{
                                                    marginTop: '7px'
                                                }}>
                                                <Input
                                                    multiple={true}
                                                    onChange={this.getFiles.bind(this)}
                                                    type="file"
                                                />
                                                {/* <Input type="file" name="avatar" onChange={this.getFiles}/> */}
                                                {this.state.divVisiable ?
                                                    (
                                                        <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px' }}>
                                                            <img src={this.state.files} alt="anh_san_pham" with="20px" height="30px" />
                                                        </div>
                                                    ) : null
                                                }
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
                <div className='mobile'>
                    <div className='editprofilemain'>
                        <Container style={{ backgroundColor: 'white', padding: '0px' }}>
                            <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <Row style={{ color: 'hsl(0, 0%, 15%)' }}>
                                    <Row style={{ marginBottom: '15px', width:'100%'}}>
                                        <Col xs='3'
                                            style={{ textAlign: 'right' }}>
                                            <img src={this.state.image}
                                                alt="weima-userEditImage"
                                                className='userEditImage' style={{ marginTop: '1.5px' }} />
                                        </Col>
                                        <Col xs='9'>
                                            <div className="editName" style={{
                                                fontSize: '24px',
                                                lineHeight: '38px',
                                                margin: '0px 0px 2px'
                                            }}>
                                                {this.state.username}</div>
                                            {/* <a href='http:/localhost:3000/'
                                                style={{
                                                    color: 'hsl(209, 86%, 58%)',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    margin: '0px 0px 2px'
                                                }}>
                                                Thay đổi ảnh đại diện</a> */}
                                            {/* <Popup trigger={<Button
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: 'hsl(209, 86%, 58%)',
                                                    padding: '0px',
                                                    border: '0px',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '18px',
                                                    margin: '0px 0px 2px'
                                                }}
                                            >Thay đổi ảnh đại diện</Button>} position="right center">
                                                <div><FileBase64
                                                        multiple={true}
                                                        onDone={this.getFiles.bind(this)}
                                                    />
                                                        {this.state.divVisiable ?
                                                            (
                                                                <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px', height: '200px' }}>
                                                                    <img src={this.state.files} alt="anh_san_pham" with="200px" height="200px" />
                                                                </div>
                                                            ) : null
                                                        }
                                                        <Button>Đăng ảnh</Button>
                                                </div>
                                            </Popup> */}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
                                        <Col xs='3'
                                            style={{
                                                textAlign: 'right',
                                                marginTop: '0px'
                                            }}>
                                            <Label
                                                style={{
                                                    display: 'inline',
                                                    fontWeight: '600',
                                                    lineHeight: '18px'
                                                }}
                                            >Thay đổi ảnh đại diện</Label>
                                        </Col>
                                        <Col xs='9'
                                            style={{
                                                marginTop: '7px'
                                            }}>
                                            <Input
                                                multiple={true}
                                                onChange={this.getFiles.bind(this)}
                                                type="file"
                                            />
                                            {/* <Input type="file" name="avatar" onChange={this.getFiles}/> */}
                                            {this.state.divVisiable ?
                                                (
                                                    <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px' }}>
                                                        <img src={this.state.files} alt="anh_san_pham" with="20px" height="30px" />
                                                    </div>
                                                ) : null
                                            }
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '15px' ,width:'100%'}}>
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
            </div>
        )
    }
}

export default withRouter(EditProfile);