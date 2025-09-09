#### 1) What is the difference between var, let, and const?
Var is the old way of declaring variables in JavaScript. It has some problems because it does not care much about scope (where the variable can be used). A var variable is function-scoped. This means it is available anywhere inside the whole function where it is declared. It can also be redeclared again and again without error which sometimes causes confusion or bugs.

Let is the modern way to declare variables. A let variable is block-scoped. This means it only works inside the curly braces { } where it is declared. Unlike var, it cannot be redeclared in the same block. This makes code safer and less buggy. But value can still change/update later.

Const is also block-scoped like let. But the main difference is that the value cannot be changed/reassigned after giving a value to a const variable. It’s constant. However, if the value is an object or an array then the contents inside can change. But replacing the whole thing is not possible.


#### 2) What is the difference between map(), forEach(), and filter()?
map() runs through each item in an array and changes something. Then it gives back a brand-new array with those changed items. The original array remains same.

In an array forEach() runs a function on every item. It’s mainly use for printing values or making updates. It doesn’t create a new array. It always returns undefined.

filter() is use to test each element of an array against a given condition. Only the elements that satisfy the condition are returned in a new array. The original array remains unchanged.


#### 3) What are arrow functions in ES6?
Arrow functions in ES6 are a shorter way to write functions using the "=>" symbol. This makes code cleaner. These are often used in small tasks like array methods. 


#### 4) How does destructuring assignment work in ES6?
Destructuring assignment in ES6 is a way to extract values from arrays or objects and assign them to variables in a single step. With arrays it assigns elements to variables based on their position. While with objects it assigns values to variables based on property names. This makes the code shorter, cleaner and easier to read. 

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Template literals in ES6 use backticks and allow inserting variables or expressions directly with "${}". This makes code cleaner. This can span multiple lines and make dynamic strings easier to read and write.
