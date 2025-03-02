import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const userId = location.state.userId;

  useEffect(() => {
    axios.get(`http://localhost:3000/products?userId=${userId}`)
      .then(response => setProducts(response.data));
  }, [userId]);

  return (
    <>
    <Header></Header>
    <div className="container" style={{ backgroundColor:'#D9EAFD',paddingTop:'40px' }}>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{ fontWeight:'bolder' }}>{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">View Product</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProductsPage;