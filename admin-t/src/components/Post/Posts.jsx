import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import postService from "../../service/Post.service";
import { ModalPost } from "../ModalPost/ModalPost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [idPost, setIdPost] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Eliminado";
      case 1:
        return "Activado";
      case 2:
        return "Bloqueado";
      default:
        return "Desconocido";
    }
  };


  const listPosts = () => {
    const sizePage = 2;
    postService.getPosts(pageCurrent, sizePage, "desc")
      .then(response => {
        if (response.success) {
          const { posts, totalRecords } = response.data; 
          setPosts(posts);
          let calculateTotalPages = Math.ceil(totalRecords / sizePage);
          setTotalPages(calculateTotalPages);
        } else {
          alert(response.message)
          console.error(response.message);
        }

      })
      .catch(error => {
        console.error("Error al cargar posteos:", error);
        alert("Error al cargar posteos");
      });
  };

  useEffect(() => {
    listPosts();
  }, [pageCurrent]);

  const nextPage = () => {
    if (pageCurrent < totalPages) {
      setPageCurrent(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageCurrent > 1) {
      setPageCurrent(prev => prev - 1);
    }
  };

  const activatePost = (id) => {
    postService.activatePost(id)
      .then(() => listPosts())
      .catch(error => console.error("Error al activar el post:", error));
  };

  const deletePost = (id) => {
    postService.deletePost(id)
      .then(() => listPosts())
      .catch(error => console.error("Error al eliminar el post:", error));
  };

  const blockPost = (id) => {
    postService.blockPost(id)
      .then(() => listPosts())
      .catch(error => console.error("Error al bloquear el post:", error));
  };

  const handleShow = (id) => {
    setShow(true);
    setIdPost(id);
  };

  return (
    <div className="container mt-4">
      <h2>Publicaciones de usuarios</h2>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Descripción</th>
            <th>Fecha de subida</th>
            <th>"Me gusta 1"</th>
            <th>"No me gusta 2"</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.idPost}>
              <td>{post.idPost}</td>
              <td>{post.nameUser} {post.lastNameUser}</td>
              <td>{post.description}</td>
              <td>{post.registrationDateTime}</td>
              <td>{post.reactions?.[0]?.count || 0}</td>
              <td>{post.reactions?.[1]?.count || 0}</td>
              <td>{getStatusText(post.entityStatus)}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(post.idPost)}>
                  Ver
                </Button>
                <Button variant="warning" onClick={() => activatePost(post.idPost)}>
                  Activar
                </Button>
                <Button variant="danger" onClick={() => blockPost(post.idPost)}>
                  Bloquear
                </Button>
                <Button variant="warning" onClick={() => handleShow(post.idPost)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => deletePost(post.idPost)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={prevPage} disabled={pageCurrent === 1}>
          Anterior
        </Button>
        <span>Página {pageCurrent} de {totalPages}</span>
        <Button variant="secondary" onClick={nextPage} disabled={pageCurrent === totalPages}>
          Siguiente
        </Button>
      </div>

      <ModalPost
        show={show}
        handleClose={() => setShow(false)}
        idPost={idPost}
      />
    </div>
  );
};

export default Posts;
