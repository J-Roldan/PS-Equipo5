import { useState, React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const[nombre,setNombre]=useState("")
    const[descripcion,setDescripcion]=useState("")
    const[precio,setPrecio]=useState(0)
    const[talla,setTalla]=useState("")
    const[tipo,setTipo]=useState("")
    const[color,setColor]=useState("")
    const[material,setMaterial]=useState("")
    const[genero,setGenero]=useState("")
    const[marca,setMarca]=useState("")
    const[cantidad,setCantidad]=useState(0)
    const[precioCosto,setPrecioCosto]=useState(0)
    const[id,setID]=useState("")
  
    const[editar,setEditar]=useState(false);
  
  
    const mostrarDatos = ()=>{
      alert(nombre);
    }
  
    const editarProducto = (val)=>{
      setEditar(true);
      setNombre(val.nombre);
      setPrecio(val.precio);
      setTalla(val.talla);
      setTipo(val.tipo);
      setColor(val.color);
      setID(val.id);
    }
  
    return (
      <div class='container'>
      <div className="App">
        <div className= "datos-producto">
        </div>
      </div>
      <div class="card text-center">
        <div class="card-header">
          Agregar Producto
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre</span>
          <input type="text" 
          onChange={(event)=>{
            setNombre(event.target.value);
          }}
          className="form-control" placeholder="Ingrese nombre del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Descripción</span>
          <input type="text" 
          onChange={(event)=>{
            setDescripcion(event.target.value);
          }}
          className="form-control" placeholder="Ingrese descripción del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Precio</span>
          <input type="number" 
          onChange={(event)=>{
            setPrecio(event.target.value);
          }}
          className="form-control" placeholder="Ingrese precio del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Talla</span>
          <input type="text" 
          onChange={(event)=>{
            setTalla(event.target.value);
          }}
          className="form-control" placeholder="Ingrese talla del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Tipo</span>
          <input type="text" 
          onChange={(event)=>{
            setTipo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese tipo del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Color</span>
          <input type="text" 
          onChange={(event)=>{
            setColor(event.target.value);
          }}
          className="form-control" placeholder="Ingrese color del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Material</span>
          <input type="text" 
          onChange={(event)=>{
            setMaterial(event.target.value);
          }}
          className="form-control" placeholder="Ingrese material del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Genero</span>
          <input type="text" 
          onChange={(event)=>{
            setGenero(event.target.value);
          }}
          className="form-control" placeholder="Ingrese genero del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Marca</span>
          <input type="text" 
          onChange={(event)=>{
            setMarca(event.target.value);
          }}
          className="form-control" placeholder="Ingrese marca del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad</span>
          <input type="number" 
          onChange={(event)=>{
            setCantidad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese cantidad del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Costo</span>
          <input type="number" 
          onChange={(event)=>{
            setPrecioCosto(event.target.value);
          }}
          className="form-control" placeholder="Ingrese Costo de compra del producto" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div class="card-footer text-muted">
          {
            editar? <div>
            <button className='btn btn-warning m-2'>Actualizar</button> 
            <button className='btn btn-info'>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={mostrarDatos}>Agregar</button>
          }
        </div>
      </div>
      <table class="table table-striped">
      <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Precio</th>
        <th scope="col">Tipo</th>
        <th scope="col">Talla</th>
        <th scope="col">Material</th>
        <th scope="col">Genero</th>
        <th scope="col">Marca</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Costoo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>polera jsbdha</td>
        <td>fjebk fkeufhuk jsbdha</td>
        <td>1212</td>
        <td>polera</td>
        <td>L</td>
        <td>rojo</td>
        <td>algodon</td>
        <td>M</td>
        <td>USM</td>
        <td>30</td>
        <td>200</td>
        <td>
        <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" 
        onClick={(event)=>{
          editarProducto(event.target.value)
        }}
        className="btn btn-info">Editar</button>
        <button type="button" className="btn btn-danger">Eliminar</button>
      </div>
      </td>
      </tr>
    </tbody>
      </table>
      </div>
    );
}

export default App;
