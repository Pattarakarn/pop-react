import { useEffect } from 'react';
import './App.css';
import GraphComponent from './components/graphs';
import { useState } from 'react';

function App() {
  const [minYear, setMinYear] = useState("")
  const [maxYear, setMaxYear] = useState("")
  const [data, setData] = useState()
  // const [dataRegion, setDataRegion] = useState([]) //noData

  useEffect(() => {
    getData()
  }, [])

  async function getData() {

    fetch("https://test-back-bj2j.onrender.com")
      .then((response) => (response.json()))
      .then(data => {
        const arrCountry = new Set();
        const newData = [];
        data.map(ele => {

          if (ele.Year.length == 4) {
            const dataYearIndex = newData?.findIndex(arr => (Object.keys(arr)[0] == ele.Year))
            if (dataYearIndex < 0) {
              newData.push({ [ele.Year]: [ele] })
            } else {
              newData[dataYearIndex][ele.Year].push(ele)
            }
          }

          // if (!arrCountry.has(ele['Country name'])) {
          //   arrCountry.add(ele['Country name']);
          // }
          // setDataRegion(arrCountry)
        })

        newData?.sort((a, b) => { return Object.keys(a)[0] - Object.keys(b)[0] })
        setMinYear(Object.keys(newData[0])[0])
        setMaxYear(Object.keys(newData[newData.length - 1])[0])

        newData.map(ele => {
          Object.values(ele)[0]?.sort((a, b) => {
            return b.Population - a.Population
          })
        })
        setData(newData)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h3>Population growth per country, {minYear} to {maxYear}</h3>
      {/* Click on the legend to filter by continent */}
      <div style={{ margin: "5px 0" }}>
        {/* Region {dataRegion.map(el => el)} */}
      </div>

      <GraphComponent
        data={data}
        minYear={minYear}
        maxYear={maxYear}
      />
    </div>
  );
}

export default App;
