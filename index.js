var penguinPromise = d3.json("classData.json");

var getImage = function(penguin){
    return "imgs/" + penguin.picture;
}

var getHomeworkGrade = function(homework){
    return homework.grade
}
var getHomework = function(penguin){
    return penguin.homework.map(getHomeworkGrade)
}
var getHomeworkAvg = function(penguin){
    return d3.mean(getHomework(penguin))
}
var getFinalGrade = function(final){
    return final.grade
}

var getFinal = function(penguin){
    return penguin.quizes.map(getFinalGrade)
}


var drawPlot = function(penguin,screen,xScale,yScale){
    d3.select("#graph")
    .selectAll("circle")
    .data(penguin)
    .enter()
    .append("circle")
    .attr("cx",function(penguin){
        return xScale(getHomeworkAvg(penguin));
    })
    .attr("cy",function(penguin){
        return yScale(getFinal(penguin));
    })
    .attr("r",4)
    .attr("fill", "blue")
    .on("mouseenter", function(penguin){
            console.log("hovering");
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;
            d3.select("#tooltip")
            .classed("hidden", "false")
            .style("top", yPos+"px")
            .style("left", xPos+"px")
        
            d3.select("#tooltip")
            .append("img")
            .attr("src",getImage(penguin))
    })
}

var initGraph = function(penguin){
    
    var screen = {width:600,height:600};
    
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height);
    
    
    var xScale = d3.scaleLinear()
        .domain([0,550])
        .range([0,screen.width]);
    
    var yScale = d3.scaleLinear()
        .domain([0,550])
        .range([screen.height,0]);
    
    drawPlot(penguin,screen,xScale,yScale);
}

var successFCN = function(penguin){
    console.log("student data", penguin);
    initGraph(penguin);
    
}

var failFCN = function(errorMSG){
    console.log(errorMSG)
}

penguinPromise.then(successFCN, failFCN)