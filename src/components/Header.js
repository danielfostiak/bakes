import React from "react";
import Navbar from "react-bootstrap/Navbar";

import AddRecipe from "./AddRecipe";

function Header() {
  return (
    <div>
      <Navbar>
        <Navbar.Brand>
          Bakes <AddRecipe />
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
