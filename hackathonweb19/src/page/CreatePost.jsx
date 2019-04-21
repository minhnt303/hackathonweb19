import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Container  } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2'
class CreatePost extends React.Component {
    state = {
       
    };

    render() {
        return (
            <div className='Login' style={{backgroundColor: '#fafafa', height: '635px'}}>
                <div className="navBar">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <Container>
                    
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
                    <div className='container'>
                        <h1 className='mt-3 mb-2 fong' >Create post</h1>
                        <div className='container d-flex justify-content-between'>
                             <div className="row w-50 m-auto">
                                <div className='col'>
                                    <form className="w-100">
                                        <div className="form-group">
                                            {/* <label>Tên sản phẩm</label> */}
                                            <input type="product" className="form-control" id="product"  placeholder="Tên sản phẩm" />
                                        </div>
                                        <div className="form-group">
                                            {/* <label>Giá sản phẩm</label> */}
                                            <input type="price" className="form-control" id="price"  placeholder="VND" />
                                        </div>
                                        <div className="form-group">
                                            {/* <label>Chiết khấu</label> */}
                                            <input type="discount" className="form-control" id="discount"  placeholder="Chiết khấu" />
                                         </div>
                                        <div className="form-group">
                                            {/* <label>Danh mục</label> */}
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>Danh mục</option>
                                                <option>Điện tử</option>
                                                <option>Thời trang</option>
                                                <option>Nông Sản</option>
                                                <option>Thực phẩm</option>
                                                <option>Hàng Hóa</option>
                                             </select>
                                        </div>
                                        <div className="form-group">
                                            {/* <label>Ảnh sản phẩm</label> */}
                                            <input type="file" className="form-control" id="images" name="images[]" style={{height: '45px'}} multiple/>
                                         </div>
                                        <div className="row" id="image_preview"></div>
                                        <button type="submit" className="btn btn-danger">Submit</button>
                                     </form>
                                </div>
                             </div>
                        </div>
                    </div>
                </Container> 
            </div>
        )
    }

}

export default withRouter(CreatePost);