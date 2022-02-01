import "@/firebase";

import { getFirestore } from "firebase/firestore";

import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export default db;

const db = getFirestore();

const ingredientsCollection = collection(db, "ingredients");
const recipesCollection = collection(db, "recipes");
const petCollection = collection(db, "pets");

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

//afegeix un nou ingredient a la base de dades
export async function addIngredient(ingredient) {
  await addDoc(ingredientsCollection, ingredient);  
}

//afegeix una nova recepta a la base de dades
export async function addRecipe(recipe) {
  await addDoc(recipesCollection, recipe);  
}

//rep l'objecte pet i afegeix la nova mascota a la base de dades
export async function addPet(pet) {
  const ref = doc(petCollection);
  pet.id = ref.id;
  await setDoc(ref, pet);
  console.log("Document written with ID: ", pet.id);
}

//recull totes les mascotes de la base de dades i les retorna com a array
export async function getAllPets() {
  const pets = [];
  const querySnapshot = await getDocs(petCollection);
  querySnapshot.forEach((doc) => {
    pets.push(doc.data());
  });
  return pets;
}

//retorna la mascota amb l'ID passat com a paràmetre
export async function getPet(petId) {
  const docRef = doc(db, "pets", petId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {    
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No existeix");
  }
}

//retorna un array amb les mascotes amb el nom igual al passat com a paràmetre
export async function search(name) {
  const pets = [];
  const q = query(collection(db, "pets"), where("name", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    pets.push(doc.data());
  });

  return pets;
}

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
