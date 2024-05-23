import React, { useState } from "react";

export default function Login() {
  // Signup state variables
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  localStorage.jwt = 'clavejwtsecretaeJEMPLOXD123';

  const handleSignup = async () => {
    const signupData = { name, email: signupEmail, password: signupPassword, age, gender };

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.jwt}`,
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log("Signup successful:", result);
      alert("Signup successful!"); // Alert for successful signup
    } catch (error) {
      console.error("Error:", error);
      alert("Error during signup!"); // Alert for errors
    }
  };
  
  const handleLogin = async () => {
    const loginData = { email: loginEmail, password: loginPassword };
  
    try {
      const response = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to login");
      }
  
      const result = await response.json();
      console.log("Login successful:", result);
      alert("Login successful!"); // Alert for successful login
  
      // Store additional user information in local storage
      localStorage.setItem('token', result.accessToken);
      localStorage.setItem('userId', result.id);

      if (result.roles.includes("ROLE_ADMIN")) { 
        window.location.href = "/AdminDashboard";
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error during login!"); // Alert for errors
    }
  };

  return (
    <div className="container">
      <div className="App">
        <div className="datos-producto"></div>
      </div>

      <div className="card text-center">
        <div className="card-header">Registrarse</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              placeholder="Ingrese su nombre"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email</span>
            <input
              type="email"
              onChange={(event) => setSignupEmail(event.target.value)}
              className="form-control"
              placeholder="Ingrese su email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contraseña</span>
            <input
              type="password"
              onChange={(event) => setSignupPassword(event.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input
              type="number"
              onChange={(event) => setAge(event.target.value)}
              className="form-control"
              placeholder="Ingrese su edad"
              aria-label="Age"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Género</span>
            <input
              type="text"
              onChange={(event) => setGender(event.target.value)}
              className="form-control"
              placeholder="Ingrese su género"
              aria-label="Gender"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-success" onClick={handleSignup}>
            Agregar
          </button>
        </div>
      </div>

      <div className="card text-center mt-5">
        <div className="card-header">Iniciar Sesión</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Email</span>
            <input
              type="email"
              onChange={(event) => setLoginEmail(event.target.value)}
              className="form-control"
              placeholder="Ingrese su email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Contraseña</span>
            <input
              type="password"
              onChange={(event) => setLoginPassword(event.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
