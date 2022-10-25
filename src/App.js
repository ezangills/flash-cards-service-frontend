import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'
import Verify from './components/Verify';

const App = () => {
  const [state, setState] = useState({name: 'openSignInPage', message: ''})

  const useOpenApp = (success, responseBody) => {
    if (success === 200) {
      setState({name: 'openAppPage', message: ''})
    } else if (success === 401) {
      setState({name: 'openSignInPage', message: 'No user matching that username and password combination'})
    }
  }

  const signup = () => {
    setState({name: 'openSignUpPage', message: ''})
  }

  const signin = () => {
    setState({name: 'openSignInPage', message: ''})
  }

  const verify = () => {
    setState({name: 'openVerifyPage', message: ''})
    /* Verify page will open only if registration was successful, otherwise show error message */ 
  }

  const postVerifySignin = () => {
    setState({name: 'openSignInPage', message: ''}) 
    /* Open signin page only on successful verification, otherwise error message */
  }

  return (
    <div className='page'>
      {state.name === 'openSignInPage' && <Login errorMessage={state.message} openapp={useOpenApp} signup={signup} />}
      {state.name === 'openSignUpPage' && <Signup signin={signin} verify={verify} />}
      {state.name === 'openVerifyPage' && <Verify enter={postVerifySignin} />}
    </div>
  );
}

export default App;
