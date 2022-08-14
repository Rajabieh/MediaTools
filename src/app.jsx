import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ScoresList from "./components/ScoresList";
import NewScore from "./components/NewScore";
import Excel from "./components/Excel";
import dbScores from "./scores";
import dbUsers from "./users";
import UserScores from "./components/UserScores";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = dbUsers.map((user) => {
      const scores = dbScores.filter((score) => score.userId === user._id);
      const scoreNumbers = scores.map((score) => score.score);
      const maxScore = Math.max(...scoreNumbers);

      return { ...user, scores: scoreNumbers, maxScore };
    });

    setUsers(users);
  }, []);

  const handleAddUser = (user) => {
    const existingUser = users.find((u) => u.name === user.name);

    if (existingUser) {
      existingUser.scores.push(user.score);

      if (user.score > existingUser.maxScore)
        existingUser.maxScore = user.score;

      setUsers([...users]);
    } else {
      const scores = [user.score];
      const newUser = { name: user.name, scores, maxScore: user.score };

      setUsers([...users, newUser]);
    }
  };

  const handleImportScores = (excelScores) => {
    const importedUsers = excelScores.reduce((importedUsers, scoreObject) => {
      const existingUser = importedUsers.find(
        (u) => u.name === scoreObject.name
      );

      if (existingUser) {
        existingUser.scores.push(scoreObject.score);

        if (scoreObject.score > existingUser.maxScore)
          existingUser.maxScore = scoreObject.score;
      } else {
        const user = {
          name: scoreObject.name,
          maxScore: scoreObject.score,
          scores: [scoreObject.score],
        };
        importedUsers.push(user);
      }

      return importedUsers;
    }, users);

    setUsers(importedUsers);
  };

  const linkStyles = { display: "block", marginTop: 16 };

  return (
    <div className="container container--centered">
      <h1 className="m-t">Mediatool exercise</h1>
      <Link style={linkStyles} to="highscores">
        See highscores
      </Link>
      <Link style={linkStyles} to="new-score">
        Add new score
      </Link>
      <Link style={linkStyles} to="excel">
        Excel assignment
      </Link>
      <Routes>
        <Route
          path="highscores/:userName"
          element={<UserScores users={users} />}
        />
        <Route path="highscores" element={<ScoresList users={users} />} />
        <Route
          path="new-score"
          element={<NewScore onAddUser={handleAddUser} />}
        />
        <Route
          path="excel"
          element={<Excel onImportUsers={handleImportScores} />}
        />
      </Routes>
    </div>
  );
}

export default App;
