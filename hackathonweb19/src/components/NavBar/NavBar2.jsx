import React from 'react';
import logo from '../../logo.png'
import userlogin from '../../userlogo.png'
import '../../App2.css';
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <img src={logo} alt="weima-logo" className='classLogo' />
                        <span className="logoName">Weima</span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                    <div className="Search">
                        <form className="Search-form">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                        </form>
                    </div>
                    </td>
                         
                    <td style={{textAlign: 'right'}}>
                        <img src={userlogin} alt="weima-userlogo" className='classuserLogo' />
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default NavBar;