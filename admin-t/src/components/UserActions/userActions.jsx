import { activateUser, blockUser } from "../../service/userService";

const UserActions = ({ user, onUserUpdated }) => {
  const handleActivateUser = async () => {
    const response = await activateUser(user.id);
    if (response.success) {
      alert(response.message);
      onUserUpdated(); // 🔄 Refrescar la lista de usuarios
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  const handleBlockUser = async () => {
    const response = await blockUser(user.id);
    if (response.success) {
      alert(response.message);
      onUserUpdated(); // 🔄 Refrescar la lista de usuarios
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleActivateUser} disabled={user.status === "Active"}>
        Activar
      </button>
      <button onClick={handleBlockUser} disabled={user.status === "Blocked"}>
        Bloquear
      </button>
    </div>
  );
};

export default UserActions;
