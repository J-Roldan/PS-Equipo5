import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../App.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: [],
    material: [],
    size: [],
    gender: [],
    color: [],
    brand: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    material: [],
    size: [],
    gender: [],
    color: [],
    brand: [],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
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
        
        const options = {
          type: getUniqueOptions(productsData, "type"),
          material: getUniqueOptions(productsData, "material"),
          size: getUniqueOptions(productsData, "size"),
          gender: getUniqueOptions(productsData, "gender"),
          color: getUniqueOptions(productsData, "color"),
          brand: getUniqueOptions(productsData, "brand"),
        };
        setFilterOptions(options);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts(); 
  }, []);

  const getUniqueOptions = (data, attribute) => {
    const options = new Set();
    data.forEach((product) => {
      if (product[attribute]) {
        options.add(product[attribute]);
      }
    });
    return [...options];
  };

  const handleFilterChange = (attribute, value) => {
    const isChecked = selectedFilters[attribute].includes(value);
    setSelectedFilters((prevFilters) => {
      const newFilters = isChecked
        ? prevFilters[attribute].filter((item) => item !== value)
        : [...prevFilters[attribute], value];
      return { ...prevFilters, [attribute]: newFilters };
    });
  };

  const removeFilter = (attribute, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [attribute]: prevFilters[attribute].filter((item) => item !== value),
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    Object.entries(selectedFilters).forEach(([attribute, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((product) =>
          values.includes(product[attribute])
        );
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="d-flex">
      <div className="container p-3" style={{ width: '250px', background: '#f8f9fa' }}>
        <div id="filters">
        <h2>Filtros:</h2>
          {Object.entries(filterOptions).map(([attribute, options]) => (
            <div key={attribute} className="mb-3">
              <h4>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id={`dropdown-${attribute}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={`dropdown-${attribute}`}>
                    {options.map((option) => (
                      <li key={option} className="dropdown-item">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id={`${attribute}-${option}`}
                          value={option}
                          checked={selectedFilters[attribute].includes(option)}
                          onChange={(e) => handleFilterChange(attribute, e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={`${attribute}-${option}`}>
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </h4>
              <div className="applied-filters">
                {selectedFilters[attribute].map((value) => (
                  <span key={value} className="badge bg-primary me-2">
                    {value}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      onClick={() => removeFilter(attribute, value)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow-1">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="container">
            <h1 className="text-center">Productos</h1>
            <div className="row">
              {filteredProducts.map(product => (
                <div key={product._id} className="col-md-3 mb-4">
                  <div className="card">
                    {product.images.length > 0 && (
                      <img 
                        src={`http://localhost:3001/${product.images[0].path}`} 
                        alt={product.images[0].originalname} 
                        className="card-img-top" 
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Precio: {product.salePrice}</p>
                      <Link to={`/products/${product._id}`} className="btn btn-primary">
                        Ver producto
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
