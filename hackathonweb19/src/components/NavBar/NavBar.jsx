import React from 'react';
import logo from '../../logo.png'
import '../../App.css';
const NavBar = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td className="logotd">
                        <span className="logoName"><img src={logo} alt="weima-logo" className='classLogo' />Weiba</span>
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