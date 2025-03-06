
import { useState } from "react";
import { Button, Table } from "react-bootstrap";

const Reactions = () => {
  const [reactions, setReactions] = useState([
    { id: 1, post: "Post 1", likes: 10, dislikes: 2 },
    { id: 2, post: "Post 2", likes: 5, dislikes: 1 },
  ]);

  const handleDelete = (id) => {
    setReactions(reactions.filter((r) => r.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Reacciones</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reactions.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.post}</td>
              <td>{r.likes}</td>
              <td>{r.dislikes}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(r.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reactions;






