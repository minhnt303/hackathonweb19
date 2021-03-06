import React, { Component } from "react";
// import logo from "../../logo.png";
// import { Col } from "reactstrap";
import doticon from "../../doticon.png";
// import likelogo from "../../likelogo.png";
import bookmarklogo from "../../bookmarklogo.png";
import HeartLogo from '../../heartlogo.png'
import HeartLogoClick from '../../heartlogoclick.png'
import axios from "axios";
import config from "../../config";
import { Button } from 'reactstrap';
import "../../App.css";

class Home extends Component {
  state = {
    likeclicked: this.props.ArraySP.likeclicked,
    userid:''
  }
  like() {
    axios.get(`${config.baseUrl}/like/${this.props.ArraySP.id}/${this.props.ArraySP.userLoginId}`).then(response => { console.log(response) }).catch((error) => {
      console.log(error);
    });
    this.props.ArraySP.likeclicked = true;
    this.setState({
      likeclicked: !this.state.likeclicked,
    })
  }

  dislike() {
    axios.get(`${config.baseUrl}/dislike/${this.props.ArraySP.id}/${this.props.ArraySP.userLoginId}`).then(response => { console.log(response) }).catch((error) => {
      console.log(error);
    });
    this.props.ArraySP.likeclicked = false;
    this.setState({
      likeclicked: !this.state.likeclicked,
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className='product'>
        <div className="content-product">
          <div className="user-home">
            <div className="user-image">
              <img src={this.props.ArraySP.userId.avatarUrl} alt="anh-User" />
            </div>
            <div className="user-Nameuser">
              <p>{this.props.ArraySP.userId.username}</p>
            </div>
            <div className="dotionLogo">
              <img src={doticon} alt="weima-doticon" />
            </div>
          </div>
          <div className="img-product">
            <img src={this.props.ArraySP.image_link} alt="" />
          </div>
          <div className="info-product">
            <div className="infoProduct-icon">
              <div className="icon-like">
                {this.props.ArraySP.likeclicked ?
                  <Button onClick={() => this.dislike()} className='dis-like-click' style={{ borderColor: ' white', backgroundColor: 'white', padding: '0px' }}>
                    <img src={HeartLogoClick}
                      alt='heartlogoclick'
                      style={{ height: '40 px', width: '40px' }} />
                  </Button>
                  :
                  <Button onClick={() => this.like()} className='like-click' style={{ borderColor: ' white', backgroundColor: 'white', padding: '0px' }}>
                    <img src={HeartLogo}
                      alt='heartlogo'
                      style={{ height: '40 px', width: '40px' }} />
                  </Button>
                }
                {/* <img src={likelogo} alt="like" /> */}
              </div>
              <div className="icon-bookmark">
                <img src={bookmarklogo} alt="bookmark" />
              </div>
            </div>
            <div className="number-like">
              <p>{this.props.ArraySP.like.length} like</p>
            </div>
            <div className="description">
              <p className="title-productname">
                {this.props.ArraySP.nameProduct}
              </p>
              <p className="title-productname">
                {this.props.ArraySP.price} <u>đ</u>
              </p>
              <p>
                {this.props.ArraySP.info}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
