
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






// import { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import axios from "../../service/axiosConfigs"; 

// const Reactions = () => {
//   const [reactions, setReactions] = useState([]);

//   useEffect(() => {
//     axios.get("/reactions")
//       .then(response => setReactions(response.data))
//       .catch(error => console.error("Error al cargar reacciones:", error));
//   }, []);

//   const deleteReaction = (id) => {
//     axios.delete(`/reactions/${id}`)
//       .then(() => setReactions(reactions.filter(reaction => reaction.id !== id)))
//       .catch(error => console.error("Error al eliminar reacción:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Reacciones</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Post</th>
//             <th>👍 Likes</th>
//             <th>👎 Dislikes</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reactions.map(reaction => (
//             <tr key={reaction.id}>
//               <td>{reaction.id}</td>
//               <td>{reaction.post}</td>
//               <td>{reaction.likes}</td>
//               <td>{reaction.dislikes}</td>
//               <td>
//                 <Button variant="danger" onClick={() => deleteReaction(reaction.id)}>Eliminar</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Reactions;






// import { useState } from "react";
// import { Button } from "react-bootstrap";
// import axios from "../../service/axiosConfigs";

// import "./Reactions.css";

// const Reactions = () => {
//   const [reactions, setReactions] = useState([
//     { id: 1, name: "Post 1", likes: 10, dislikes: 2 },
//     { id: 2, name: "Post 2", likes: 5, dislikes: 1 },
//   ]);

//   const handleLike = (id) => {
//     setReactions(reactions.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r)));
//   };

//   const handleDislike = (id) => {
//     setReactions(reactions.map((r) => (r.id === id ? { ...r, dislikes: r.dislikes + 1 } : r)));
//   };

//   return (
//     <div className="reactions-container">
//       <h2>Reacciones</h2>
//       <ul className="reaction-list">
//         {reactions.map((reaction) => (
//           <li key={reaction.id}>
//             {reaction.name} - 👍 {reaction.likes} 👎 {reaction.dislikes}
//             <Button variant="success" onClick={() => handleLike(reaction.id)}>Me Gusta</Button>
//             <Button variant="danger" onClick={() => handleDislike(reaction.id)}>No Me Gusta</Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Reactions;





// import { useState } from "react";
// import "./Reactions.css";

// function Reaction({ type, count }) {
//   return (
//     <div className="reaction">
//       <span>{type}</span>
//       <span>{count}</span>
//     </div>
//   );
// }

// function Reactions() {
//   const [reactions, setReactions] = useState([
//     { type: "👍", count: 10 },
//     { type: "❤️", count: 5 },
//     { type: "😂", count: 3 },
//   ]);

//   const addReaction = (type) => {
//     setReactions(
//       reactions.map((reaction) =>
//         reaction.type === type
//           ? { ...reaction, count: reaction.count + 1 }
//           : reaction
//       )
//     );
//   };

//   return (
//     <div className="reactions-container">
//       <h2>Reacciones</h2>
//       {reactions.map((reaction, index) => (
//         <Reaction key={index} {...reaction} />
//       ))}
//       <div className="reaction-buttons">
//         <button onClick={() => addReaction("👍")}>👍</button>
//         <button onClick={() => addReaction("❤️")}>❤️</button>
//         <button onClick={() => addReaction("😂")}>😂</button>
//       </div>
//     </div>
//   );
// }

// export default Reactions;

  