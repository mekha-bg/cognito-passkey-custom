import { useState } from 'react';
import { confirmSignUp, resendSignUpCode, signIn } from 'aws-amplify/auth';

interface Props {
  email: string;
  password: string;
  onSuccess: () => void;
}

export default function ConfirmEmail({ email, password, onSuccess }: Props) {
  const [code, setCode] = useState('');

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      
      await signIn({ 
        username: email, 
        password 
      });
      
      onSuccess();
    } catch (error) {
      console.error('Confirmation failed:', error);
      alert('Invalid verification code');
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });
      alert('New code sent to your email');
    } catch (error) {
      console.error('Resend failed:', error);
    }
  };

  return (
    <form onSubmit={handleConfirm}>
      <h2>Verify Email</h2>
      <input
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={e => setCode(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
      <button type="button" onClick={handleResend}>Resend Code</button>
    </form>
  );
}
