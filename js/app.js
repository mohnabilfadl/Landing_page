/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const topButton = document.getElementById('top_button');

//Creating a new document fragment

const nFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//  A helper function to determine if an element is in the view port
// reference: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/



function isInViewPort(ele){
    let bounding = ele.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// check which element is active
function getActiveElement() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};


// build the nav
function buildMenu() {
    
    for (const sec of sections){

        const li = document.createElement("li");

        li.className = 'menu__link';
        li.dataset.nav = sec.id;
        li.innerText = sec.dataset.nav;

    
        nFragment.appendChild(li)
    }

navBar.appendChild(nFragment);
}



// Add class 'active' to section when near top of viewport

function setActive () {
    window.addEventListener('scroll', function () {
        let section = getActiveElement();
        
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: goldenrod";

        // set other sections as inactive
        for (let item of sections) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
                item.style.cssText = null;
            };
            
        };

//**--------------MODIFIED----------------
        // set corresponding header style
        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('active__link');

        // remove from other headers
        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {

            if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    
    });
}



//--------------MODIFIED------------------
// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navBar.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();   
    });
};






/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildMenu();




// Set sections as active
setActive();


// Scroll to section on link click
scrollToClick();


//add event To top button

topButton.addEventListener('click' , function(){
    scrollTo({
        top:0,
        behavior:"smooth",
    })
})




