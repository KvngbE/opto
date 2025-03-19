document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchResultsContainer = document.getElementById("search-results");
    
    // List of pages (URLs) where catalog items reside
    const pages = [
      "store.html"
    ];
    
    // Cache to avoid re-fetching pages on every query
    const pageItemsCache = {};
  
    // Function to fetch and extract catalogue items from a given page URL
    async function fetchPageItems(url) {
      if (pageItemsCache[url]) {
        return pageItemsCache[url];
      }
      try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        // Assumes catalog items are marked with class "catalogue-item"
        const items = Array.from(doc.querySelectorAll(".catalogue-item"));
        pageItemsCache[url] = items;
        return items;
      } catch (err) {
        console.error("Error fetching " + url, err);
        return [];
      }
    }
  
    // Function to search through all pages' items
    async function searchItems(query) {
      // Clear previous results
      searchResultsContainer.innerHTML = "";
      let allItems = [];
      
      // Fetch items from each page
      for (let url of pages) {
        const items = await fetchPageItems(url);
        allItems = allItems.concat(items);
      }
      
      // Normalize the query for case-insensitive comparison
      const lowerQuery = query.toLowerCase();
      // Filter items based on data-title and data-description attributes
      const filteredItems = allItems.filter(item => {
        const title = (item.getAttribute("data-title") || "").toLowerCase();
        const description = (item.getAttribute("data-description") || "").toLowerCase();
        return title.includes(lowerQuery) || description.includes(lowerQuery);
      });
      
      // Display the filtered items in the results container
      if (filteredItems.length === 0) {
        searchResultsContainer.innerHTML = "<p>No items found.</p>";
      } else {
        filteredItems.forEach(item => {
          // Clone the node to import it from the fetched document into the current DOM
          const clonedItem = item.cloneNode(true);
          searchResultsContainer.appendChild(clonedItem);
        });
      }
    }
  
    // Listen for input events on the search box
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim();
      if (query === "") {
        searchResultsContainer.innerHTML = "";
      } else {
        searchItems(query);
      }
    });
  });
  