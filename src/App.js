import Login from './components/Login';
import Signup from './components/Signup';
import Decks from './components/Decks';
import { useState, useEffect } from 'react'
import Verify from './components/Verify';
import { useCookies } from "react-cookie";
import axios from 'axios';

const App = () => {
  const [state, setState] = useState({name: 'openSignInPage', message: '', isError: false})
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.refreshToken != null) {
      axios.post('http://localhost:8080/api/auth/refreshtoken', {
          refreshToken: cookies.refreshToken
        }).then(res => {
          setCookie('jwtToken', res.data.token, {
            path: "/"
          })
          setCookie('refreshToken', res.data.refreshToken, {
            path: "/"
          })
          setState({name: 'openAppPage', message: '', isError: false})
        }).catch(error => {
          setState({name: 'openSignInPage', message: '', isError: false})
        })
    }
  })

  const useOpenApp = (statusCode, responseBody) => {
    if (statusCode === 200) {
      setCookie('jwtToken', responseBody.token, {
        path: "/"
      })
      setCookie('refreshToken', responseBody.refreshToken, {
        path: "/"
      })
      setState({name: 'openAppPage', message: '', isError: false})
    } else if (statusCode === 401) {
      setState({name: 'openSignInPage', message: 'No user matching that username and password combination', isError: true})
    } else {
      setState({name: 'openSignInPage', message: 'Something went wrong, try again', isError: true})
    }
  }

  const signup = () => {
    setState({name: 'openSignUpPage', message: '', isError: false})
  }

  const signin = () => {
    setState({name: 'openSignInPage', message: '', isError: false})
  }

  const verify = (statusCode, responseBody, email, errorMessage) => {
    if (statusCode === 200) {
      setState({name: 'openVerifyPage', message: errorMessage, isError: false})
      setCookie('email', email, {
        path: "/"
      })
    } else {
      setState({name: 'openSignUpPage', message: responseBody.message, isError: true})
    }
  }

  const postVerifySignin = () => {
    setState({name: 'openSignInPage', message: 'Account verified!', isError: false}) 
    /* Open signin page only on successful verification, otherwise error message */
  }

  return (
    <div className='page'>
      {state.name === 'openSignInPage' && <Login errorMessage={state.message} isError={state.isError} openapp={useOpenApp} signup={signup} />}
      {state.name === 'openAppPage' && <Decks></Decks> }
      {state.name === 'openSignUpPage' && <Signup signin={signin} verify={verify} errorMessage={state.message} />}
      {state.name === 'openVerifyPage' && <Verify enter={postVerifySignin} reopenverify={verify} errorMessage={state.message} email={cookies.email} />}
    </div>
  );
}

export default App;
