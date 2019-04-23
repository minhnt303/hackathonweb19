// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import Login from './page/Login';
import Register from './page/Register';
import UserProfile from './page/UserProfile';
import CreatePost from './page/CreatePost';
import EditProfile from './page/EditProfile';
import PasswordChange from './page/PasswordChange'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' exact={true} render={() => {
            return (
              <Redirect to='/login' />
            )
          }} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/createpost' component={CreatePost} />
          <Route path='/profile' component={UserProfile} />
          <Route path='/editprofile' component={EditProfile} />
          <Route path='/password/change' component={PasswordChange} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
