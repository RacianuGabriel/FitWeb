import React from 'react';
import { Container, Row, Col, Card,  } from 'react-bootstrap';
import CommentElement from './CommentElement';
import CommentForm from './CommentForm';

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
                  <CommentForm/>
                </Card.Footer>
              </Card>
        </Row>
      </Container>
    </>
  );
}
