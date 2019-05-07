import React, { Component } from "react";
// import logo from "../../logo.png";
// import { Col } from "reactstrap";
import doticon from "../../doticon.png";
import likelogo from "../../likelogo.png";
import bookmarklogo from "../../bookmarklogo.png";

import "../../App.css";

class Home extends Component {
  render() {
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
                  <img src={likelogo} alt="like" />
                </div>
                <div className="icon-bookmark">
                  <img src={bookmarklogo} alt="bookmark" />
                </div>
              </div>
              <div className="number-like">
                <p>{this.props.ArraySP.like[0]} like</p>
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
