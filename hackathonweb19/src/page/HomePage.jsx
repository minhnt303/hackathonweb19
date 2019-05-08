import React from "react";
import "../App.css";
// import { Row, Col } from "reactstrap";
import axios from "axios";
import config from "../config";
import { withRouter } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar2";
import Home from "../components/Home/Home";
// import doticon from "../doticon.png";
// import likelogo from "../likelogo.png";
// import logo from "../logo.png";
// import bookmarklogo from "../bookmarklogo.png";
// import { Element} from 'react-scroll'
// import FileBase64 from 'react-file-base64';

class HomePage extends React.Component {
  state = {
    home:'',
    // nhung thu lay tu user
    users: {
      userName: '',
      userId: '',
      userImage: ''
    },
    // nhung thu lay tu san pham
    products: [
      {
        userId: "",
        nameProduct: "",
        catalog_Id: "",
        price: "",
        discount: "",
        info: "",
        image_link: "",
        createAt: "",
        view: "",
        like: ""
      }
    ]
  };
  componentDidMount() {
    // axios
    //   .get(`${config.baseUrl}/api/product2`)
    //   .then(response => {
    //     let data = response.data;
    //     for (let i = 0; i < data.length; i++) {
    //       this.setState({
    //         products: [
    //           ...this.state.products,
    //           {
    //             // userId: [data[i].user_Id],
    //             // nameProduct: [data[i].name],
    //             // catalog_Id: [data[i].catalog_Id],
    //             // price: [data[i].price],
    //             // discount: [data[i].discount],
    //             // info: [data[i].info],
    //             // image_link: [data[i].image_link],
    //             // createAt: [data[i].createAt],
    //             // view: [data[i].view],
    //             // like: [data[i].like]

    //             userId: data[i].user_Id,
    //             nameProduct: data[i].name,
    //             catalog_Id: data[i].catalog_Id,
    //             price: data[i].price,
    //             discount: data[i].discount,
    //             info: data[i].info,
    //             image_link: data[i].image_link,
    //             createAt: data[i].createAt,
    //             view: data[i].view,
    //             like: data[i].like
    //           }
    //         ]
    //       });
    //     }
    //     this.state.products.shift();
    //     // console.log(this.state.products);
    //   })
    //   .catch(error => console.log(error));
    axios.get(`${config.baseUrl}/api/user`)
      .then(response => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === localStorage.getItem('user')) {
            console.log(data[i].avatarUrl)
            if (data[i].avatarUrl.search('data') === -1 && data[i].avatarUrl !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
              let path = config.baseUrl + '/' + data[i].avatarUrl;
              data[i].avatarUrl = path;
            } else if (data[i].avatarUrl.search('data') !== -1 && data[i].avatarUrl !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
              let path = data[i].avatarUrl;
              data[i].avatarUrl = path;
            } else {
              let path = data[i].avatarUrl;
              data[i].avatarUrl = path;
            }
            this.setState({
              home: 'http://localhost:3000/home',
              users: {
                userId: data[i]._id,
                userName: data[i].username,
                userImage: data[i].avatarUrl
              }
            })
          }
        }
      })
      .catch(error => console.log(error));
    axios
      .get(`${config.baseUrl}/api/product2`)
      .then(response => {
        let data = response.data;
        let tam = [];
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i].user_Id.avatarUrl.search('data'))
          if (data[i].user_Id.avatarUrl.search('data') === -1 && data[i].user_Id.avatarUrl !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
            let path = config.baseUrl + '/' + data[i].user_Id.avatarUrl;
            data[i].user_Id.avatarUrl = path;
          } else if (data[i].user_Id.avatarUrl.search('data') !== -1 && data[i].user_Id.avatarUrl !== 'https://www.malverninternational.com/wp-content/uploads/2016/12/Male-Avatar.png') {
            let path = data[i].user_Id.avatarUrl;
            data[i].user_Id.avatarUrl = path;
          } else {
            let path = data[i].user_Id.avatarUrl;
            data[i].user_Id.avatarUrl = path;
          }

          let a = {
            userId: data[i].user_Id,
            nameProduct: data[i].name,
            catalog_Id: data[i].catalog_Id,
            price: data[i].price,
            discount: data[i].discount,
            info: data[i].info,
            image_link: data[i].image_link,
            createAt: data[i].createAt,
            view: data[i].view,
            like: data[i].like
          };
          tam.push(a);
        }
        this.setState({
          products: [...tam]
        })
        console.log(this.state);
      })
      .catch(error => console.log(error));
  }

  render() {
    const mang = this.state.products;
    mang.reverse();
    const allProduct = mang.map((ArraySP, index) => <Home key={index} ArraySP={ArraySP} />);
    console.log(this.state)
    return (
      <div className="homePage">
        <div className="navbar2">
          <div className="navbar-area">
            <NavBar value={this.state.home}/>
          </div>
        </div>
        <div className="background-home">
          <div className="content-home">
            <div className='product-user'>
              <div className='all-product'>
                {
                  // this.state.products.length > 1 ? <Home ArraySP={this.state.products} /> : ''
                  allProduct
                }
              </div>
              <div className='user'>
                <div className="user-main">
                  <div className="user-main-image">
                    <img src={this.state.users.userImage} alt="anh-User-chinh" />
                  </div>
                  <div className="user-main-Nameuser">
                    <p>{this.state.users.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
