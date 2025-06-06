import PasskeyLogin from "../components/PasskeyLogin";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Cognito Passkey Demo</h1>
      <PasskeyLogin />
    </div>
  );
}
