let graph_promise;
let domain = "https://dijkstraapi.azurewebsites.net/api/dijkstrahttp"
let getgraph_parameters = '?code=PNYvobtS0QSQr-n7akHmfv-ZYqcbf0k08mGjSfjC3H3nAzFuadZrUw%3D%3D&getgraph=true'

const fetchApi= async (url) => {
    return await fetch(url+getgraph_parameters)
    .then((res) => res.json())
  }

graph_promise = fetchApi(domain+getgraph_parameters)

let connections = {"cities":[], "links":[]}

graph_promise.then((graph) => {
  for (let i = 0 ; i < Object.keys(graph).length; i++) {
    let conectors_keys = Object.keys(graph)
    connections["cities"].push(
      {"id": conectors_keys[i] ,"name": conectors_keys[i].toUpperCase()}
    )    
  
    for(let j = 0; j< Object.keys(graph[conectors_keys[i]]).length; j++){
      let conected_keys = Object.keys(graph[conectors_keys[i]])
      let node_conector = conectors_keys[i]
      let node_conected = conected_keys[j]
      let weight = graph[node_conector][conected_keys[j]]
      connections["links"].push(
        {
          "source":node_conector,
          "target":node_conected,
          "complexity": weight,
        }
      )
    }
 
  }


  const width = "1500",
        height = "600",
        radius = "35";           

  let svg = d3.select("#d3svg")
      .append("svg")
      .attr("width",width)
      .attr("height",height);

      var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("link",d3.forceLink().id(d=>d.id).distance(100))
      .force('charge', d3.forceManyBody()
        .strength(-1900)
        .theta(0.5)
        .distanceMax(1500)
      )
      .force('collision', d3.forceCollide().radius(function(d) {
              return d.radius
            }))
            .force("center", d3.forceCenter(document.querySelector("#d3svg").clientWidth / 2, document.querySelector("#d3svg").clientHeight / 2));
            
  let arrows = svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");                   

  let link = svg.append("g")
      .selectAll("line")
      .data(connections.links)
      .enter().append("line")
      .attr("marker-end", "url(#end)"); 

      link
      .style("stroke","#aaa")
      .style("stroke-width","5px")

  let node = svg.append("g")
      .attr("class","nodes")
      .selectAll("circle")
      .data(connections.cities)
      .enter().append("circle")
      .attr("r",radius);

  node 
      .style("fill","black")
      .style("stroke","#424242")
      .style("stroke-width","1px")
      .style("cursor","pointer");

  let label =  svg.append("g")
      .attr("class","label")
      .selectAll("text")
      .data(connections.cities)
      .enter().append("text")
      .text(function(d){return d.name;})
      .attr("class","label")

  label 
      .style("text-anchor","middle")
      .style("font-size","18px")
      .style("fill","white")
      .style("cursor","pointer");



  function ticked(){
    link
      .attr("x1",function(d){return d.source.x;})
      .attr("y1",function(d){return d.source.y;})
      .attr("x2",function(d){return d.target.x;})
      .attr("y2",function(d){return d.target.y;});
    
    node 
      .attr("cx",function(d){return d.x+5;})
      .attr("cy",function(d){return d.y-3;});

    label
      .attr("x",function(d){return d.x;})
      .attr("y",function(d){return d.y;});
  }

  simulation
    .nodes(connections.cities)
    .on("tick",ticked);

  simulation.force("link")
    .links(connections.links)



})
