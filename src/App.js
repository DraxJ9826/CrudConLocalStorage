import react, { useEffect, useState } from "react";

import {Button, Row, Container, Col, Form, Navbar, Table} from 'react-boostrap'
import { jsx } from "react/jsx-runtime";

function App(){
  const [tarea, setTarea] = useState([])
  const [nuevaTarea, setNuevaTarea] = useState('')
  const [actualizarTarea, setActualizarTarea] = useState('')
  
  //Efecto para guardar en el localstorage
  useEffect(()=>{
    const leerTarea =()=>{
      if(localStorage.getItem('Tareas')){
        setTarea(JSON.parse(localStorage.getItem('Tareas')))
      }
    }
    leerTarea()
  }, [])

//crearemos la tarea y se almacenará en el localstorage
  const alCrear = ()=>{
    tasks.pus(nuevaTarea)
    localStorage.setItem('Tarea', JSON.stringify(tarea))
    setNuevaTarea('')
  }
  

  //eliminamos la tarea 
  function alEliminar(tarea){
    let indice = tasks.indexOf(tarea);
    tasks.splice(indice,1)
    localStorage.setItem('Tareas',JSON.stringify(tarea))
    setNuevaTarea('')
    setTarea(JSON.parse(localStorage.getItem('Tareas')))
  }

  //actualizamos la tarea segun el indice
  const alActualizar =(tarea) =>{
    let indice = tasks.indexOf(tarea);
    let tareaActualizada = JSON.parse(localStorage.getItem('Tarea'))

    //aqui se actualiza
    tareaActualizada[indice] =actualizarTarea

    localStorage
  }


}