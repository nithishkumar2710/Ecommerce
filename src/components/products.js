import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getProducts } from '../store/action/productsAction';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './products.css';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products1 } = useSelector(state => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(products1.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products1]);

  const renderCard = (product) => (
    <div className="col-md-3 mb-4" key={product.id}>
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card className="h-100 product-card">
          <div className="text-center p-3">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: '150px', height: '200px', objectFit: 'contain' }}
            />
          </div>
          <Card.Body>
            <Card.Text className="text-left card-title" >{product.title}</Card.Text>
            <Card.Text className="text-left card-price">INR {product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5" style={{  fontWeight: 700, fontSize: '48px' }}>New Products</h1>
      <div className="row mb-4">
        {products1.map(product => renderCard(product))}
      </div>
      {categories.map(category => (
        <div key={category} className="category-section">
          <h2 className="category-header">{category}</h2>
          <div className="row">
            {products1.filter(product => product.category === category)
              .map(filteredProduct => renderCard(filteredProduct))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
