const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'CR8qvpdHL9MEFrbFSOxQmI7L57uF98yfmmLGCXGSRcM';
const query = 'pastel';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoader(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//Helper Function to Set Attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
//Create Elements to Display
function displayPhotos() {
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        totalImages = photosArray.length;
        //Create anchor
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create image
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener for each is finished loading
        img.addEventListener('load', imageLoader);
        //Put img inside anchor and put the inside the image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Get Photos from Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(proxyUrl + apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        //catch error
    }
}
//Check to see if scrolling is near bottom, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
//On Load
getPhotos();