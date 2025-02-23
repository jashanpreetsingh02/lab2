import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFact, logout } from "../api/api";

const ChuckNorris = ({ token, setToken }) => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getFact = useCallback(async () => {
    try {
      setLoading(true);
      const newFact = await fetchFact(token);
      
      if (typeof newFact === "string") {
        setFact(newFact);
        setError(null);
      } else {
        setError("Failed to load fact.");
      }
      
      setLoading(false);
    } catch (error) {
      setError("An error occurred.");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getFact();
    const interval = setInterval(getFact, 10000);
    return () => clearInterval(interval);
  }, [getFact]);

  const handleLogout = async () => {
    await logout(token);
    setToken(null);
    navigate("/");
  };

  return (
    <div style={styles.page}>
      {/* Background Overlay to Improve Text Visibility */}
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.heading}> Chuck Norris Fact </h2>
        {loading ? (
          <div style={styles.loader}></div>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <p style={styles.factText}>{fact}</p>
        )}
        <button
          style={styles.newFactButton}
          onClick={getFact}
          onMouseOver={(e) => (e.target.style.boxShadow = "0 0 15px rgba(255, 193, 7, 0.6)")}
          onMouseOut={(e) => (e.target.style.boxShadow = "none")}
        >
          Get New Fact
        </button>
        <button
          style={styles.button}
          onClick={handleLogout}
          onMouseOver={(e) => (e.target.style.boxShadow = "0 0 15px rgba(255, 69, 58, 0.6)")}
          onMouseOut={(e) => (e.target.style.boxShadow = "none")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundImage: "url('/image.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.35)", 
    zIndex: "-1",
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    padding: "45px",
    borderRadius: "18px",
    textAlign: "center",
    width: "500px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(20px)", 
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  heading: {
    color: "white",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    letterSpacing: "1px",
    textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)", 
  },
  factText: {
    color: "white",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "1.7",
    marginBottom: "25px",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", 
  },
  error: {
    color: "red",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  loader: {
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTop: "5px solid #ffd700",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  },
  button: {
    background: "linear-gradient(to right, #ff3b3b, #ff6347)",
    color: "white",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    border: "none",
    fontSize: "17px",
    fontWeight: "500",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.3), inset 2px 2px 4px rgba(0,0,0,0.3)",
  },
  newFactButton: {
    background: "linear-gradient(to right, #ffd700, #ffdd57)", 
    color: "#333", 
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    border: "none",
    fontSize: "17px",
    fontWeight: "500",
    marginBottom: "12px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "inset -2px -2px 4px rgba(255,255,255,0.3), inset 2px 2px 4px rgba(0,0,0,0.3)",
  },
};

// Adding animations
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);

export default ChuckNorris;
