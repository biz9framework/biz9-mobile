//Define Global Variables
var galleryColorClass, galleryViews, galleryColorClass, galleryActiveString, galleryActiveValue;
window.addEventListener('load', (event) => {
    //Set your gallery default color for selected buttons.
    var galleryColorClass = 'color-highlight'
    var galleryViews = document.querySelectorAll('.gallery-views');
    var galleryViewControls = document.querySelectorAll('.gallery-view-controls a');

    function removeSelected(el){
        galleryViewControls[0].classList.add(galleryColorClass);
        for (var i = 0; i < galleryViewControls.length; i++){galleryViewControls[i].classList.remove(galleryColorClass)}
        for (var i = 0; i < galleryViews.length; i++){galleryViews[i].removeAttribute("class"); galleryViews[i].setAttribute('class','gallery-views');}
    }
    galleryViewControls.forEach(el => el.addEventListener('click', e => {
        removeSelected(el);
        var galleryActiveString = el.getAttribute('class');
        var galleryActiveValue = galleryActiveString.split("gallery-view-");
        galleryViews[0].classList.add('gallery-view-'+galleryActiveValue[1]);
        el.classList.add(galleryColorClass);
    }));
});

var galleryFilterOptions = {};
var filterizr = new Filterizr('.gallery-filter', galleryFilterOptions);

var galleryFilterControls = document.querySelectorAll('.gallery-filter-controls li');
var galleryFilterActive = document.querySelectorAll('.gallery-filter-active');

galleryFilterControls.forEach(el => el.addEventListener('click',e =>{
    for(let i=0; i < galleryFilterControls.length; i++){galleryFilterControls[i].classList.remove('color-highlight');}
    el.classList.add('color-highlight');
}));



