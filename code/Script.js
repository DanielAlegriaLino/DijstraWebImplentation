import { drawGraph } from "./DrawingSVG.js";
import { saveRecord,updateHtmlTable } from "./HistoryManage.js";

const domain = "https://dijkstraapi.azurewebsites.net/api/dijkstrahttp"
let getgraph_parameters = '?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&getgraph=true&none='

let graph_promise;

const fetchApi= async (url,params) => {
  return await fetch(url+params)
  .then((res) => res.json())
}

const svg = document.getElementById("d3svg")
const button_calculate_route = document.getElementById("button_calculate_route")
const history = document.getElementById('table-box')

window.addEventListener("load", () => {
  updateHtmlTable("table-box")
  graph_promise = fetchApi(domain.concat(getgraph_parameters))
  graph_promise.then((graph) => {
    svg.innerHTML=''
    drawGraph(graph)
  })
})

button_calculate_route.addEventListener("click", () =>{
  let start = document.getElementById("start").value.toLowerCase();
  let goal = document.getElementById("goal").value.toLowerCase();
  let getpath_parameters =  `?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&start=${start}&goal=${goal}&none=`
  let getcomplexity_parameters = `?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&start=${start}&goal=${goal}&getdistance=true&uwu=`
  let path_promise = fetchApi(domain+getpath_parameters)
  let complexity_promise = fetchApi(domain+getcomplexity_parameters)
  graph_promise.then((graph) => {
    path_promise.then((path) =>{
      complexity_promise.then((complexity)=>{
        saveRecord(start, goal,complexity)
        svg.innerHTML=''
        drawGraph(graph,path)
        updateHtmlTable("table-box")
      })
    })
  })
  
})





