import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [selectedLLMs, setSelectedLLMs] = useState([]);
  const [bestResponse, setBestResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const llms = ["openai", "deepseek", "meta"];

  const handleCheckboxChange = (llm) => {
    setSelectedLLMs((prev) =>
      prev.includes(llm) ? prev.filter((l) => l !== llm) : [...prev, llm]
    );
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || selectedLLMs.length === 0) {
      alert("Please enter a prompt and select at least one LLM.");
      return;
    }

    setLoading(true);
    setBestResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/llm/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, selectedLLMs }),
      });

      const data = await res.json();

      // Logic to pick the best response — using longest one as heuristic
      let best = { llm: "", response: "" };
      for (let [llm, response] of Object.entries(data)) {
        if (
          typeof response === "string" &&
          response.length > best.response.length
        ) {
          best = { llm, response };
        }
      }

      setBestResponse(best);
    } catch (err) {
      console.error("Error:", err);
      alert("Backend failed. Check logs or CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🧠 LLM Aggregator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        rows={5}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      <div style={{ marginTop: "10px" }}>
        {llms.map((llm) => (
          <label key={llm} style={{ marginRight: "15px" }}>
            <input
              type="checkbox"
              checked={selectedLLMs.includes(llm)}
              onChange={() => handleCheckboxChange(llm)}
            />
            {` ${llm.toUpperCase()}`}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Generating..." : "Get Best Response"}
      </button>

      <div style={{ marginTop: "30px" }}>
        {bestResponse && (
          <div
            style={{
              padding: "15px",
              border: "2px solid #4caf50",
              borderRadius: "8px",
              backgroundColor: "#f0fff0",
            }}
          >
            <h3>Best Response from {bestResponse.llm.toUpperCase()}</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{bestResponse.response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
