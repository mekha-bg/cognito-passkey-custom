import LogoutButton from '../components/LogoutButton';
import AssociatePasskey from '../components/AssociatePasskey';
interface Props {
  email: string;
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: Props) {
  
  return (
    <div>
      <h2>Welcome back, user!</h2>
      <p>You're successfully authenticated</p>
      <AssociatePasskey onSuccess={() => alert('Passkey registered!')} />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}
