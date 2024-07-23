import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productadd } from '../store/slice/addtocartSlice';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';

const ProductDetail = () => {
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const product = useSelector(state => 
    state.products.data.find(product => product.id === parseInt(id))
    
  );
  console.log(product,"pro");
 
  const handleAddtocart = () => {
    dispatch(productadd({ product, count }));
    setCount(1);
    navigate('/cart'); // Navigate to the cart page
  };

  if (!product) return <div>Product not found</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={4} className="d-flex justify-content-center">
          <Image src={product.image} alt={product.title} fluid rounded />
        </Col>
        <Col md={8}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Price: INR {product.price}</Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Row className="align-items-center">
                
                <Col xs="auto">
                  <Button variant="secondary" onClick={() => setCount(count > 1 ? count - 1 : 1)}>-</Button>
                </Col>
                <Col xs="auto">
                  <h4 className="m-0">{count}</h4>
                </Col>
                <Col xs="auto">
                  <Button variant="secondary" onClick={() => setCount(count + 1)}>+</Button>
                </Col>
              </Row>
              <div className="mt-3">
                <Button variant="primary" onClick={handleAddtocart}>Add to cart</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
