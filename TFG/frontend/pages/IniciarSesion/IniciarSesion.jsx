import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMessage(data.message || "Usuario o contraseña incorrecta");
      return;
    }

    console.log("Usuario logueado:", data);
    localStorage.setItem("usuario", JSON.stringify(data.user));
    navigate(`/micuenta/${data.user._id}`);
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="correo"
            placeholder="Correo"
            onChange={handleChange}
            value={form.correo}
          />

          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            onChange={handleChange}
            value={form.password}
          />

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;