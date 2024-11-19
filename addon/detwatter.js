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

        // Check if the href attribute contains any of the target sites (and is not already marked)
        if (href && isUnsafeLink(href) && !link.dataset.emojiAdded) {
            // If the link is a twitter status
            link.innerHTML = `🤮 ${link.innerHTML} 🤮`;
            link.dataset.emojiAdded = true; // Prevents adding emojis multiple times
        }
    });
}

function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            addEmojiToUnsafeLinks();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Initial run
if (document.readyState !== 'loading') {
    addEmojiToUnsafeLinks();
    observeDOMChanges();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        addEmojiToUnsafeLinks();
        observeDOMChanges();
    });
}
