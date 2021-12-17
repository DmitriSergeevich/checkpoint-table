const SortingArrows = ({i, sortDirection, currentCol, handler}) => {
  return (
    <div id={i + '-sort'} className='column sort-arrow'
            onClick={handler}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path fill={sortDirection === 1 && currentCol === String(i) ? '#000' : '#c9c9c9' }
                d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"
              />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path fill={sortDirection === 2 && currentCol === String(i)  ? '#000' : '#c9c9c9' }
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              />
            </svg>
          </div>
  )
}

export default SortingArrows;