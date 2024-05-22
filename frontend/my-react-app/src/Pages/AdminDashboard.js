import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleSubmit = async () => {
    const userData = { name, email, password, age, gender};

    try {
      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:3001/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      const result = await response.json();
      console.log("User added successfully:", result);
      alert("User added successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding user!");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:3001/api/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const closeSearchResults = () => {
    setSearchResult("");
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      console.log("User deleted successfully");
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting user!");
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3001/api/users/search/${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to search user");
      }

      const result = await response.json();
      setSearchResult(result[0]);
    } catch (error) {
      console.error("Error:", error);
      alert("Error searching user!");
    }
  };

  const handleUpdate = async () => {
    const updateData = { name, email, password, age, gender};
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const result = await response.json();
      console.log("User updated successfully:", result);
      alert("User updated successfully!");

      setEditingUser(null);
      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? result : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating user!");
    }
  };

  const openEditPopup = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setAge(user.age);
    setGender(user.gender);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container'>
      <div className="App">
        <div className="datos-user">
        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">
          Crear Empleado
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="form-control" placeholder="Ingrese nombre del usuario" aria-label="Nombre" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email</span>
            <input type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="form-control" placeholder="Ingrese email del usuario" aria-label="Email" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="form-control" placeholder="Ingrese password del usuario" aria-label="Password" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
              className="form-control" placeholder="Ingrese edad del usuario" aria-label="Age" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Género</span>
            <select
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
              className="form-control" aria-label="Gender" aria-describedby="basic-addon1">
              <option value="">Seleccione género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editingUser ? <div>
              <button className='btn btn-warning m-2' onClick={handleUpdate}>Actualizar</button>
              <button className='btn btn-info' onClick={() => setEditingUser(null)}>Cancelar</button>
            </div>
              : <button className='btn btn-success' onClick={handleSubmit}>Agregar</button>
          }
        </div>
      </div>
      <h1></h1>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by user name or email" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}> Search </button>
      </div>
      {searchResult && (
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">Detalles Usuario:</h5>
            <p className="card-text">Nombre: {searchResult.name}</p>
            <p className="card-text">Email: {searchResult.email}</p>
            <p className="card-text">Edad: {searchResult.age}</p>
            <p className="card-text">Género: {searchResult.gender}</p>
          <button className="btn btn-secondary" onClick={closeSearchResults}>Close</button>
        </div>
      </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>
                <div className="btn-group" role="group">
                  <button className='btn btn-info' onClick={() => openEditPopup(user)}>Editar</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
