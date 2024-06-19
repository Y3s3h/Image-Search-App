const accessKey = 'HBy0leCJyWtZNyJCmzylavExCvqxr2oTeldtG8ptIOY';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.imagescontainer');
const searchInput = document.querySelector('.searchinput');
const loadmorebtn = document.querySelector('.loadmorebtn');
let page = 1;

// Fetching images from API
const fetchImages = async (query, pageno) => {
    if (pageno === 1) {
        imagesContainer.innerHTML = '';
    }

    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageno}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        if (data.results.length > 0) {
            data.results.forEach(photo => {
                const imageElement = document.createElement('div');
                imageElement.classList.add('imagediv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}">`;

                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                const overlaytext = document.createElement('h3');
                overlaytext.innerHTML = `${photo.alt_description}`;
                overlayElement.appendChild(overlaytext);

                imageElement.appendChild(overlayElement);
                imagesContainer.appendChild(imageElement);
            });

            // Show/hide Load More button based on total pages
            if (data.total_pages === pageno) {
                loadmorebtn.style.display = "none";
            } else {
                loadmorebtn.style.display = "block";
            }
        } else {
            // No images found
            imagesContainer.innerHTML = `<h2>No Image Found.</h2>`;
            loadmorebtn.style.display = "none";
        }
    } catch (error) {
        imagesContainer.innerHTML=`<h2>Failed To Fetch Images.</h2>`;
    }
};

// Adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = `<h2>Please Enter a Search Query.</h2>`;
       if(loadmorebtn.style.display ="block"){
        loadmorebtn.style.display ="none";
       }
    }
});

// Adding event listener to Load More button to fetch more pages
loadmorebtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});











