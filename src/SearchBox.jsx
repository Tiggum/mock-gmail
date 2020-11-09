import React from 'react'

const SearchBox = ({onChange}) => {
    return (
      <div>
        <label htmlFor="searchBox">Search: </label>
        <input type="text" onChange={onChange}/>
      </div>
    )
}

export default SearchBox