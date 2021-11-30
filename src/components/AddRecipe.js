import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RecipeForm from "./RecipeForm";

function AddRecipe() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Recipe
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RecipeForm closeModal={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddRecipe;
