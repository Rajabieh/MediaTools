import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserScores({ users }) {
  const [user, setUser] = useState(null);
  const { userName } = useParams();

  useEffect(() => {
    const user = users.find((u) => u.name === userName);
    setUser(user);
  }, [userName, users]);

  const sortedScores = user?.scores.sort((a, b) => b - a);

  return (
    <div>
      <h1>User Scores</h1>
      <p>{user?.name}</p>
      {sortedScores?.map((score, i) => (
        <p key={i}>{score}</p>
      ))}
    </div>
  );
}

export default UserScores;
