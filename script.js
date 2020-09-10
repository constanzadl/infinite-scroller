const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'CR8qvpdHL9MEFrbFSOxQmI7L57uF98yfmmLGCXGSRcM';
const query = 'pastel';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

//Check if all images were loaded
function imageLoader(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
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
        console.log('total images', totalImages);
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
        const response = await fetch(apiUrl);
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
        console.log('load more');
    }
});
//On Load
getPhotos();