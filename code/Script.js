import { drawGraph } from "./DrawingSVG.js";

let graph_promise;
let path_promise
let domain = "https://dijkstraapi.azurewebsites.net/api/dijkstrahttp"
let getgraph_parameters = '?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&getgraph=true&none='

const fetchGraph= async (url,params) => {
    return await fetch(url+params)
    .then((res) => res.json())
  }


graph_promise = fetchGraph(domain.concat(getgraph_parameters))

const svg = document.getElementById("d3svg")
const button_calculate_route = document.getElementById("button_calculate_route")


button_calculate_route.addEventListener("click", () =>{
  let start = document.getElementById("start").value.toLowerCase();
  let goal = document.getElementById("goal").value.toLowerCase();
  let getpath_parameters =  `?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&start=${start}&goal=${goal}&none=`
  path_promise = fetchGraph(domain+getpath_parameters)
  console.log(path_promise)
  graph_promise.then((graph) => {
    path_promise.then((path) =>{
      svg.innerHTML=''
      drawGraph(graph,path)
    })
  })
})


graph_promise.then((graph) => {
  svg.innerHTML=''
  drawGraph(graph)
})


