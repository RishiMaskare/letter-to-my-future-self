import "./writeLetter.css";
import { useState } from "react";
import axios from "axios";

function WriteLetter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    letter: "",
    sendDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        import.meta.env.VITE_APP_URL + "/api/letters",
        formData
      );
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>✉️ A Letter to My Future Self</h2>
        <p className="subtitle">
          Write something today that your future self will read.
        </p>

        {submitted ? (
          <div className="confirmation">
            <p>
              💌 Your letter has been locked and will be delivered to
              <br />
              <strong>{formData.email}</strong>
            </p>

            <p>📅 Delivery Date: {formData.sendDate}</p>

            <div className="trust">
              🔒 Private & secure <br />
              📬 Delivered via email <br />
              🚫 No spam. Ever.
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  letter: "",
                  sendDate: "",
                });
              }}
            >
              ✍️ Write Another Letter
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="letter"
              placeholder="Write your letter..."
              value={formData.letter}
              onChange={handleChange}
              required
            />

            <label>Date to send this letter:</label>
            <input
              type="date"
              name="sendDate"
              value={formData.sendDate}
              onChange={handleChange}
              min={today}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "🔒 Lock this Letter"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default WriteLetter;
