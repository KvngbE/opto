document.addEventListener("DOMContentLoaded", function () {
    // Get the search input and all catalogue items
    const searchInput = document.getElementById("search-input");
    const catalogueItems = document.querySelectorAll(".catalogue-item");
  
    // Listen for input events on the search field
    searchInput.addEventListener("input", function () {
      // Convert search query to lowercase for case-insensitive matching
      const filterText = searchInput.value.toLowerCase();
  
      // Loop through each catalogue item
      catalogueItems.forEach(item => {
        // Get the title and description (converted to lowercase)
        const title = item.getAttribute("data-title").toLowerCase();
        const description = item.getAttribute("data-description").toLowerCase();
  
        // Check if the search query is included in the title or description
        if (title.includes(filterText) || description.includes(filterText)) {
          item.style.display = "block"; // Show item (adjust based on your layout, e.g., "flex" if using flexbox)
        } else {
          item.style.display = "none";  // Hide item
        }
      });
    });
  });

  

 