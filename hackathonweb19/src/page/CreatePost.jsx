import React from 'react';
import '../App.css'
import { Input, Button, Form } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2'
class CreatePost extends React.Component {
    state = {
        name: '',
        price: '',
        discount: '',
        info: '',
        catalog: '',
        image: '',
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
                                    catalog_Id: this.state.catalog, info: this.state.info, image_link: this.state.image, discount: this.state.discount
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
                        <NavBar />
                    </div>
                </div>

                {/* <div>
                        <h2 className='mt-3 mb-2'>Create post</h2>
                    </div>
                    <div>
                        <div>
                            <Form>
                                <div className="form-group">
                                   <label>Tên sản phẩm</label>
                                   <input type="product" className="form-control" id="product"  placeholder="Tên sản phẩm"/>
                                </div>
                                <div className="form-group">
                                    <label>Giá sản phẩm</label>
                                    <input type="price" className="form-control" id="price"  placeholder="VND"/>
                                </div>
                                <div className="form-group">
                                    <label>Chiết khấu</label>
                                    <input type="discount" className="form-control" id="discount"  placeholder="Chiết khấu"/>
                                </div>
                                <div className="form-group">
                                    <label>Danh mục</label>
                                    <select className="form-control" id="exampleFormControlSelect1">
                                        <option>Loại sản phẩm</option>
                                        <option>Điện tử</option>
                                        <option>Thời trang</option>
                                        <option>Nông Sản</option>
                                        <option>Thực phẩm</option>
                                        <option>Hàng Hóa</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ảnh sản phẩm</label>
                                    <input type="file" className="form-control" id="images" name="images[]" style={{height: '45px'}} multiple/>
                                </div>
                                <div className="row" id="image_preview"></div>
                                <button type="submit" className="btn btn-danger">Submit</button>
                             </Form>
                        </div>
                    </div> */}
                <div style={{ height: 18 }}></div>
                <div className='container' style={{ width: "900px" , backgroundColor:'white'}}>
                    <div style={{ height: 18 }}></div>
                    <h1 className='mt-3 mb-2 fong' >CreatePost</h1> {/*Không được sửa do lỗi font khi viết tiếng việt*/}
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
                                        <Input type="file" className="image" id="images" name="images[]" onChange={(e) => { this.handleInputChangeImage(e.target.value) }} style={{ height: '45px', backgroundColor: '#fafafa', border: '1px solid hsl(0, 0%, 88%)', paddingTop: "6px", paddingLeft: "6px" }} multiple />
                                    </div>
                                    <div className="row" id="image_preview"></div>
                                    <Button type="submit" className="btn btn-danger">Đăng sản phẩm</Button>
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