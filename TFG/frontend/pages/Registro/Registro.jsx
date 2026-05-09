import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  const navigate = useNavigate();

  // 👇 AQUÍ VA EL ESTADO DEL FORMULARIO
  // esto lo recibirá userController.js con el ...req.body
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    password: ""
  });

  //coge los datos vacios del useState anterior
  //luego cuando escribas algo en la web, se actualiza con e.target.name y e.target.value
  //y lo guarda en form
  //e.target.name es el nombre del input (nombre, apellidos, correo, telefono, password)
  //e.target.value es el valor que le asignamos a input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      localStorage.setItem("usuario", JSON.stringify(data));
      navigate(`/micuenta/${data._id}`);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input name="nombre" placeholder="Nombre" onChange={handleChange} value={form.nombre} />
          <input name="apellidos" placeholder="Apellidos" onChange={handleChange} value={form.apellidos} />
          <input name="correo" placeholder="Correo" onChange={handleChange} value={form.correo} />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} value={form.telefono} />
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            onChange={handleChange}
            value={form.password}
          />
          <button type="submit">Crear cuenta</button>
        </form>
        <p className="link-text">
          ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;