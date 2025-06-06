const PasskeyLogin = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const domain = import.meta.env.VITE_COGNITO_DOMAIN;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    const responseType = "code";
    const scope = "openid profile email";

    if (!clientId || !domain || !redirectUri) {
      console.error("Missing environment variables for Cognito config");
      return;
    }

    const loginUrl = `https://${domain}/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
        borderRadius: "8px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Sign in with Passkey
    </button>
  );
};

export default PasskeyLogin;
