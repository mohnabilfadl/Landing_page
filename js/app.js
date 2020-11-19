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

function isInViewPort(ele)
{
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
    
    for (const section of sections){

    const li = document.createElement("li");
    const liLink = document.createElement('a');
    const liText = document.createTextNode(section.getAttribute("data-nav"));
    
    liLink.classList.add("menu__link");
    liLink.href = '#'+section.id;

    liLink.appendChild(liText);
    li.appendChild(liLink);
    nFragment.appendChild(li)
    }

navBar.appendChild(nFragment);
}



// Add class 'active' to section when near top of viewport

function setActive () {
    window.addEventListener('scroll', function (event) {
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


    });
}


// When user scrolls 20px down from the top

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
        //remove section highlight on the top of the page
        document.querySelector("section").style.cssText=null
    }
}




// Scroll to anchor ID using scrollTO event





/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
buildMenu();

// Scroll to section on link click
//scrollToSection();

// Set sections as active
setActive();


//add event to top button

topButton.addEventListener('click' , function(){
    scrollTo({
        top:0,
        behavior:"smooth",
    })
})

// remove top button on the top of the page untill 20px down from the top
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
        //remove section highlight on the top of the page
        document.querySelector("section").style.cssText=null
    }
}



