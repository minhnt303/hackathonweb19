import React from 'react';
import '../App.css'
import { Form, Input } from 'reactstrap';
// import axios from 'axios';
// import config from '../config';
import { withRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar2';
// import { Element} from 'react-scroll'
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
                <Form action="/upload" encType="multipart/form-data" method="POST">
                    <Input type="file" name="avatar" />
                    <Input type="submit" value="Upload a file" />
                </Form>
            </div>
        )
    }

    
    
      
      
      
      
    //   render() {
    //     return (
    //       <div>
                
                      
    
    //         <Element
    //           className="element"
    //           id="scroll-container"
    //           style={{
    //             position: "relative",
    //             height: "200px",
    //             overflow: "scroll",
    //             marginBottom: "100px"
    //           }}
    //         >
    //           <Element
    //             name="scroll-container-first-element"
    //             style={{
    //               marginBottom: "200px"
    //             }}
    //           >
    //             first element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside container first
    //             element inside container first element inside containerfirst element
    //             inside container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container first element inside
    //             container first element inside container
    //           </Element>
    //         </Element>
    //       </div>
    //     );
    //   }
}

export default withRouter(CreatePost);

