import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const amountRegex = /[\d|,|.|\+]+/g;

function RecipeBody(props) {
  const [multiplier, setMutiplier] = useState(1);
  const [currentValues, setCurrentValues] = useState(
    Object.entries(props.recipe)
      .filter((item) => item[0] !== "recipeName")
      .map((item) => {
        if (item[0] === "recipeName") console.log("");
        else {
          const [value] = item[1].match(amountRegex);
          return +value;
        }
      })
  );
  // console.log(currentValues);

  return (
    <Form>
      {Object.entries(props.recipe)
        .filter((item) => item[0] !== "recipeName")
        .map((item, i) => {
          let [ingredient, amount] = item;

          // let [cleanedAmount] = amount.match(amountRegex);
          let [cleanedAmount] = amount.match(amountRegex);
          // console.log(cleanedAmount);
          const suffix = amount.slice(cleanedAmount.length);
          // console.log(ingredient, cleanedAmount, cleanedAmount.length, suffix);
          return (
            <div key={i}>
              <Form.Label>{ingredient}</Form.Label>
              <Form.Control
                id={cleanedAmount}
                value={Math.round(currentValues[i])}
                onChange={(e) => {
                  console.log(e.target.value, cleanedAmount);
                  const newMultiplier = +e.target.value / +cleanedAmount;
                  // setMutiplier(newMultiplier);
                  setCurrentValues(
                    Object.entries(props.recipe)
                      .filter((item) => item[0] !== "recipeName")
                      .map((item) => {
                        if (item[0] === "recipeName") console.log("");
                        else {
                          const [value] = item[1].match(amountRegex);
                          return +value;
                        }
                      })
                      .map((value) => value * newMultiplier)
                  );
                  console.log(
                    currentValues.map((value) => value * newMultiplier)
                  );
                  // const newCurrentValues = currentValues;
                  // Object.keys(newCurrentValues).map(function (key, index) {
                  //   newCurrentValues[key] *= multiplier;
                  // });
                  // setCurrentValues(newCurrentValues);
                }}
              ></Form.Control>
              <p>{suffix}</p>
            </div>
          );
        })}
    </Form>
  );
}

export default RecipeBody;
