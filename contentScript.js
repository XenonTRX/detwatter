function addEmojiToUnsafeLinks() {
    // Define the target sites
    const targetSites = [
      "http://twitter.com",
      "https://twitter.com",
      "http://x.com",
      "https://x.com"
    ];

    // Get all the links on the page
    const links = document.querySelectorAll('a');

    // Function to check if a link points to an unsafe site
    function isUnsafeLink(href) {
        return targetSites.some(site => href.includes(site));
    }

    // Iterate through each link
    links.forEach(link => {
        const href = link.getAttribute('href');

        // Check if the href attribute contains any of the target sites
        if (href && isUnsafeLink(href)) {
            // Add the emoji in front of the link text
            link.innerHTML = `💩 ${link.innerHTML}`;
        }
    });
}

// Execute the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addEmojiToUnsafeLinks);
