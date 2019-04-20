import React from 'react';
import logo from '../../logo.png'
import '../../App.css';
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <img src={logo} alt="weima-logo" className='classLogo' />
                        <span className="logoName">Weiba</span>
                    </td>
                    <td>
                        <div className="user">login register</div>
                    </td>
                </tr>
            </tbody>
        </table>

    )
}

export default NavBar;