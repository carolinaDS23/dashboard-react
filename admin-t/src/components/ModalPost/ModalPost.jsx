import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import postService from "../../service/Post.service";

export const ModalPost = ({ show, handleClose, idPost }) => {
  const [post, setPost] = useState({
    idPost: "",
    description: "",
    registrationDateTime: "",
    idUser: "",
    nameUser: "",
    lastNameUser: "",
    path: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (idPost) {
      getById(idPost);
    } else {

      setPost({
        idPost: "",
        description: "",
        registrationDateTime: "",
        idUser: "",
        nameUser: "",
        lastNameUser: "",
        path: ""
      });
    }
  }, [idPost, show]);

  const getById = (id) => {
    postService.getPostById(id)
      .then(response => {
        setPost(response);
        console.log(response);
      })
      .catch(error => console.error("Error al cargar el post:", error));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const updatePost = () => {
    const formData = new FormData();
    formData.append("description", post.description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    console.log("Enviando datos al back:", {
      description: post.description,
      image: selectedFile
    });

    postService.updatePost(post.idPost, formData)
      .then(response => {
        alert(response.message);
        handleClose(); 
      })
      .catch(error => console.error("Error al actualizar el post:", error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{idPost ? "Editar Post" : "Agregar Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuario: {post.nameUser + " " + post.lastNameUser}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              value={post.description}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
            />
          </Form.Group>
          {post.path && (
            <img 
              src={`http://localhost:5296${post.path}`} 
              alt="Imagen del posteo" 
              style={{ width: "100%", marginBottom: "10px" }}
            />
          )}
          <Form.Group className="mb-3">
            <Form.Label>Subir imagen:</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={updatePost}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
