import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewScore({ onAddUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddUser({ name, score });
    navigate("/highscores");
  };

  return (
    <form onSubmit={handleSubmit} className="container container--centered">
      <h1 className="m-t-m">Add new score</h1>
      <div className="input">
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          id="name"
          type="text"
          required
        />
      </div>
      <div className="input">
        <label htmlFor="score">Score</label>
        <input
          onChange={(e) => setScore(Number(e.currentTarget.value))}
          value={score}
          id="score"
          type="number"
          min="0"
          required
        />
      </div>
      <button>Save</button>
    </form>
  );
}

export default NewScore;
