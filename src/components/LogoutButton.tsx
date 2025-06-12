interface Props {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: Props) {
  return (
    <button onClick={onLogout}>
      Log Out
    </button>
  );
}