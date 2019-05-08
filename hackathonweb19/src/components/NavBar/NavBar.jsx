import React from 'react';
import logo from '../../logo.png'
import '../../App.css';
const NavBar = (props) => {
    console.log(props)
    return (
        <table>
            <tbody>
                <tr className="NavBar">
                    <td className="logotd">
                        <a href={props.value} className='homepagelink' >
                            <span className="logoName"><img src={logo} alt="weima-logo" className='classLogo' />Weima</span>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table >
    )
}

export default NavBar;