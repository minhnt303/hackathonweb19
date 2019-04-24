import React from 'react';
import '../App.css'
import { Container} from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';
// import FileBase64 from 'react-file-base64';

class CreatePost extends React.Component {
    state = {

    };
    
    render() {
        return (
            <div className=''>
                <div className="navbar2">
                    <div className="navbar-area">
                        <NavBar />
                    </div>
                </div>
                <Container>
                    
            <div>jhdudfsdifjidjfi</div>
                </Container>
            </div>
        )
    }

}

export default withRouter(CreatePost);

