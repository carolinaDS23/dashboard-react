
import { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const Posts = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Primer Post", content: "Este es el primer post." },
    { id: 2, title: "Segundo Post", content: "Este es el segundo post." },
    { id: 3, title: "Segundo Post", content: "Este es el segundo post." },
    { id: 4, title: "Segundo Post", content: "Este es el segundo post." },
    { id: 5, title: "Segundo Post", content: "Este es el segundo post." },

  ]);

  const [show, setShow] = useState(false);
  const [currentPost, setCurrentPost] = useState({ id: "", title: "", content: "" });

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    setCurrentPost(post);
    setShow(true);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Publicaciones</h2>
      <Button variant="primary" onClick={() => handleShow({ id: "", title: "", content: "" })}>
        Agregar Post
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Contenido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(post)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(post.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPost.id ? "Editar Post" : "Agregar Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                as="textarea"
                value={currentPost.content}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleClose}>
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Posts;





// import { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import axios from "../../service/axiosConfigs";  


// const Posts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get("/posts")
//       .then(response => setPosts(response.data))
//       .catch(error => console.error("Error al cargar posteos:", error));
//   }, []);

//   const deletePost = (id) => {
//     axios.delete(`/posts/${id}`)
//       .then(() => setPosts(posts.filter(post => post.id !== id)))
//       .catch(error => console.error("Error al eliminar post:", error));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Posteos</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Título</th>
//             <th>Contenido</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map(post => (
//             <tr key={post.id}>
//               <td>{post.id}</td>
//               <td>{post.title}</td>
//               <td>{post.content}</td>
//               <td>
//                 <Button variant="danger" onClick={() => deletePost(post.id)}>Eliminar</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Posts;





// import { useState } from "react";
// import { Table, Button, Form } from "react-bootstrap";
// import axios from "../../service/axiosConfigs";


// import "./Posts.css";

// const Posts = () => {
//   const [posts, setPosts] = useState([
//     { id: 1, title: "Primer post", content: "Este es un contenido de prueba." },
//     { id: 2, title: "Segundo post", content: "Otro contenido de ejemplo." },
//   ]);

//   const [newPost, setNewPost] = useState({ title: "", content: "" });

//   const handleChange = (e) => {
//     setNewPost({ ...newPost, [e.target.name]: e.target.value });
//   };

//   const addPost = () => {
//     if (newPost.title && newPost.content) {
//       setPosts([...posts, { id: posts.length + 1, ...newPost }]);
//       setNewPost({ title: "", content: "" });
//     }
//   };

//   return (
//     <div className="posts-container">
//       <h2>Posts</h2>
//       <Form className="post-form">
//         <Form.Group>
//           <Form.Control type="text" placeholder="Título" name="title" value={newPost.title} onChange={handleChange} />
//         </Form.Group>
//         <Form.Group>
//           <Form.Control as="textarea" placeholder="Contenido" name="content" value={newPost.content} onChange={handleChange} />
//         </Form.Group>
//         <Button onClick={addPost}>Agregar Post</Button>
//       </Form>

//       <Table striped bordered hover className="post-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Título</th>
//             <th>Contenido</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post.id}>
//               <td>{post.id}</td>
//               <td>{post.title}</td>
//               <td>{post.content}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default Posts;




// import { useState, useEffect } from "react";
// import "./Posts.css";

// function Post({ title, content }) {
//   return (
//     <div className="post">
//       <h3>{title}</h3>
//       <p>{content}</p>
//     </div>
//   );
// }

// function Posts() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Simular la obtención de datos de una API
//     const fetchedPosts = [
//       { title: "Primer Post", content: "Este es el contenido del primer post." },
//       { title: "Segundo Post", content: "Este es el contenido del segundo post." },
//     ];
//     setPosts(fetchedPosts);
//   }, []);

//   return (
//     <div className="posts-container">
//       <h2>Posts</h2>
//       {posts.length > 0 ? (
//         posts.map((post, index) => <Post key={index} {...post} />)
//       ) : (
//         <p>Aquí irán los posts de los usuarios.</p>
//       )}
//     </div>
//   );
// }

// export default Posts;

  