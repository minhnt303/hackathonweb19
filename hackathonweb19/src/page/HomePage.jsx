import React from 'react';
import '../App.css'
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';
// import { Element} from 'react-scroll'
// import FileBase64 from 'react-file-base64';



class HomePage extends React.Component {
    state = {
        // nhung thu lay tu user
        // users: [{
        //     userName: [],
        //     userId: [],
        //     userImage: []
        // }],
        // nhung thu lay tu san pham
        products: [{ 
                    userId: [],
                    nameProduct: [], 
                    catalog_Id: [], 
                    price: [], 
                    discount: [],  
                    info: [], 
                    image_link: [], 
                    createAt: [], 
                    view: [], 
                    like: [],
                    }],

    };
    componentDidMount() {
        axios.get(`${config.baseUrl}/api/product`)
            .then(response => {
                let data = response.data;
                for (let i = 0; i < data.length; i++) {
                    this.setState({
                        products: [...this.state.products, {
                            userId: [data[i].user_Id],
                            nameProduct: [data[i].name], 
                            catalog_Id: [data[i].catalog_Id], 
                            price: [data[i].price], 
                            discount: [data[i].discount],  
                            info: [data[i].info], 
                            image_link: [data[i].image_link], 
                            createAt: [data[i].createAt], 
                            view: [data[i].view], 
                            like: [data[i].like],
                        }]
                    })
                }
                this.state.products.shift();
                console.log(this.state.products[0].userId[0].address);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='CreatePost'>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <div className='Content'>
                    <div>
                        <Container>
                            <Row style={{textAlign:'center'}}>
                               <Col xs="8">
                               </Col>
                               <Col xs="4">Hình ảnh và tên tài khoản</Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        )
    }

    
    
      
      
      
      
    //   render() {
    //     return (
    //       <div>
                
                      
    
    //         <Element
    //           className="element"
    //           id="scroll-container"
    //           style={{
    //             position: "relative",
    //             height: "200px",
    //             overflow: "scroll",
    //             marginBottom: "100px"
    //           }}
    //         >
    //           <Element
    //             name="scroll-container-first-element"
    //             style={{
    //               marginBottom: "200px"
    //             }}
    //           >
    //             first element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside containerfirst element
    //             inside container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container
    //           </Element>
    //         </Element>
    //       </div>
    //     );
    //   }
}

export default withRouter(HomePage);

