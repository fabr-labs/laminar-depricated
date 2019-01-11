import { fakeFetch } from "../../../helpers/fake-fetch.js";
import { data2 } from "../../../mock-data/simple-data.js";

export function reduceFlow() { 
  return [
    { id: "id1", fn: fakeFetch, args: data2, reduce: data => data.map(val => val + 1) },
  ];
}