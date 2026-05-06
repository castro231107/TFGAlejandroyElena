import { useState } from "react";

const Registro = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data);

      setMensaje("Usuario creado correctamente ✅");

      // limpiar formulario
      setForm({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: ""
      });

    } catch (error) {
      console.error(error);
      setMensaje("Error al crear usuario ❌");
    }
  };

  return (
    <div>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
        />

        <input
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <button type="submit">Crear cuenta</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Registro;