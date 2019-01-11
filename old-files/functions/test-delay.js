export function testDelay(id) {
  return  new Promise(resolve => {
    console.log('wait for something');
    setTimeout(function() {
      console.log(`step-${ id } do something`)
      resolve('TaDa!');
    }, 1000)
  });
}