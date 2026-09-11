//Exercise 1
console.log("Hello World!");
//Exercise 2
const name = "Jesse";
const age = 22;
const favoriteAnimal = "Dog";

console.log(
  "Hello, my name is " +
    name +
    ", I am " +
    age +
    " years old and my favorite animal is a " +
    favoriteAnimal +
    ".",
);
//Exercise 3
const guestName = prompt("What is your name?");

const guestAge = prompt("What is your age?");

const guestAnimal = prompt("What is your favorite animal?");
console.log(guestName);

console.log(guestAge);

console.log(guestAnimal);

if (guestAge > 18) {
  console.log("You are an adult.");
} else {
  console.log("You are under 18.");
}
function greetUser(name) {
  console.log("Hello " + name + "!");
}
greetUser(guestName);

const button = document.createElement("button");

button.textContent = "Click Me";

button.addEventListener("click", () => {
  alert("Button was clicked!");
});

document.body.appendChild(button);
