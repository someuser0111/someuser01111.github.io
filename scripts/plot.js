const url ="https://someuser0111.github.io/data/history/02072023.json";
const currentTrack = "Lynghaug";
const layoutConfig ={
    margin: { t: 0 },
    xaxis:{
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    },
    yaxis:{
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    }
  };

const fetchDataAndTransformToCoordinates = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json();  
        return getScoresPerPersonAsCoordinates(data, currentTrack, Object.keys(data));
    }
    catch (error) {
        console.error(`An error occured when fetching from ${this.url}. Message: ${error}`)
    }
  }
const getScoresPerPersonAsCoordinates = (data, currentTrack, names) => {
  return names.map((name) => {
    const scores = data[name][currentTrack]["scores"];
    return {
      "name": name,
      "coordinates": {
        "x": Object.keys(scores).map((el) => parseInt(el)),
        "y": Object.values(scores),
      }
    }
  });
}

// personCoordinates object format: Array<{name:string,coordinates:{x:arr<int>,y:arr<int>}}>
const toPlotlyDataFormat = (personCoordinates)=>{
    return personCoordinates.map(personCoords =>{
        return {
            x: personCoords["coordinates"]["x"],
            y: personCoords["coordinates"]["y"],
            mode: 'markers',
            name: personCoords["name"],
            type: 'scatter',
            marker: { size: 12 },
        }
    })
}

document.addEventListener("DOMContentLoaded", async () => {
  const coords = await fetchDataAndTransformToCoordinates(url);
  const plotlyData = await toPlotlyDataFormat(coords);
  const scatter = document.getElementById("tester");
  Plotly.newPlot(scatter, plotlyData, layoutConfig);
    });


