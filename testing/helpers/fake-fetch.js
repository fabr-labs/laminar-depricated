export function fakeFetch(data) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(data);
    }, 100);
  });
}