import { drawGraph } from "./DrawingSVG.js";

let graph_promise;
let domain = "https://dijkstraapi.azurewebsites.net/api/dijkstrahttp"
let getgraph_parameters = '?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&getgraph=true'

const fetchApi= async (url) => {
    return await fetch(url+getgraph_parameters)
    .then((res) => res.json())
  }

graph_promise = fetchApi(domain+getgraph_parameters)

graph_promise.then((graph) => {
  drawGraph(graph)
})