import { useEffect } from 'react';
import './App.css';
import GraphComponent from './components/graphs';
import { useState } from 'react';
import Loading from './components/loading';

function App() {
  const [minYear, setMinYear] = useState("")
  const [maxYear, setMaxYear] = useState("")
  const [data, setData] = useState()
  const [selectRegion, setSelectRegion] = useState()

  useEffect(() => {
    if (!selectRegion) {
      getData()
    } else {
      getDataByRegion()
    }
  }, [selectRegion])

  async function getData() {
    fetch("http://localhost:8000/filter?limit=10")
      .then((response) => (response.json()))
      .then(data => {
        setMinYear(Object.keys(data[0])[0])
        setMaxYear(Object.keys(data[data.length - 1])[0])
        setData(data)
      })
      .catch(err => console.log(err))

    // fetch("ttps://test-back-bj2j.onrender.com/region/group")
    //   .then((response) => (response.json()))
    //   .then(data => {
    //     setDataRegion(data)
    //   })
    //   .catch(err => console.log(err))
    return

  }
  
  async function getDataByRegion() {
    fetch(`http://localhost:8000/filter?limit=10&region=${selectRegion}`)
      .then((response) => (response.json()))
      .then(data => {
        setData(data)
        setMinYear(Object.keys(data[0])[0])
        setMaxYear(Object.keys(data[data.length - 1])[0])
      })
      .catch(err => console.log(err))
  }

  const colorRegion = {
    Asia: "#9966FF",
    Europe: "#CC99FF",
    Africa: "#CC6633",
    Americas: "#FFCC33",
    Oceania: "#FF6633"
  }

  const style = (region) => {
    return { width: "1em", height: "1em", marginRight: "5px", background: `${colorRegion[region]}`, borderRadius: "3px" }
  }

  return (
    <div >
      {data
        ?
        <div className="App">
          <h3>Population growth per country, {minYear} to {maxYear}</h3>
          <div style={{ textAlign: "left", paddingLeft: "60px" }}>
            Click on the legend to filter by continent
            <div style={{ margin: "7px 0", display: "flex", alignItems: "center" }}>
              Region {["Asia", "Europe", "Africa", "Oceania", "Americas"].map(region => (
                <button style={{
                  display: "flex", margin: "3px", cursor: "pointer", borderWidth: "0", padding: "6px", borderRadius: "4px",
                  background: `${selectRegion === region ? "#EFEFEF" : "none"}`,
                  fontSize: "medium"
                }}
                  onClick={() => {
                    setSelectRegion(previous =>
                      previous === region ? "" : region
                    )
                  }}
                >
                  <div style={style(region)}
                  />
                  <span>{region}</span>
                </button>
              ))}
            </div>
          </div>

          <GraphComponent
            data={data}
            minYear={minYear}
            maxYear={maxYear}
            color={colorRegion}
          />
        </div>
        :
        <div style={{
          minHeight: "90vh",
          display: "grid",
          justifyContent: "center",
          alignContent: "center"
        }}>
          <Loading />
        </div>
      }
    </div>
  );
}

export default App;
