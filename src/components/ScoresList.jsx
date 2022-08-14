import React from "react";
import { Link } from "react-router-dom";

function ScoresList({ users }) {
  const sortedUsers = users.sort((a, b) => b.maxScore - a.maxScore);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.name}>
            <td>
              <Link to={`/highscores/${user.name}`}>{user.name}</Link>
            </td>
            <td>{user.maxScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScoresList;
