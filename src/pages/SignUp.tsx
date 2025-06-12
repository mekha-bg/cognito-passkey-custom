import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

interface Props {
  onSuccess: (email: string, password: string, requiresConfirmation: boolean) => void;
}

export default function SignUp({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email },
          autoSignIn: { enabled: false }
        }
      });

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        onSuccess(email, password, true);
      } else if (nextStep.signUpStep === 'DONE') {
        onSuccess(email, password, false);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}
