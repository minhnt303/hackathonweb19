import React from 'react';
import '../App.css'
import { Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';
import FileBase64 from 'react-file-base64';
// import Popup from "reactjs-popup";
class CreatePost extends React.Component {
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
    state = {
        home:'',
        name: '',
        price: '',
        discount: '',
        info: '',
        catalog: '',
        // image: '', thay bang files
        files: '',
        divVisiable: false
    };
    handleInputChangeName = (value) => {
        this.setState({
            name: value,
        })
        console.log(this.state)
    }
    handleInputChangePrice = (value) => {
        this.setState({
            price: value,
        })
        console.log(this.state)
    }
    handleInputChangeDiscount = (value) => {
        this.setState({
            discount: value,
        })
        console.log(this.state)
    }
    handleInputChangeInfo = (value) => {
        this.setState({
            info: value,
        })
        console.log(this.state)
    }
    handleInputChangeCatalog = (value) => {
        this.setState({
            catalog: value,
        })
        console.log(this.state)
    }
    handleInputChangeImage = (value) => {
        this.setState({
            image: value,
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
            .then(userdata => {
                let data = userdata.data;
                // let valid = true;
                console.log(data);
                // axios.get(`${config.baseUrl}/api/product`)
                //     .then(productdata => {
                //         let data = productdata.data;
                //     })
                //     .catch(error => console.log(error));
                console.log(localStorage.getItem('user'))

                if (this.state.name === '' || this.state.price === '' || this.state.info === '' ||
                    this.state.image === '' || this.state.discount === '' || this.state.catalog === '') {
                    console.log('Post false')
                } else {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].email === localStorage.getItem('user')) {
                            
                            console.log('email');
                            console.log(data[i]._id)
                            axios({
                                url: `${config.baseUrl}/api/product`,
                                method: 'post',
                                data: {
                                    name: this.state.name, price: this.state.price, user_Id: data[i]._id,
                                    catalog_Id: this.state.catalog, info: this.state.info, image_link: this.state.files, discount: this.state.discount
                                },
                            })
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            break;
                        }
                    }
                }
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div className='Login' style={{ backgroundColor: '#fafafa', height: '635px' }}>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar value={this.state.home}/>
                    </div>
                </div>
                {/* <Popup trigger={<button> Trigger</button>} position="right center">
                    <div>Popup content here !!<Button>jas</Button></div>
                </Popup> */}
                <div style={{ height: 18 }}></div>
                <div className='container desktop' style={{ backgroundColor: 'white' }}>
                    <div style={{ height: 18 }}></div>
                    <h1 className='mt-3 mb-2 fong' >Create Post</h1> {/*Không được sửa do lỗi font khi viết tiếng việt*/}
                    <div className=' d-flex justify-content-between'>
                        <div className="row w-50 m-auto">
                            <div className='col'>
                                <Form className="w-100" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        {/* <label>Tên sản phẩm</label> */}
                                        <Input type="text" className="name" id="product" onChange={(e) => { this.handleInputChangeName(e.target.value) }} placeholder="Tên sản phẩm" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Giá sản phẩm</label> */}
                                        <Input type="number" className="price" id="price" onChange={(e) => { this.handleInputChangePrice(e.target.value) }} placeholder="Giá sản phẩm (VND)" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Chiết khấu</label> */}
                                        <Input type="number" className="discount" id="discount" onChange={(e) => { this.handleInputChangeDiscount(e.target.value) }} placeholder="Chiết khấu (%)" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Chiết khấu</label> */}
                                        <Input type="textarea" className="info" id="info" onChange={(e) => { this.handleInputChangeInfo(e.target.value) }} placeholder="Thông tin về sản phẩm" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Danh mục</label> */}
                                        <Input type="select" className="form-control" onChange={(e) => { this.handleInputChangeCatalog(e.target.value) }} id="exampleFormControlSelect1" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }}>
                                            <option>Danh mục</option>
                                            <option>Điện tử</option>
                                            <option>Thời trang</option>
                                            <option>Nông Sản</option>
                                            <option>Thực phẩm</option>
                                            <option>Hàng Hóa</option>
                                        </Input>
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Ảnh sản phẩm</label> */}
                                        {/* <Input type="file" className="image" id="images" name="images[]" onChange={(e) => { this.handleInputChangeImage(e.target.value) }} style={{ height: '45px', backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)', paddingTop: "6px", paddingLeft: "6px" }} multiple /> */}
                                        <FileBase64
                                            multiple={true}
                                            onDone={this.getFiles.bind(this)}
                                        />
                                    </div>
                                    {this.state.divVisiable ?
                                        (
                                            <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px', height: '30px' }}>
                                                <img src={this.state.files} alt="anh_san_pham" with="200px" height="30px" />
                                            </div>
                                        ) : null
                                    }
                                    <Button type="submit" className="btn btn-danger">Đăng sản phẩm</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mobile' style={{ backgroundColor: 'white' }}>
                    <div style={{ height: 18 }}></div>
                    <h1 className='mt-3 mb-2 fong' >Create Post</h1> {/*Không được sửa do lỗi font khi viết tiếng việt*/}
                    <div className=' d-flex justify-content-between'>
                        <div className="row">
                            <div className='col'>
                                <Form className="w-100" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        {/* <label>Tên sản phẩm</label> */}
                                        <Input type="text" className="name" id="product" onChange={(e) => { this.handleInputChangeName(e.target.value) }} placeholder="Tên sản phẩm" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Giá sản phẩm</label> */}
                                        <Input type="number" className="price" id="price" onChange={(e) => { this.handleInputChangePrice(e.target.value) }} placeholder="Giá sản phẩm (VND)" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Chiết khấu</label> */}
                                        <Input type="number" className="discount" id="discount" onChange={(e) => { this.handleInputChangeDiscount(e.target.value) }} placeholder="Chiết khấu (%)" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Chiết khấu</label> */}
                                        <Input type="textarea" className="info" id="info" onChange={(e) => { this.handleInputChangeInfo(e.target.value) }} placeholder="Thông tin về sản phẩm" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Danh mục</label> */}
                                        <Input type="select" className="form-control" onChange={(e) => { this.handleInputChangeCatalog(e.target.value) }} id="exampleFormControlSelect1" style={{ backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)' }}>
                                            <option>Danh mục</option>
                                            <option>Điện tử</option>
                                            <option>Thời trang</option>
                                            <option>Nông Sản</option>
                                            <option>Thực phẩm</option>
                                            <option>Hàng Hóa</option>
                                        </Input>
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Ảnh sản phẩm</label> */}
                                        {/* <Input type="file" className="image" id="images" name="images[]" onChange={(e) => { this.handleInputChangeImage(e.target.value) }} style={{ height: '45px', backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)', paddingTop: "6px", paddingLeft: "6px" }} multiple /> */}
                                        <FileBase64
                                            multiple={true}
                                            onDone={this.getFiles.bind(this)}
                                        />
                                    </div>
                                    {this.state.divVisiable ?
                                        (
                                            <div className="row" style={{ boxSizing: 'border-box', margin: '4px 0px', marginBottom: '20px', with: '200px', height: '30px' }}>
                                                <img src={this.state.files} alt="anh_san_pham" with="200px" height="30px" />
                                            </div>
                                        ) : null
                                    }
                                    <Button type="submit" className="btn btn-danger" style={{width:'100%'}}>Đăng sản phẩm</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(CreatePost);

