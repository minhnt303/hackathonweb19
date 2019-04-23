import React from 'react';
import logo from '../../logo.png'
import portlogo from '../../portlogo.png'
import userlogo from '../../userlogo.png'
import '../../App.css';
import { Input } from 'reactstrap';
// import { IoIosSearch } from "react-icons/io";
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr className="NavBar2">
                    <td className="logotd">
                        <a href='http://localhost:3000' className='homepagelink'>
                            <span className="logoName"><img src={logo} alt="weima-logo" className='classLogo' />Weima</span>
                        </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <div className="Search">
                            <form className="Search-form">
                                <Input className="search" type="search" placeholder="Tìm kiếm" aria-label="Search" style={{ backgroundColor: "#fafafa" }} />
                            </form>
                        </div>
                    </td>

                    <td style={{ textAlign: 'right', paddingBottom: '10px' }}>
                        <a href="http://localhost:3000/createpost"><img src={portlogo} alt="weima-userlogo" className='classuserLogo' /></a>
                        <a href="http://localhost:3000/profile"><img src={userlogo} alt="weima-userlogo" className='classuserLogo' style={{ marginLeft: "20px" }} /></a>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default NavBar;