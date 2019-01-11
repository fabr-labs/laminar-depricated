

/**
 * 
 * pushFlow
 * asyncPushFlow
 * flushFlow(id)
 * flowMiddleware
 * protocolMiddleware
 * reset
 * set
 * back
 * 
 * instance - userFlow()
 * 
 */

// import { stepThing } from "some/path.js"


// export function createUserFlow() {
//   const flows = [];

// }

// export function someflow({ x, y }) {

// return [
//     { step: "doTheThing",  fn: () => stepThing(x, y) },
//     { step: "fetchTheThing",  fn: () => stepThing(x, y), store: "UPDATE_THE_THING" },
//   ]
// }


const testRoute = () => {
  return new Map([
    ['loadProductList', { // sload products list
      flow: firstSteps,
      next: 'firstPage',
      back: false  
    }],
    ['firstPage', { // show products list
      flow: firstSteps,
      next: 'loadProduct',
      back: false  
    }],
    ['load-product', { // load product
      flow: firstSteps,
      next: 'secondPage',
      back: 'firstPage'  
    }],
    ['secondPage', { // show product
      flow: firstSteps,
      next: 'thirdPage',
      back: 'firstPage'  
    }],
    ['thirdPage', { // buy product
      flow: firstSteps,
      next: false,
      back: 'secondPage' 
    }]
  ]);
};

// const FlowPointer = class {
//   // initialis
// }

function testDelay(id) {
  return  new Promise(resolve => {
    console.log('wait for something');
    setTimeout(function() {
      console.log(`step-${ id } do something`);
      resolve('TaDa!');
    }, 1000);
  });
}



const firstSteps = () => [
  { fn: console.log, args: 'step-1 changePage first-page' },
  { fn: flow.pushFlow, args: { steps: secondSteps() }},
  { fn: console.log, args: 'step-6 changePage first-page' },
  { fn: testDelay, args: 7 },
  { fns: [{ fn: console.log, args: ('step-8 do something') },  { fn: console.log, args: ('step-9 do something') }] }
];

const secondSteps = () => [
  { fn: console.log, args: 'step-2 changePage first-page' },
  { fn: console.log, args: 'step-3 changePage first-page' },
  { fn: testDelay, args: 4 },
  { fn: () => console.log('step-5 do something') }
];

// import { applyMiddleware } from './apply-middleware.js'

const testMiddleware = next => args => {

  console.log('testMiddleware args', args);

  let result = next(args);

  console.log('testMiddleware - result', result);

  return result;

};

function applyMiddleware(fn, middlewares) {
  return middlewares.reduce((fn, middleware) => middleware(fn), fn);
}

//// Module
/////////////////////////////////////////

function createUserFlow({ middleware=[] }) {

  function* runSteps({ steps }){
    for (let step of steps) {
      try {
        switch (true) {
          case !!step.fn:
            yield applyMiddleware(step.fn, middleware)(step.args);
            break;
    
          case !!step.fns:
            yield Promise.all(step.fns.map(asyncStep => applyMiddleware(asyncStep.fn, middleware)(asyncStep.args)));
            break;
        
          default:
            return console.error('Missing core directive', step);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async function pushFlow({ steps }) {
    for (let step of runSteps({ steps })) {
      const result = await step;
      console.log(result);
    }
  }

  return {
    pushFlow
  };
}

//// External
/////////////////////////////////////////


const middleware = [testMiddleware];
const flow = createUserFlow({ middleware });
flow.pushFlow({ steps: firstSteps() });
// console.log('beep boop')

// function createUserFlowStack() {

//   const flowData = {
//     steps: []
//   }

//   // Use destructuring to grab first value of the itterable
//   // const [[, initiator]] = flow;
//   // const initialSteps = initiator.steps();

//   function flowMap(flow){
//     // const 
//   }

//   function* stackGenerator(){
//     const [[, initiator]] = flow;
//     const initialSteps = initiator.steps();
//     for (step in initialSteps) {

//     }
//   }

//   for (let o of stackGenerator()) {
//     console.log(o);
//     // expected output: 1
  
//     break; // closes iterator, triggers return
//   }

//   return {
//     flow,
//     next, 
//     back
//   }
// }
// // const step = flow.find(step => step.state === 'p' || step.state === undefined || step.state === 'r')

// console.log('HEY!')


    // for (let step of flowStack) {
    //   let response = yield step.fn();

    //   switch (response.type) {
    //     case pushFlow:
    //       console.log('Pushong flow')
    //       stack = [...stack, response.steps];
    //       break;

    //     case idle:
    //       console.log('Idle')
    //       const nextFlow = yield;
    //       stack = [...stack, response.steps];
    //       break;
      
    //     default:
    //       break;
    //   }
    // }