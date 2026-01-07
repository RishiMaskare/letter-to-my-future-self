import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HERO */}
      <div className="home-card">
        <h1>Dear Future Me</h1>

        <p className="home-subtitle">
          A quiet place to leave words for the person you’re becoming.
        </p>

        <p className="home-desc">
          Write a letter meant only for your future self — a reminder,
          a promise, a feeling you don’t want to lose.
          <br />
          We’ll deliver it to you on the day you choose.
        </p>

        <div className="home-features">
          <p>✍️ Write without judgment</p>
          <p>⏳ Choose the moment it arrives</p>
          <p>💌 Delivered privately to your inbox</p>
          <p>🔒 Stored with care & respect</p>
        </div>

        <button onClick={() => navigate("/write")}>
          ✉️ Write a Letter
        </button>
      </div>

      {/* DIVIDER */}
      <div className="divider" />

      {/* WHISPERS SECTION */}
      <div className="whispers">
        <h2>Whispers Across Time</h2>
        <p className="whispers-subtitle">
          Anonymous thoughts once written, now gently echoing.
        </p>

        <div className="whisper-cards">
          <div className="whisper">
            <p className="whisper-text">
              “I hope you finally stopped being so hard on yourself.
              You were always doing your best.”
            </p>
            <span>— A student</span>
          </div>

          <div className="whisper">
            <p className="whisper-text">
              “If you’re reading this, it means you made it.
              I knew you would.”
            </p>
            <span>— Someone who believed</span>
          </div>

          <div className="whisper">
            <p className="whisper-text">
              “Please don’t forget what made you feel alive.
              Go back to it.”
            </p>
            <span>— Anonymous</span>
          </div>

          <div className="whisper">
            <p className="whisper-text">
              “You don’t need to have everything figured out.
              Just don’t stop becoming.”
            </p>
            <span>— A quiet reminder</span>
          </div>

          <div className="whisper">
            <p className="whisper-text">
              “Some days surviving was enough.
              And that was brave too.”
            </p>
            <span>— Someone still learning</span>
          </div>

          <div className="whisper">
            <p className="whisper-text">
              “Even if you changed, I hope you didn’t lose
              the softness that once kept you human.”
            </p>
            <span>— An honest note</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
