import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Nav, Tab } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CarDetails = () => {
  const { name } = useParams();
  const [product, setProduct] = useState({});
  const [activeKey, setActiveKey] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch the product by name to get its _id field
        const resNames = await fetch(`http://localhost:5000/api/cars`);
        const dataNames = await resNames.json();
        const car = dataNames.find((c) => c.name === name);

        if (!car) {
          throw new Error(`Car with name '${name}' not found`);
        }

        // Use the _id field to fetch the full product details
        const resId = await fetch(`http://localhost:5000/api/cars/${car._id}`);
        const data = await resId.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [name]);

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false); // <-- Add state for modal

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>

      <Row style={{ marginTop: "100px" }}>
        <Col md={7}>
          {product.url && ( // <-- only render Image if product.url exists
            <div>
              <Image
                src={product.url}
                alt={product.name}
                fluid
                style={{ marginBottom: "20px" }}
              />
            </div>
          )}

          <Tab.Container id="left-tabs-example" activeKey={activeKey}>
            <Nav
              variant="tabs"
              style={{
                backgroundColor: "#ddd",
                flexWrap: "nowrap",
                width: "39%",
              }}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="description"
                  onClick={() => handleTabClick("description")}
                  style={{
                    backgroundColor:
                      activeKey === "features" ? "#808080" : "#222222",
                    color: "#ffffff",
                    borderBottom:
                      activeKey === "description" ? "3px solid #8B0000" : "",
                    padding: "15px 25px 10px 25px",
                    fontWeight: 600,
                    fontSize: 14,
                    width: 200,
                    display: "inline-block", // Add this line to make the link inline
                  }}
                >
                  Description
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="features"
                  onClick={() => handleTabClick("features")}
                  style={{
                    backgroundColor:
                      activeKey === "description" ? "#808080" : "#222222",
                    color: "#ffffff",
                    borderBottom:
                      activeKey === "features" ? "3px solid #8B0000" : "",
                    padding: "15px 25px 10px 25px",
                    fontWeight: 600,
                    fontSize: 14,
                    width: 200,
                    display: "inline-block", // Add this line to make the link inline
                  }}
                >
                  Features
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <br />
            <Tab.Content>
              <Tab.Pane eventKey="description" style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "Poppins" }}>{product.description}</p>
              </Tab.Pane>
              <Tab.Pane eventKey="features" style={{ textAlign: "left" }}>
                <ul>
                  <li>Features: {product.features}</li>
                </ul>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
        <Col md={4} className="mt-4 mt-md-0">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Name: {product.name}</ListGroup.Item>
            <ListGroup.Item>Category: {product.category}</ListGroup.Item>
            <ListGroup.Item>Stock: {product.stock}</ListGroup.Item>
            <ListGroup.Item>Year: {product.year}</ListGroup.Item>
            <ListGroup.Item>Mileage: {product.mileage}</ListGroup.Item>
            <ListGroup.Item>Price: {product.price}</ListGroup.Item>
          </ListGroup>

          <div className="text-center">
            <button
              className="w-50 car__item-btn car__btn-rent"
              style={{
                borderRadius: "40px",
                marginLeft: "10px",
                marginTop: "50px",
                color: "white",
              }}
              onClick={toggleModal}
            >
              Reserve
            </button>
          </div>

          {/* Popup Modal */}
          <Modal isOpen={modalIsOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Confirm Reservation</ModalHeader>
            <ModalBody>Are you sure you want to reserve this car?</ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => {
                  console.log("Reserved!"); // <-- Replace with your own logic
                  toggleModal();
                }}
              >
                Yes
              </button>{" "}
              <button className="btn btn-secondary" onClick={toggleModal}>
                No
              </button>
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default CarDetails;