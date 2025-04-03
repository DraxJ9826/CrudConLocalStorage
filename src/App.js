import React, { useEffect, useState } from "react";
import { Button, Row, Container, Col, Form, Navbar, Table } from "react-bootstrap";
import './App.css';  // Importa el archivo CSS

export default function App() {
  const [tarea, setTarea] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [actualizarTarea, setActualizarTarea] = useState('');

  // Efecto para guardar en el localstorage
  useEffect(() => {
    const leerTarea = () => {
      const storedTareas =localStorage.getItem('Tarea')
      if(storedTareas){
        const tareas = JSON.parse(storedTareas)
        if(Array.isArray(tareas)){
          setTarea(tareas)
        } else{
          setTarea([])
        }
      } else{
        setTarea([])
      }
    };
    leerTarea();
  }, []);

  // Crearemos la tarea y se almacenará en el localstorage
const alCrear = () => {
  if (nuevaTarea.trim() === "") {
    alert("Por favor ingresa una tarea. No lo dejes vacío");
    return; // No se ejecuta el resto de la función si el campo está vacío
  }
  
  const nuevasTareas = [...tarea, nuevaTarea];  // Crea una copia del array y agrega la nueva tarea
  localStorage.setItem('tarea', JSON.stringify(nuevasTareas));  // Guardamos la nueva lista de tareas en localStorage
  setTarea(nuevasTareas);  // Actualiza el estado con la nueva lista
  setNuevaTarea('');  // Limpiar el campo de entrada después de agregar la tarea
};

// Eliminamos la tarea
function alEliminar(tareaEliminar) {
  const nuevasTareas = tarea.filter(t => t !== tareaEliminar);  // Crea una nueva lista sin la tarea eliminada
  
  localStorage.setItem('tarea', JSON.stringify(nuevasTareas));  // Guardamos la nueva lista en localStorage
  setTarea(nuevasTareas);  // Actualiza el estado con la nueva lista
}

// Actualizamos la tarea según el índice
const alActualizar = (tareaOriginal) => {
  if (actualizarTarea.trim() === "") {
    alert("Por favor ingresa un valor para actualizar la tarea.");
    return; // No se ejecuta el resto de la función si el campo está vacío
  }

  const nuevasTareas = tarea.map((tarea) => 
    tarea === tareaOriginal ? actualizarTarea : tarea  // Actualiza solo la tarea que coincide
  );

  localStorage.setItem('tarea', JSON.stringify(nuevasTareas));  // Guardamos la lista actualizada en localStorage
  setTarea(nuevasTareas);  // Actualiza el estado con la nueva lista
};


  return (
    <div>
      <Navbar className="navbar-custom">
        <Navbar.Brand href="https://docs.google.com/document/d/1kCrLEF4QpvclDBGoOEG4XU21zx4fV5QA/edit?tab=t.0" target="_blank" className="navbar-link">
          CRUD Joshua
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
              <thead>
                <tr>
                  <th>Nombre Tarea</th>
                  <th>Eliminar Tarea</th>
                  <th>Actualizar Tarea</th>
                </tr>
              </thead>

              <tbody>
                {tarea.map((tarea) => (
                  <tr key={tarea}>
                    <td>{tarea}</td>

                    <td>
                      <Button className="btn-delete" onClick={() => alEliminar(tarea)}>
                        Eliminar Tarea
                      </Button>
                    </td>

                    <td>
                      <input
                        type="text"
                        className="update-input"
                        onChange={(e) => setActualizarTarea(e.target.value)}
                        placeholder={tarea}
                      />
                      <Button className="btn-update" onClick={() => alActualizar(tarea)}>
                        Actualizar Tarea
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
