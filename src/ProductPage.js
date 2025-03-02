import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products?id=${productId}`)
      .then(response => setProduct(response.data));
      console.log(product)
  }, []);

   if (!product) {
     return <div>Loading...</div>;
 }

  return (
    <>
    <Header></Header>
    <div className="container">
    <div className="row" style={{paddingTop:'40px'}}>
      {product.map(p => (
        <div key={p.id} className="col-md-4">
          <div className="card">
            <img src={p.image} className="card-img-top" alt={p.name} />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text" style={{ fontWeight:'bolder' }}>{p.price}</p>
            </div>
          </div>
          <h4 style={{paddingTop:'20px',color:'#848884'}}>Description:</h4>
          <p>{p.details}</p>
        </div>
      ))}
    </div>
  </div>
  </>
  );
};

export default ProductPage;