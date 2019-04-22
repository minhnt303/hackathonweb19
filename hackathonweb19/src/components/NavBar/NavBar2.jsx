import React from 'react';
import logo from '../../logo.png'
import userlogin from '../../userlogo.png'
import '../../App.css';
import { Input } from 'reactstrap';
// import { IoIosSearch } from "react-icons/io";
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr className="NavBar2">
                    <td className="logotd">
                        <span className="logoName"><img src={logo} alt="weima-logo" className='classLogo' />Weima</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <div className="Search">
                            <form className="Search-form">
                                <Input className="search" type="search" placeholder="Tìm kiếm" aria-label="Search" style={{backgroundColor:"#fafafa"}}/>
                            </form>
                        </div>
                    </td>

                    <td style={{ textAlign: 'right', paddingBottom: '10px' }}>
                        <img src={userlogin} alt="weima-userlogo" className='classuserLogo' />
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default NavBar;