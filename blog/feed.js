document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById('feed-container');
    const tumblrBlogUrl = 'https://www.tumblr.com/kaosmage-writes';  // The URL you want to fetch

    // Use CORS Anywhere to bypass CORS restrictions
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    // Construct the full URL
    const fetchUrl = proxyUrl + tumblrBlogUrl;

    // Fetch the HTML content of the Tumblr blog
    fetch(fetchUrl)
    .then(response => response.text())
    .then(data => {
        // Here you can parse the HTML content and extract the data you need.
        // For example, you can extract the blog posts from the HTML content.

        // Let's search for blog post titles using a regex or DOM parsing.
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Example: Extract all post titles (this is a simple example; adjust based on the structure of Tumblr's HTML)
        const postTitles = doc.querySelectorAll('.post .post-title'); // Update with the actual class name or structure from Tumblr's HTML
        postTitles.forEach(title => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postTitle = document.createElement('h2');
            postTitle.innerHTML = title.textContent || 'Untitled';
            postElement.appendChild(postTitle);

            feedContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching Tumblr blog:', error);
        feedContainer.innerHTML = 'Failed to load blog content.';
    });
});
