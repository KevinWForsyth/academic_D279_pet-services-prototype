document.addEventListener('DOMContentLoaded', function () {
    let lastSearchTerm = "";
    const pages = [
        { page: 'Home', url: 'Home.html' },
        { page: 'Dogs', url: 'DogCare.html' },
        { page: 'Cats', url: 'CatCare.html' },
        { page: 'Birds', url: 'BirdCare.html' },
        { page: 'FAQ', url: 'FAQ.html' }
    ];

    // If a search term is found highlight it
    const searchTermFromUrl = new URLSearchParams(window.location.search).get('searchTerm');
    if (searchTermFromUrl) {
        highlightSearchTerm(searchTermFromUrl);
    }

    // Perform search when search button is clicked
    function performSearch() {
        const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase().trim();
        if (!searchTerm) {
            alert("Please enter a search term.");
            return;
        }

        // Remove highlight if the search term changes
        if (searchTerm !== lastSearchTerm) {
            removeHighlight();
            lastSearchTerm = searchTerm;
        }

        searchPages(searchTerm);
    }

    // Search through pages and redirect to the first match
    function searchPages(term) {
        let foundPage = null;

        // Search all pages
        const searchPromises = pages.map(pageObj => 
            fetch(pageObj.url)
                .then(response => response.text())
                .then(html => {
                    if (html.toLowerCase().includes(term)) {
                        foundPage = pageObj.url;
                    }
                })
        );

        // Redirect if a match is found
        Promise.all(searchPromises).then(() => {
            if (foundPage) {
                window.location.href = `${foundPage}?searchTerm=${term}`;
            } else {
                alert("No matches found.");
            }
        }).catch(err => console.error("Error loading the page:", err));
    }

    // Highlight search term
    function highlightSearchTerm(term) {
        const regex = new RegExp(`(${term})`, 'gi');
        const elementsToHighlight = document.body.querySelectorAll('*');

        elementsToHighlight.forEach(element => {
            if (element.innerText && regex.test(element.innerText)) {
                element.innerHTML = element.innerHTML.replace(regex, match => `<span class="highlighted">${match}</span>`);
            }
        });

        scrollToHighlighted();
    }

    // Remove any existing highlights
    function removeHighlight() {
        const highlightedElements = document.querySelectorAll('.highlighted');
        highlightedElements.forEach(element => {
            element.classList.remove('highlighted');
        });
    }

    // Scroll to the first highlight
    function scrollToHighlighted() {
        const firstHighlight = document.querySelector('.highlighted');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Event listener for search button
    const searchButton = document.querySelector('button[type="submit"]');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Allow 'Enter' key to trigger search
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Event listener to remove highlights when page is clicked
    document.addEventListener('click', function (e) {
        if (!e.target.closest('input[type="text"]') && !e.target.closest('button[type="submit"]')) {
            removeHighlight();
        }
    });
});