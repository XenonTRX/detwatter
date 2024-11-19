function addEmojiToUnsafeLinks() {

    // Define the target sites
    const targetSites = [
        "http://twitter.com",
        "http://www.twitter.com",
        "https://twitter.com",
        "https://www.twitter.com",
        "http://x.com",
        "http://www.x.com",
        "https://x.com",
        "https://www.x.com"
    ];

    // Get all the links on the page
    const links = document.querySelectorAll('a');

    // Function to check if a link points to an unsafe site
    function isUnsafeLink(link) {
        const href = link.getAttribute('href');

        if ( !href ) {
            return 0;
        }

        if ( link.dataset.emojiAdded ) {
            return 0;
        }

        for ( let targetSite of targetSites ) {
            if ( href.startsWith( targetSite ) ) {
                // Check if the link content is empty or only contains an SVG element
                const isEmptyContent = !link.textContent.trim();
                const onlySVG = link.children.length === 1 && link.querySelector('svg');

                // Return the action to be performend.
                // Try to infer if the link is just a share link and in that case remove it completely
                if ( isEmptyContent || onlySVG ) {
                    return 2;
                } else {
                    return 1;
                }
            }
        }
        return 0
    }

    // Iterate through each link
    links.forEach(link => {
        const href = link.getAttribute('href');

        const action = isUnsafeLink(link)
        if ( action === 1 ) {
            link.innerHTML = `🤮 ${link.innerHTML} 🤮`;
            link.dataset.emojiAdded = true; // Prevents adding emojis multiple times
        }
        else if ( action === 2 ) {
            link.remove();
        }
    });
}

function observeDOMChanges() {
    let debounceTimeout;
    // Add a delay in case of high DOM mutation rate
    const observer = new MutationObserver((mutations) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            addEmojiToUnsafeLinks();
        }, 500);
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
