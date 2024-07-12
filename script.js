$(document).ready(function() {
    /*load images based on selected category*/
    function loadImages(category) {
        $('#gallery').empty();
        if (category) {
            fetchRedditImages(category);
        }
    }
    /*fetch images from a specified subreddit and display them in the gallery*/
    function fetchRedditImages(subreddit) {
        /* name of the subreddit to fetch images from*/
        fetch(`https://www.reddit.com/r/${subreddit}/.json`)
            .then(response => response.json())
            .then(data => {
                data.data.children.forEach(item => {
                    try {
                        const img = document.createElement("img");
                        img.src = item.data.thumbnail;
                        //valid image URL check
                        if (img.src !== "self" && img.src !== "default" && img.src !== "image") { 
                            $('#gallery').append(`<div class="gallery-item"><img src="${img.src}" alt="Reddit Image"></div>`);
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                });
            })
            .catch(error => console.log('Error fetching data:', error));
    }

    /*event handler for filter button clicks*/
    $('.filter-btn').click(function() {
        const subreddit = $(this).data('category');
        loadImages(subreddit);
    });
    /*event handler for for clicking on a gallery image*/
    $('#gallery').on('click', '.gallery-item img', function() {
        const src = $(this).attr('src');
        $('#lightbox-img').attr('src', src);
        $('#lightbox').fadeIn();
    });
    /*event handler for clicking outside the lightbox image*/
    $('#lightbox').click(function(event) {
        if (!$(event.target).closest('#lightbox-img').length) {
            $('#lightbox').fadeOut();
        }
    });
    /*event handler for clicking close button in the lightbox*/
    $('.close').click(function() {
        $('#lightbox').fadeOut();
    });

    // Initial load of a default subreddit
    loadImages('memes');
});
