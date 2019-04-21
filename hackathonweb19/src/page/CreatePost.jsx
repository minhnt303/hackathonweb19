import React from 'react';
// import '../App.css'
// import { Container, Row, Col } from 'reactstrap';
import { Container,Form   } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2'
class CreatePost extends React.Component {
    state = {
       
    };

    render() {
        return (
            <div className='Login'>
                <Container>
                    <div className="navbar">
                        <div className="navbar-area">
                            <NavBar />
                        </div>
                    </div>
                     <div>
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
                             </Form>
                        </div>
                    </div>
                </Container> 
            </div>
        )
    }

}

export default withRouter(CreatePost);