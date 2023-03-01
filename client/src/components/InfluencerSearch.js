import React, { useState, useEffect } from "react";

/* Here we are displaying the search results from the search bar.
If we select one collab from the results, it sends the collab to the Form so that it can prefill
the information.*/

function InfluencerSearch({ onSelect }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(`/search?q=${searchValue}`);
        if (response.ok) {
          const results = await response.json();
          setSearchResults(results);
        } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        console.log(`Server error: ${err.message}`);
      }
    }

    if (searchValue.length > 0) {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  function handleSelect(name) {
    setSearchValue(name);
    onSelect(name);
  }

  return (
    <div className="influencer-search">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search influencers"
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => handleSelect(result.name)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InfluencerSearch;

