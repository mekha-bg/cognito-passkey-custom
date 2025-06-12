import { associateWebAuthnCredential } from 'aws-amplify/auth';

interface Props {
  onSuccess: () => void;
}

export default function AssociatePasskey({ onSuccess }: Props) {
  const handleClick = async () => {
    try {
      await associateWebAuthnCredential();
      onSuccess();
    } catch (error) {
      console.error('Passkey registration failed:', error);
      alert('Failed to register passkey');
    }
  };

  return (
    <button onClick={handleClick}>
      Register Passkey
    </button>
  );
}
