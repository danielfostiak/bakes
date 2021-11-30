import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { CloseButton, FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { db } from "../App";

function RecipeForm(props) {
  const [recipe, setRecipe] = useState([]);
  const [name, setName] = useState("");
  const [CurrentIngredient, setCurrentIngredient] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const handleFormAdd = function (e) {
    e.preventDefault();
    if (CurrentIngredient === "") {
      alert("Fill in the ingredients before adding");
      return;
    }
    if (currentAmount === "") {
      alert("Fill in the ingredients before adding");
      return;
    }

    setRecipe([
      ...recipe,
      { name: CurrentIngredient, amount: currentAmount.replace(",", "") },
    ]);
    setCurrentIngredient("");
    setCurrentAmount("");
  };

  const handleRemoveItem = function (i) {
    const dupeRecipe = recipe;
    dupeRecipe.splice(i, 1);
    setRecipe([...dupeRecipe]);
  };

  const handleUpload = async function () {
    const recipeObj = { recipeName: name };
    recipe.forEach((item) => {
      recipeObj[item.name] = item.amount;
    });
    await db.collection("recipes").doc(name).set(recipeObj);
    props.closeModal();
  };

  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          placeholder="Recipe Name"
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form>
      <Card>
        <Card.Header>Ingredients</Card.Header>
        <ListGroup variant="flush">
          {recipe.map((ingredient, i) => (
            <ListGroup.Item key={i}>
              {ingredient.name} : {ingredient.amount}
              <CloseButton onClick={() => handleRemoveItem(i)} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Form onSubmit={handleFormAdd}>
        <Form.Control
          placeholder="Ingredient"
          value={CurrentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
        ></Form.Control>
        <Form.Control
          placeholder="Quantity"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
        ></Form.Control>
        <Button type="submit">Add</Button>
      </Form>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default RecipeForm;
