import React, { useEffect, useState } from "react";
import { Button, Row, Container, Col, Form, Navbar, Table } from "react-bootstrap";
import './App.css';  // Importa el archivo CSS

export default function App() {
  const [tarea, setTarea] = useState([]);  // Inicializamos como un array vacío donde se almacenaran las tareas
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [actualizarTarea, setActualizarTarea] = useState({});  // Usamos un objeto para almacenar las actualizaciones por tarea
  const [puedoEditar, setPuedoEditar] = useState(null);  // Almacena la tarea que está siendo editada

  // Efecto para leer tareas del localStorage
  useEffect(() => {
    const leerTarea = () => {
      const storedTareas = localStorage.getItem('tarea');
      if (storedTareas) {
        const tareas = JSON.parse(storedTareas);
        if (Array.isArray(tareas)) {
          setTarea(tareas);
        } else {
          setTarea([]);
        }
      } else {
        setTarea([]);
      }
    };
    leerTarea();
  }, []);

  // Función para agregar tarea
  const alCrear = () => {
    if (nuevaTarea.trim() === "") {
      alert("Por favor ingresa una tarea. No lo dejes vacío");
      return;
    }

    const nuevasTareas = [...tarea, nuevaTarea];
    localStorage.setItem('tarea', JSON.stringify(nuevasTareas));
    setTarea(nuevasTareas);
    setNuevaTarea('');
  };

  // Función para eliminar tarea
  const alEliminar = (tareaEliminar) => {
    const nuevasTareas = tarea.filter(t => t !== tareaEliminar);
    localStorage.setItem('tarea', JSON.stringify(nuevasTareas));
    setTarea(nuevasTareas);
  };

  // Función para actualizar tarea
const alActualizar = (tarea) => {
  const tareaAActualizar = actualizarTarea[tarea]; // Obtén el valor de la tarea

  // Verifica que la tarea no sea undefined o null antes de intentar usar .trim()
  if (!tareaAActualizar || tareaAActualizar.trim() === "") {
    alert("Por favor, ingrese un valor para actualizar la tarea.");
    return;
  }

  const tareaActualizada = JSON.parse(localStorage.getItem('tarea'));
  const indice = tareaActualizada.indexOf(tarea);
  if (indice === -1) return;

  const nuevasTareas = [...tareaActualizada];
  nuevasTareas[indice] = tareaAActualizar;

  localStorage.setItem('tarea', JSON.stringify(nuevasTareas));
  setTarea(nuevasTareas);
  setActualizarTarea({ ...actualizarTarea, [tarea]: '' });
  setPuedoEditar(null);  // Desactiva la edición después de actualizar
};

// Función para manejar los cambios en el input de actualización
const handleInputChange = (e, tarea) => {
  setActualizarTarea({
    ...actualizarTarea,
    [tarea]: e.target.value,
  });
};


  // Función para activar la edición
  const activarEdicion = (tarea) => {
    setPuedoEditar(tarea);  // Activa la edición de la tarea seleccionada
  };

  // Función para desactivar la edición
  const desactivarEdicion = () => {
    setPuedoEditar(null);  // Desactiva la edición
  };

  return (
    <div className="app-container">
      <Navbar className="navbar-custom">
        <Navbar.Brand href="https://docs.google.com/document/d/1kCrLEF4QpvclDBGoOEG4XU21zx4fV5QA/edit?tab=t.0" target="_blank" className="navbar-link">
          CRUD Joshua Rivera
        </Navbar.Brand>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
            <h2>Añadir Nueva Tarea</h2>
            <Form>
              <Form.Group controlId="FormularioBasicoCheckBox">
                <Form.Control
                  autoComplete="off"
                  type="text"
                  value={nuevaTarea}
                  placeholder="Escribe la nueva tarea"
                  onChange={(e) => setNuevaTarea(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && alCrear()}
                />
              </Form.Group>
              <Button className="btn-create" onClick={alCrear}>Crear Tarea</Button>
            </Form>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Table className="custom-table">
              {/* <thead>
                <tr>
                  <th>Nombre Tarea</th>
                  <th>Eliminar Tarea</th>
                  <th>Editar Tarea</th>
                  <th>Actualizar Tarea</th>
                </tr>
              </thead> */}

              <tbody>
                {tarea.map((tarea) => (
                  <tr key={tarea}>
                    <td>{tarea}</td>

                    <td>
                      <Button className="btn-delete" onClick={() => alEliminar(tarea)}>
                        Eliminar 
                      </Button>
                    </td>

                    <td>
                      {/* Botón para activar la edición */}
                      {puedoEditar !== tarea ? (
                        <Button className="btn-edit" onClick={() => activarEdicion(tarea)}>
                          Editar 
                        </Button>
                      ) : (
                        <Button className="btn-cancel" onClick={desactivarEdicion}>
                          Cancelar 
                        </Button>
                      )}
                    </td>

                    <td>
                      {/* Input para editar tarea */}
                      {puedoEditar === tarea ? (
                        <input
                          type="text"
                          className="update-input"
                          value={actualizarTarea[tarea] || tarea}
                          onChange={(e) => handleInputChange(e, tarea)}
                        />
                      ) : null}

                      {/* Botón de actualización */}
                      {puedoEditar === tarea && (
                        <Button className="btn-update" onClick={() => alActualizar(tarea)}>
                          Actualizar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <footer className="footer">
          <p> CRUD Joshua Rivera. Maestría en Ciencias de Datos para Negocios &copy; 2025.</p>
      </footer>
    </div>
  );
}
