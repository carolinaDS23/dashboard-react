import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import postService from "../../service/Post.service";
import "./Comments.css";
import commentService from "../../service/Comment.service";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [show, setShow] = useState(false);
  const [idPost, setIdPost] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  
  // Extraemos el parámetro de la ruta
  const { id: routeIdPost } = useParams();

  // Cuando el parámetro de la ruta cambie, se actualiza el estado idPost
  useEffect(() => {
    if (routeIdPost) {
      setIdPost(routeIdPost);
    }
  }, [routeIdPost]);

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

  const listComments = () => {
    const sizePage = 5;
    commentService.getComments(pageCurrent, sizePage, "desc", idPost)
      .then(response => {
        if (response.success) {
          const { comments, totalRecords } = response.data;
          setComments(comments);
          let calculateTotalPages = Math.ceil(totalRecords / sizePage);
          setTotalPages(calculateTotalPages);
        } else {
          alert(response.message);
          console.error(response.message);
        }
      })
      .catch(error => {
        console.error("Error al cargar comentario:", error);
        alert("Error al cargar comentario");
      });
  };


  useEffect(() => {
    if (idPost) {
      listComments();
    }
  }, [pageCurrent, idPost]);

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

  const activateComment = (id) => {
    commentService.activateComment(id)
      .then(() => listComments())
      .catch(error => console.error("Error al activar el Comment:", error));
  };

  const deleteComment = (id) => {
    commentService.deleteComment(id)
      .then(() => listComments())
      .catch(error => console.error("Error al eliminar el comentario:", error));
  };

  const blockComment = (id) => {
    commentService.blockComment(id)
      .then(() => listComments())
      .catch(error => console.error("Error al bloquear el comentario:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Comentarios</h2>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Comentario</th>
            <th>Fecha de subida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.idComment}>
              <td>{comment.idComment}</td>
              <td>{comment.userName}</td>
              <td>{comment.text}</td>
              <td>{comment.registrationDate}</td>
              <td>{getStatusText(comment.entityStatus)}</td>
              <td>
                <Button variant="warning" onClick={() => activateComment(comment.idComment)}>
                  Activar
                </Button>
                <Button variant="danger" onClick={() => blockComment(comment.idComment)}>
                  Bloquear
                </Button>
                <Button variant="danger" onClick={() => deleteComment(comment.idComment)}>
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
    </div>
  );
};

export default Comments;
