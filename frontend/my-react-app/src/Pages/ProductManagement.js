import React, { useState, useEffect } from "react";

export default function ProductManagement() {
  const [name, setNombre] = useState("");
  const [description, setDescripcion] = useState("");
  const [salePrice, setPrecio] = useState(0);
  const [size, setTalla] = useState("");
  const [type, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGenero] = useState("");
  const [brand, setMarca] = useState("");
  const [quantity, setCantidad] = useState(0);
  const [costPrice, setPrecioCosto] = useState(0);
  const [images, setImage] = useState(null); // State for the image file
  const [editar, setEditar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("material", material);
    formData.append("size", size);
    formData.append("gender", gender);
    formData.append("color", color);
    formData.append("brand", brand);
    formData.append("quantity", quantity);
    formData.append("costPrice", costPrice);
    formData.append("salePrice", salePrice);
    if (images) {
      formData.append("photos", images); // Append the image file to form data
    }

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch("http://localhost:3001/api/products/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const result = await response.json();
      console.log("Product added successfully:", result);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product!");
    }
  };

  const [products, setProducts] = useState([]);

 const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await fetch("http://localhost:3001/api/products/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      console.log("Product deleted successfully");
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting product!");
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch(`http://localhost:3001/api/products/search/${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to search product");
      }

      const result = await response.json();
      setSearchResult(result[0]);
    } catch (error) {
      console.error("Error:", error);
      alert("Error searching product!");
    }
  };

  const handleUpdate = async () => {
    const updateData = { name, description, type, material, size, gender, color, brand, quantity, costPrice, salePrice};
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const result = await response.json();
      console.log("Product updated successfully:", result);
      alert("Product updated successfully!");

      // Refresh product list
      setEditingProduct(null);
      const updatedProducts = products.map((product) =>
        product._id === editingProduct._id ? result : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating product!");
    }
  };
 const openEditPopup = (product) => {
    setEditingProduct(product);
    setNombre(product.name);
    setDescripcion(product.description);
    setPrecio(product.salePrice);
    setTalla(product.size);
    setTipo(product.type);
    setColor(product.color);
    setMaterial(product.material);
    setGenero(product.gender);
    setMarca(product.brand);
    setCantidad(product.quantity);
    setPrecioCosto(product.costPrice);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='container'>
      <div className="App">
        <div className="datos-producto">
        </div>
      </div>
      <div className="card text-center">
        <div className="card-header">
          Agregar Producto
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" placeholder="Ingrese nombre del producto" aria-label="Nombre" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descripción</span>
            <input type="text"
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
              className="form-control" placeholder="Ingrese descripción del producto" aria-label="Descripción" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio</span>
            <input type="number"
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              className="form-control" placeholder="Ingrese precio del producto" aria-label="Precio" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Talla</span>
            <input type="text"
              onChange={(event) => {
                setTalla(event.target.value);
              }}
              className="form-control" placeholder="Ingrese talla del producto" aria-label="Talla" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Tipo</span>
            <input type="text"
              onChange={(event) => {
                setTipo(event.target.value);
              }}
              className="form-control" placeholder="Ingrese tipo del producto" aria-label="Tipo" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Color</span>
            <input type="text"
              onChange={(event) => {
                setColor(event.target.value);
              }}
              className="form-control" placeholder="Ingrese color del producto" aria-label="Color" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Material</span>
            <input type="text"
              onChange={(event) => {
                setMaterial(event.target.value);
              }}
              className="form-control" placeholder="Ingrese material del producto" aria-label="Material" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Genero</span>
            <input type="text"
              onChange={(event) => {
                setGenero(event.target.value);
              }}
              className="form-control" placeholder="Ingrese genero del producto" aria-label="Genero" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Marca</span>
            <input type="text"
              onChange={(event) => {
                setMarca(event.target.value);
              }}
              className="form-control" placeholder="Ingrese marca del producto" aria-label="Marca" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cantidad</span>
            <input type="number"
              onChange={(event) => {
                setCantidad(event.target.value);
              }}
              className="form-control" placeholder="Ingrese cantidad del producto" aria-label="Cantidad" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Costo</span>
            <input type="number"
              onChange={(event) => {
                setPrecioCosto(event.target.value);
              }}
              className="form-control" placeholder="Ingrese Costo de compra del producto" aria-label="Costo" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Imagen</span>
            <input type="file"
              onChange={handleFileChange}
              className="form-control" aria-label="Imagen" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar ? <div>
              <button className='btn btn-warning m-2' onClick={handleUpdate}>Actualizar</button>
              <button className='btn btn-info'>Cancelar</button>
            </div>
              : <button className='btn btn-success' onClick={handleSubmit}>Agregar</button>
          }
        </div>
      </div>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by product name" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}> Search </button>
      </div>
      {searchResult && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Product Details</h5>
            <p className="card-text">Nombre: {searchResult.name}</p>
            <p className="card-text">Descripción: {searchResult.description}</p>
            <p className="card-text">Precio: {searchResult.salePrice}</p>
            <p className="card-text">Tipo: {searchResult.type}</p>
            <p className="card-text">Talla: {searchResult.size}</p>
            <p className="card-text">Color: {searchResult.color}</p>
            <p className="card-text">Material: {searchResult.material}</p>
            <p className="card-text">Genero: {searchResult.gender}</p>
            <p className="card-text">Marca: {searchResult.brand}</p>
            <p className="card-text">Cantidad: {searchResult.quantity}</p>
            <p className="card-text">Costo: {searchResult.costPrice}</p>
            <button className="btn btn-secondary" onClick={() => setSearchResult(null)}>Close</button>
          </div>
        </div>
      )}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Talla</th>
            <th scope="col">Color</th>
            <th scope="col">Material</th>
            <th scope="col">Genero</th>
            <th scope="col">Marca</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Costo</th>
          </tr>
          </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.salePrice}</td>
              <td>{product.type}</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>{product.material}</td>
              <td>{product.gender}</td>
              <td>{product.brand}</td>
              <td>{product.quantity}</td>
              <td>{product.costPrice}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button"
                    onClick={() => openEditPopup(product)}
                    className="btn btn-info">Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(product._id)}>Eliminar</button>
                </div>
              </td>
            </tr>))}
        </tbody>
      </table>
      {editingProduct && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Edit Product</h3>
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Descripción</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescripcion(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Tipo</span>
              <input
                type="text"
                value={type}
                onChange={(e) => setTipo(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Material</span>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Talla</span>
              <input
                type="text"
                value={size}
                onChange={(e) => setTalla(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Genero</span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGenero(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Color</span>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Marca</span>
              <input
                type="text"
                value={brand}
                onChange={(e) => setMarca(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Cantidad</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setCantidad(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Costo</span>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setPrecioCosto(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Precio</span>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => setPrecio(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="button-group">
              <button className="btn btn-warning" onClick={handleUpdate}>Actualizar</button>
              <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
