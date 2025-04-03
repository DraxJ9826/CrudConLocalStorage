import React, { useEffect, useState } from "react";
import { Button, Row, Container, Col, Form, Navbar, Table } from "react-bootstrap";
import './App.css';  // Importa el archivo CSS

export default function App() {
  const [tarea, setTarea] = useState([]);  // Inicializamos como un array vacío donde se almacenaran las tareas
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [actualizarTarea, setActualizarTarea] = useState({});  // Usamos un objeto para almacenar las actualizaciones por tarea


/**Queria agregar un modo de "chequeo" por si hay tareas 
 * repetidas pero no logre encontrar la logica*/

  // Efecto para guardar en el localstorage
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

  // // Verificar si la tarea ya existe en el array
  // const tareaExistente = (tarea) => {
  //   if (Array.isArray(tarea) && tarea.length > 0) {
  //     return tarea.some(existingTarea => existingTarea === tarea);
  //   }
  //   return false;
  // };

  // Crearemos la tarea y se almacenará en el localstorage
  const alCrear = () => {
    if (nuevaTarea.trim() === "") {
      alert("Por favor ingresa una tarea. No lo dejes vacío");
      return;
    }

    // // Verificar si la tarea ya existe en la lista
    // if (tareaExistente(tarea, nuevaTarea)) {
    //   alert("Esta tarea ya existe.");
    //   return;
    // }

    const nuevasTareas = [...tarea, nuevaTarea];  // Crea una copia del array y agrega la nueva tarea
    localStorage.setItem('tarea', JSON.stringify(nuevasTareas));  // Guardamos la nueva lista de tareas en localStorage
    setTarea(nuevasTareas);  // Actualiza el estado con la nueva lista
    setNuevaTarea('');  // Limpiar el campo de entrada después de agregar la tarea
  };

  // Eliminamos la tarea
  const alEliminar = (tareaEliminar) => {
    const nuevasTareas = tarea.filter(t => t !== tareaEliminar);  // Crea una nueva lista sin la tarea eliminada
    localStorage.setItem('tarea', JSON.stringify(nuevasTareas));  // Guardamos la nueva lista en localStorage
    setTarea(nuevasTareas);  // Actualiza el estado con la nueva lista
  };

  // Actualizamos la tarea según el índice
  const alActualizar = (tarea) => {
    if (actualizarTarea[tarea].trim() === "") {
      alert("Por favor, ingrese un valor para actualizar la tarea.");
      return;
    }

    // // Verificar si la nueva tarea ya existe en la lista (excepto la tarea que estamos actualizando)
    // if (tareaExistente(tarea, actualizarTarea[tarea])) {
    //   alert("Ya existe una tarea con el mismo nombre.");
    //   return;
    // }

    // Obtén las tareas del localStorage
    const tareaActualizada = JSON.parse(localStorage.getItem('tarea'));

    if (!Array.isArray(tareaActualizada)) {
      console.error("Error: No hay tareas almacenadas o el formato es incorrecto.");
      return;
    }

    const indice = tareaActualizada.indexOf(tarea);

    if (indice === -1) {
      console.error("Error: La tarea no se encuentra en el array.");
      return;
    }

    // Crear una nueva copia del array y actualizar el valor
    const nuevasTareas = [...tareaActualizada];
    nuevasTareas[indice] = actualizarTarea[tarea];

    // Guarda las tareas actualizadas en el localStorage
    localStorage.setItem('tarea', JSON.stringify(nuevasTareas));

    // Actualiza el estado para reflejar los cambios
    setTarea(nuevasTareas);
    setActualizarTarea({ ...actualizarTarea, [tarea]: '' }); // Limpiar el campo de texto después de actualizar
  };

  // Manejar el cambio del valor en cada input
  const handleInputChange = (e, tarea) => {
    setActualizarTarea({
      ...actualizarTarea,
      [tarea]: e.target.value  // Actualizamos solo la tarea correspondiente
    });
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
                        value={actualizarTarea[tarea] || ''} // Usamos el valor correspondiente de cada tarea
                        onChange={(e) => handleInputChange(e, tarea)} // Llamamos a la función de cambio de input
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
      {/* Footer */}
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p> CRUD Joshua Rivera. Maestria En Ciencias De Datos Para Negocios &copy; 2025.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  </div>
);
}