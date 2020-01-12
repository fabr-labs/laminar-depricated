import { fakeFetch } from "../../../helpers/fake-fetch.js";
import { data1 } from "../../../mock-data/simple-data.js";

export function storeFlow() { 
  return [
    { id: "id1", call: fakeFetch, args: data1, store: 'SET_DATA' },
  ];
}