export const drawGraph = (graph,path = []) =>{
    let connections = {"cities":[], "links":[]}
    for (let i = 0 ; i < Object.keys(graph).length; i++) {
        let conectors_keys = Object.keys(graph)
        connections["cities"].push(
          {
            "id": conectors_keys[i],
            "name": conectors_keys[i].toUpperCase()}
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
              })  
        }
      }

      if(path.length>0) {
        for(let i = 0 ; i< path.length - 1; i++){
          for(let j = 0 ; j < connections.links.length; j++) {
            if(connections.links[j].source == path[i] && connections.links[j].target == path[i+1]) {
              connections.links[j]["selected"] = true;
            }
          }
        }
      
        for(let i = 0 ; i< path.length; i++){
          for(let j= 0; j<connections.cities.length;j++){ 
            if( connections.cities[j]["id"] == path[i]){
              connections.cities[j]["selected"] = true;
            }
          }
        }
      
      }


      
    
      const width = "1500",
            height = "600",
            radius = "35";           
    
      let svg = d3.select("#d3svg")
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
    
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
        .attr("refX", 17)
        .attr("refY", -0.2)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");    
                       
    
      let link = svg.append("g")
          .selectAll("line")
          .data(connections.links)
          .enter().append("line")
          .attr("marker-end", "url(#end)")
          .style("stroke",(edge)=>{
            if("selected" in edge){
              return "brown"
            }
            return "black"
            })
          .style("stroke-width","5px")
          .on("mouseover", function(d){
            tooltip.html(`La dificultad de este camino es: `+`${d.complexity}`); 
            return tooltip.style("visibility", "visible");})
          .on("mousemove", function(){
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
          .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
      
    
      let node = svg.append("g")
          .attr("class","nodes")
          .selectAll("circle")
          .data(connections.cities)
          .enter().append("circle")
          .attr("r",radius) 
          .style("fill",(node)=>{
            if("selected" in node){
              return "brown"
            }
            return "black"
            })
          .style("stroke",(node)=>{
            if("selected" in node){
              return "brown"
            }
            return "black"
            })
          .style("stroke-width","1px")
          .style("cursor","pointer");
    
      let label =  svg.append("g")
          .attr("class","label")
          .selectAll("text")
          .data(connections.cities)
          .enter().append("text")
          .text(function(d){return d.name;})
          .attr("class","label")
          .style("text-anchor","middle")
          .style("font-size","18px")
          .style("fill","white")
          .style("cursor","pointer");
    
      var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("color", "white")
          .style("padding", "8px")
          .style("background-color", "#626D71")
          .style("border-radius", "6px")
          .style("text-align", "center")
          .style("width", "auto")
          .text("");
    
    
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

    }





