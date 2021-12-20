import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";
import { addDragToElement, filter } from "../utils/utils";
import Pagination from "./Pagination/Pagination";
import PersonRow from "./PersonRow/PersonRow";
import SortingArrows from "./SortingArrows/SortingArrows";

const Table = ({dataTable, setWeatherDate}) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filtredData, setFiltredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCol, setCurrentCol] = useState(null);
  const [sortDirection, setSortDirection] = useState(0);
   
  const table = useRef(null);

  const itemsPerPage = 10;
  const lastUserIndex = currentPage * itemsPerPage;
  const firstUserIndex = lastUserIndex - itemsPerPage;
  const currentItems = filtredData.slice(firstUserIndex, lastUserIndex);
  const pagesCount = Math.ceil(filtredData.length / itemsPerPage);
  
  const debounceSetSearchTerm = debounce(setSearchTerm);
  
  const stickyStyles = {
    stickyLeft: 'sticky sticky-left table-colored-item__blue',
    stickyRight: 'sticky sticky-right table-colored-item__blue'
  }

  const weatherButtonHandler = (event) => {
    const id = event.target.id.split('-')[0]
    setWeatherDate(id)
  }
  const sortButtonHandler = (event) => {
    const id = event.currentTarget.id.split('-')[0];

    if (id === currentCol) {
      sortDirection === 2
        ? setSortDirection(0)
        : setSortDirection(sortDirection + 1)
    } else if(id === '31' ) {
      setCurrentCol(id);  
    } else {
      setCurrentCol(id);
      setSortDirection(1)
    }
  }
  const getDayOfTheMonth = () => {
    const days = [];
    for(let i = 1; i <= 31; i++) {      
      days.push(
        <th key={i}
          className="table-header-cell table-colored-item__blue">
          <div className="row" >
            <div id={i+'-weather'}
              className='table-header-cell-num'
              onClick={ weatherButtonHandler }
            >
              {i}
            </div>
            <SortingArrows i={i}
              sortDirection={sortDirection}
              currentCol={currentCol}
              handler={sortButtonHandler}
            />
          </div>
        </th>
      )
    }
    return days;
  }
  const inputHandler = (event) => {
    debounceSetSearchTerm(event.target.value);
    setInputValue(event.target.value);
  }

  useEffect(()=>{
    setFiltredData(filter(dataTable, searchTerm, currentCol, sortDirection))
  }, [dataTable, searchTerm, currentCol, sortDirection])
  
  useEffect(()=>{
    addDragToElement(table.current)
  }, [])
  
  return(
    <>
    <div className="table-wrapper" ref={table}>
      <table>
        <thead>
          <tr>
            <th className={`table-header-cell ${stickyStyles.stickyLeft}`}>
              <div>Users</div>
              <input
                placeholder="нийти сотрудника"
                value={inputValue}
                onChange={inputHandler}>
              </input>
            </th>
            {getDayOfTheMonth()}
            <th className={`table-header-cell ${stickyStyles.stickyRight}`}>
              <div className="row" >
                <div>Monthly total</div>
                <SortingArrows i={'32'}
                sortDirection={sortDirection}
                currentCol={currentCol}
                handler={sortButtonHandler}
                />
              </div>          
            </th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map(data =>
              <PersonRow data={data} styles={stickyStyles} key={data.id}/>
            )
          }
        </tbody>
      </table>
    </div>
    {
      pagesCount > 1
      ? (<Pagination
        currentPage={currentPage}
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage} />)
      : null
    }
    </>
  )
}

export default Table;