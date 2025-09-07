import React, { useState, useEffect } from "react";
import axios from "axios";
import './GetStartedRooms.css'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const GetStartedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/homeowner/allrooms")
      .then((res) => {
         console.log("Received homeowners from backend:", res.data); 
        setRooms(res.data?.HomeOwners || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching room data:", err);
        setLoading(false);
      });
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const query = searchQuery.toLowerCase();
    return (
      room.address?.toLowerCase().includes(query) ||
      room.state?.toLowerCase().includes(query) ||
      room.country?.toLowerCase().includes(query)
    );
  });

  const handleKnowMore = (room) => {
    console.log("Room Info:", room);
    // Navigate to detailed page if you implement one
  };

  return (
    <Container className="my-4 get-started-container">
      <h2 className="mb-4 text-center get-started-title">Available Rooms</h2>

      <Form className="mb-4 search-input">
        <Form.Control
          type="text"
          placeholder="Search by address, state, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredRooms.length === 0 ? (
        <p className="text-center">No rooms match your search.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredRooms.map((room, index) => (
            
            <Col key={index}>
              <Card className="room-cards-container">
                {room.roomPhotos?.length > 0 ? (
                  <Carousel className="carousel-img ">
                    {room.roomPhotos.map((photo, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          className="d-block w-100"
                          src={`http://localhost:5000${photo}`} // adjust based on backend static path
                          alt={`Room ${idx + 1}`}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Card.Img
                    variant="top"
                    src="/placeholder-room.jpg"
                    alt="No Room Image"
                  />
                )}

                <Card.Body className="card-body">
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>
                    <strong>Phone:</strong> {room.phone} <br />
                    <strong>Address:</strong> {room.address}, {room.state},{" "}
                    {room.country}
                  </Card.Text>
                        <Link to={`/room/${room._id}`} className="btn btn-primary">
  Know More
</Link>
          
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default GetStartedRooms;
