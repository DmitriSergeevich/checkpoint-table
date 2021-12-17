import axios from "axios"
import { useEffect, useState } from "react"
import Table from "./components/Table"
import Weather from "./components/Weather/Weather"
import { dataHandler } from "./utils/utils"

const App = () => {
  const [dataTable, setDataTable] = useState([])
  const [weatherDate, setWeatherDate] = useState(0)

  useEffect(()=>{
    axios.get('./MOCK_DOK.json')
    .then(res => setDataTable(dataHandler(res.data)))
  },[])

  return (
    <>
      {
        weatherDate
          ? <Weather date={weatherDate} setWeatherDate={setWeatherDate} />
          : null
      }
      <Table dataTable={dataTable} setWeatherDate={setWeatherDate} />
      
      
    </>
  )
}

export default App;