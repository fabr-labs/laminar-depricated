export function delayFn(data, delay=100) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(data);
    }, delay);
  });
}