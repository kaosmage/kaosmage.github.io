// feed.js
document.addEventListener('DOMContentLoaded', function () {
    // URL of the Tumblr RSS feed
    const feedUrl = 'https://kaosmage-writes.tumblr.com/rss';

    // Function to fetch and parse the RSS feed
    function fetchRSSFeed() {
        fetch(feedUrl)
        .then(response => response.text()) // Retrieve as text
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml")) // Parse the RSS XML
        .then(data => displayFeed(data)) // Call function to handle the feed
        .catch(error => console.error('Error fetching the RSS feed:', error)); // Error handling
    }

    // Function to display the RSS feed on the page
    function displayFeed(xml) {
        const items = xml.querySelectorAll('item'); // Get all the <item> elements
        const feedContainer = document.getElementById('feed-container'); // Where to display the feed

        // Clear any previous content
        feedContainer.innerHTML = '';

        items.forEach(item => {
            const title = item.querySelector('title').textContent; // Get title of the post
            const link = item.querySelector('link').textContent; // Get link to the post
            const description = item.querySelector('description').textContent; // Get description (or summary)

        // Create a new div for each feed item
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');

        // Add the feed content
        feedItem.innerHTML = `
        <h3><a href="${link}" target="_blank">${title}</a></h3>
        <p>${description}</p>
        `;

        // Append to the container
        feedContainer.appendChild(feedItem);
        });
    }

    // Call the fetch function
    fetchRSSFeed();
});
