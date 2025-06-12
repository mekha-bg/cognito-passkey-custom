import { useState, useEffect } from 'react';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ConfirmEmail from './pages/ConfirmEmail';
import AssociatePasskey from './components/AssociatePasskey';

export default function App() {
  const [screen, setScreen] = useState<'initial' | 'signup' | 'confirm' | 'login' | 'register' | 'dashboard'>('initial');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        if (tokens?.idToken) {
          setEmail(tokens.idToken.payload.email as string);
          setScreen('dashboard');
        }
      } catch {
        setScreen('initial');
      }
    };
    checkSession();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Cognito Passkey Demo</h1>

      {screen === 'initial' && (
        <div>
          <button onClick={() => setScreen('signup')}>Sign Up</button>
          <button onClick={() => setScreen('login')} style={{ marginLeft: 10 }}>Log In</button>
        </div>
      )}

      {screen === 'signup' && (
  <SignUp onSuccess={(email, password, requiresConfirmation) => {
    setEmail(email);
    setPassword(password);
    requiresConfirmation 
      ? setScreen('confirm')
      : setScreen('register');
  }} />
)}

      {screen === 'confirm' && (
        <ConfirmEmail email={email} password={password} onSuccess={() => setScreen('register')} />
      )}

      {screen === 'login' && (
        <SignIn onSuccess={() => setScreen('dashboard')} />
      )}

      {screen === 'register' && (
        <div>
          <p>Register your passkey:</p>
          <AssociatePasskey onSuccess={() => setScreen('dashboard')} />
        </div>
      )}

      {screen === 'dashboard' && (
        <Dashboard email={email} onLogout={() => {
          signOut();
          setScreen('initial');
        }} />
      )}
    </div>
  );
}
