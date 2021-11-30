import { useEffect, useState } from "react";
import Header from "./components/Header";
import firebase from "firebase/app";
import "firebase/firestore";
import Catalog from "./components/Catalog";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const db = firebase.firestore();

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // On mount => fetching recipes from DB
    async function fetchData() {
      const list = [];
      const col = await db.collection("recipes").get();
      col.forEach((doc) => {
        list.push(doc.data());
      });
      setRecipes(list);
    }
    fetchData(); // Undo to resume fetching
  }, []);

  return (
    <div>
      <Header />

      <Catalog recipes={recipes} />
    </div>
  );
}

export { db };
export default App;
