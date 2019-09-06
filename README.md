# Reflect Params
Get the name of parameters in JavaScript and TypeScript. Works with regular functions, arrow functions (bracketed and none) and constructors. 

## Usage

### JavaScript
```
const ReflectParams = require('reflect-params').ReflectParams;

class MyClass {
    public static createKey(id): string {
        ...
    }

    constructor(id, value) {
        ...
    }

    public setId(newId) {
        ...
    }
}

console.log(ReflectParams(MyClass.createKey)); // prints ['id']
console.log(ReflectParams(MyClass.prototype.constructor)); // prints ['id', 'value']

const myClassInstance = new MyClass('ID1', 100);
console.log(ReflectParams(myClassInstance.setId)); // prints ['newId']

console.log(ReflectParams(a => 'b')); // prints ['that']
console.log(ReflectParams((a, b, c) => 'abc')); // prints ['a', 'b', 'c']
console.log(ReflectParams(() => '')); // prints []

function myFunction(name, nationality) {
    ...
}

console.log(ReflectParams(myFunction)); // prints ['name', 'nationality']

console.log(ReflectParams('not a function')); // throws error
```

### TypeScript
```
import { ReflectParams } from 'reflect-params';

class MyClass {
    public static createKey(id: string): string {
        ...
    }

    constructor(id: string, value: number) {
        ...
    }

    public setId(newId: string) {
        ...
    }
}

console.log(ReflectParams(MyClass.createKey)); // prints ['id']
console.log(ReflectParams(MyClass.prototype.constructor)); // prints ['id', 'value']

const myClassInstance = new MyClass('ID1', 100);
console.log(ReflectParams(myClassInstance.setId)); // prints ['newId']

console.log(ReflectParams(a => 'b')); // prints ['that']
console.log(ReflectParams((a, b, c) => 'abc')); // prints ['a', 'b', 'c']
console.log(ReflectParams(() => '')); // prints []

function myFunction(name: string, nationality: string) {
    ...
}

console.log(ReflectParams(myFunction)); // prints ['name', 'nationality']

console.log(ReflectParams('not a function')); // throws error
```