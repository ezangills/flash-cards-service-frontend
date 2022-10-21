import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'
import Verify from './components/Verify';

const App = () => {
  const [state, setState] = useState('openSignInPage')
  return (
    <div className='page'>
      {state === 'openSignInPage' && <Login openapp={() => setState('openAppPage') /* Here if we get error the state should be set to verify and ask back to send code to email again */ } signup={() => setState('openSignUpPage') } />}
      {state === 'openSignUpPage' && <Signup signin={() => setState('openSignInPage') } verify={() => setState('openVerifyPage') /* Verify page will open only if registration was successful, otherwise show error message */ } />}
      {state === 'openVerifyPage' && <Verify enter={() => setState('openSignInPage') /* Open signin page only on successful verification, otherwise error message */ } />}
    </div>
  );
}

export default App;
