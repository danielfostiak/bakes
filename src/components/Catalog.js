import React from "react";
import Accordion from "react-bootstrap/Accordion";
import RecipeBody from "./RecipeBody";

function Catalog(props) {
  console.log(props.recipes);
  return (
    <Accordion>
      {props.recipes.map((recipe, i) => (
        <Accordion.Item key={i} eventKey={i}>
          <Accordion.Header>{recipe.recipeName}</Accordion.Header>
          <Accordion.Body>
            <RecipeBody recipe={recipe} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Catalog;
