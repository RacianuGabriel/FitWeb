import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import CommentElement from './CommentElement';

export default function WorkoutComments() {
  return (
    <>
      <Container className='mt-5 pt-0 mx-auto image-content shadow-lg '>
        <Row className='justify-content-center'>
        <Card>
                <Card.Body className="p-4">
                  <h4 className="text-center mb-4 pb-2">Comments section</h4>

                  <Row>
                    <Col>
                      <CommentElement >
                        <CommentElement/>
                      </CommentElement>
                      <CommentElement/>
                      <CommentElement/>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer
                className="py-3 border-0"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="d-flex flex-start w-100">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                  <Form className="w-100">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Message"
                        style={{ backgroundColor: '#fff' }}
                      />
                    </Form.Group>
                    <div className="float-end mt-2 pt-1">
                      <Button variant="primary" size="sm" className="me-1">
                        Post comment
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Footer>
              </Card>
        </Row>
      </Container>
    </>
  );
}
