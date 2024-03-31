import React from "react";
import { Button, Form } from "react-bootstrap";

export default function CommentForm(){
	return(
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
	)
}