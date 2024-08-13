import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, ListGroup, Image, Button, ButtonGroup, Card } from 'react-bootstrap';
import { incrementQuantity, decrementQuantity, removeItem } from '../store/slice/addtocartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  // TO calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.count), 0);
  const discount = 20; 
  const deliveryFee = 50; 
  const total = subtotal - discount + deliveryFee;

  return (
    <Container>
      <h1 className="my-4">Cart</h1>
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <Row className="w-100">
                    <Col md={2}>
                      <Image src={item.image} alt={item.title} fluid />
                    </Col>
                    <Col md={4}>
                      <h5>{item.title}</h5>
                      <p>Price: INR {item.price}</p>
                      <p>Total Cost: INR {item.price * item.count}</p>
                    </Col>
                    <Col md={3}>
                      <ButtonGroup>
                        <Button variant="secondary" onClick={() => handleDecrement(item.id)}>-</Button>
                        <Button variant="light" disabled>{item.count}</Button>
                        <Button variant="secondary" onClick={() => handleIncrement(item.id)}>+</Button>
                      </ButtonGroup>
                    </Col>
                    <Col md={2}>
                      <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {cart.length > 0 && (
          <Col md={4}>
            <Card className="mt-4">
              <Card.Header>Order Summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col>Subtotal:</Col>
                    <Col className="text-end">INR {subtotal}</Col>
                  </Row>
                  <Row>
                    <Col>Discount:</Col>
                    <Col className="text-end">- INR {discount}</Col>
                  </Row>
                  <Row>
                    <Col>Delivery Fee:</Col>
                    <Col className="text-end">INR {deliveryFee}</Col>
                  </Row>
                  <Row className="mt-3">
                    <Col><strong>Total:</strong></Col>
                    <Col className="text-end"><strong>INR {total}</strong></Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
