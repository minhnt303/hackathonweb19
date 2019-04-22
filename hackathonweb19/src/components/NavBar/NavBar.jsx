import React from 'react';
import logo from '../../logo.png'
import '../../App.css';
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr className="NavBar">
                    <td className="logotd">
                        <span className="logoName"><img src={logo} alt="weima-logo" className='classLogo' />Weima</span>
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