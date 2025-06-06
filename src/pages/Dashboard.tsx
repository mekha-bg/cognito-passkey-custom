import { useEffect, useState } from "react";

const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const domain = import.meta.env.VITE_COGNITO_DOMAIN;

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const savedToken = localStorage.getItem("id_token");
    if (savedToken) {
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setUserInfo(payload);
        console.log("User info (from stored token):", payload);
        return;
      } catch (err) {
        console.error("Failed to decode saved token, clearing localStorage.", err);
        localStorage.removeItem("id_token");
      }
    }

    if (!code) return;

    // clean up URL so code isnt reused on refresh
    window.history.replaceState({}, document.title, window.location.pathname);

    const fetchTokens = async () => {
      try {
        const body = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          redirect_uri: redirectUri,
          code,
        });

        const response = await fetch(`https://${domain}/oauth2/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        });

        const tokens = await response.json();

        if (response.ok && tokens.id_token) {
          localStorage.setItem("id_token", tokens.id_token);
          const payload = JSON.parse(atob(tokens.id_token.split(".")[1]));
          setUserInfo(payload);
        } else {
          console.error("Token exchange failed:", tokens);
        }
      } catch (err) {
        console.error("Exception during token fetch:", err);
      }
    };

    fetchTokens();
  }, []);

const logoutUri = import.meta.env.VITE_LOGOUT_URI;
  const handleLogout = () => {
  localStorage.removeItem("id_token");
  const logoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  window.location.href = logoutUrl;
};

 return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {userInfo ? (
        <>
          <h2>Welcome!</h2>
          <p>You're logged in successfully.</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              borderRadius: "6px",
              backgroundColor: "#d9534f",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
