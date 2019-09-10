# Laminar flow controllers

### Core concepts:.

A laminar flow controller steps through arrays of instructions (called flows), and dispatches each step in turn, each after the last has completed. If the function being called by the step returns a promise, the controller will wait for the promise to complete before dispatching the next step. 

Each step is a plain javascript object, and each property on the object is a directive. Directives add functionality to the steps and allow us to declaratively describe what we want the step to do.  

Basic anatomy of a step:
```JavaScript
{ id: 'myFirstStep', call: someFunction, args: { someArg: true }}
```
When the time comes for this step to be executed, the function will be called with the args object passed as the first and only argument. i.e. 
```
someFunction({ someArg: true });
```
OK, so far, so pretty basic!

The call directive can also take asynchronous functions that return a promise as a value.  When this happens each step will wait for the promise to complete before starting the next step. 

So, in this way, we can execute asynchronous code in a synchronous way.

But what about actually executing asynchronous code when we don't care about order of execution?

Instead of using the call directive we can pass an array of steps to the calls directive. This time, the flowController will wait for all the steps to return before executing the next. 

This works for synchronous and asynchronous functions (à la Promise.all).

```JavaScript
{
  id: 'myFirstAsyncStep', calls: [
    { id: 'aStep', call: someFunc, args: { one: 1 },
    { id: 'anotherStep', call: anotherFunc, args: { two: 2 }}}
  ]
}
```

## Installation: 
```
yarn add coach-logic/laminar#laminar-v<latest-version>-gitpkg
```

## Cutting a new release:
```
npm version major|minor|patch
```
*On cutting a new release, `gitpkg` automatically generates an installable package and uploads it to a git tag with the following format* 
```
laminar-v<latest-version>-gitpkg
```