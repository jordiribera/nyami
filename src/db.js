import "@/firebase";

import { getFirestore } from "firebase/firestore";

import {
  collection,  
  addDoc,  
  getDocs,  
  query,
  where,
  /* doc,
  setDoc,
  getDoc, */
} from "firebase/firestore";

export default db;

const db = getFirestore();

const ingredientsCollection = collection(db, "ingredients");
const recipesCollection = collection(db, "recipes");
const eventsCollection = collection(db, "calendar");


//recull tots els ingredients de la base de dades i els retorna com a array
export async function getAllIngredients() {
  const ingredients = [];
  const querySnapshot = await getDocs(ingredientsCollection);
  querySnapshot.forEach((doc) => {
    ingredients.push(doc.data());
  });
  return ingredients;
}

//recull totes les receptes de la base de dades i les retorna com a array
export async function getAllRecipes() {
  const recipes = [];
  const querySnapshot = await getDocs(recipesCollection);
  querySnapshot.forEach((doc) => {
    recipes.push(doc.data());
  });
  return recipes;
}

//recull totes les receptes de la base de dades i les retorna com a array
export async function getAllEvents() {
  const events = [];
  const querySnapshot = await getDocs(eventsCollection);
  querySnapshot.forEach((doc) => {
    events.push(doc.data());
  });
  return events;
}

//retorna la recepta amb el nom passat com a paràmetre

export async function getRecipe(name) {
  const recipes = [];
  const q = query(collection(db, "recipes"), where("name", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipes.push(doc.data());
  });

  return recipes[0];
}


//afegeix un nou ingredient a la base de dades
export async function addIngredient(ingredient) {
  await addDoc(ingredientsCollection, ingredient);  
}

//afegeix una nova recepta a la base de dades
export async function addRecipe(recipe) {
  await addDoc(recipesCollection, recipe);  
}

//afegeix una nova entrada al calendari de la base de dades
export async function addEvent(event) {
  await addDoc(eventsCollection, event);  
}


/* 
//retorna un array amb les mascotes que tinguin les característiques passades com a paràmetre
export async function advancedSearch(species, sex, size) {
  const pets = [];
  const constraints = [];

  // filters selected by users
  if (species != "Todos") {
    constraints.push(where("species", "==", species));
  }
  if (sex != "Todos") {
    constraints.push(where("sex", "==", sex));
  }
  if (size != "Todos") {
    constraints.push(where("size", "==", size));
  }

  const q = query(collection(db, "pets"), ...constraints);

  //const q = query(collection(db, "pets"), where("species", "==", species), where("sex", "==", sex), where("size", "==", size));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    pets.push(doc.data());
  });

  return pets;
}
 */