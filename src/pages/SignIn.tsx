import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';

interface Props {
  onSuccess: () => void;
}

export default function SignIn({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { nextStep } = await signIn({
        username: email,
        password
      });

      if (nextStep.signInStep === 'DONE') {
        onSuccess();
      } else {
        setError('Additional authentication required.');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('Password authentication failed. Please try again.');
    }
  };

  const handlePasskeySignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { nextStep } = await signIn({
        username: email,
        options: {
          authFlowType: 'USER_AUTH',
          preferredChallenge: 'WEB_AUTHN'
        }
      });

      if (nextStep.signInStep === 'DONE') {
        onSuccess();
      } else {
        setError('Passkey authentication not completed.');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      setError('Passkey authentication failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handlePasswordSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In with Password</button>
      </form>
      <form onSubmit={handlePasskeySignIn} style={{ marginTop: 16 }}>
        <button type="submit" disabled={!email}>
          Sign In with Passkey
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
}
