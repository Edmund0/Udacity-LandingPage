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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

        const navigationData = document.querySelectorAll('[data-nav]');
        const navBar = document.querySelector('#navbar__list');
    
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

        /*********************************************************************************************************/
        /* This function takes in both the Id (Anchor Link) and the Data-nav of the Section to create a List Tag */
        /*********************************************************************************************************/

        const newList = (Anchor, textData) => {

            const newAnchor = document.createElement('a');      //creates <a> element
            const newListItem = document.createElement('li');   //creates <li> element

            newAnchor.textContent = textData;                   //insert textData into <a> element
            newAnchor.setAttribute ('href', `#${Anchor}`);      //sets link to the "Id" of landing section
            newAnchor.setAttribute ('class', 'menu__link');     //includes the appropriate style class

            newListItem.appendChild(newAnchor);                 //adds anchor as the last child element of the list
            newListItem.setAttribute ('class', 'navbar__menu'); //includes the appropriate style class

            return newListItem;

        }

        const buildNav = (contentList) => {

            const navContainer = document.createElement('div');  //creates a <div> element

            for (const content of contentList) 
            {
                Anchor = content.getAttribute('id');
                textData = content.getAttribute('data-nav');

                newListItem = newList(Anchor, textData);
                navContainer.appendChild(newListItem);
                
            }

            return navContainer;

        }



        /*********************************************************************************************************/
        /* These functions add the 'active' class to the section tag in view || and remove it from all other tags*/
        /*********************************************************************************************************/
    
        const inView = (content) => {

            const {top, bottom} = content.getBoundingClientRect();
            const logic = (top >= 0) || ((top <= 0) && bottom >= (window.innerHeight)/2.5);
            return logic;

        }

        const makeActive = (contentList) => {

            /* This for loop removes the class from all section element */
            for (const content of contentList) 
            {
                    content.classList.remove('your-active-class');
            }

            /* This for loop adds the class to the first element that it finds */
            for (const content of contentList) 
            {
                if (inView(content)) {
                    content.classList.add('your-active-class');
                    break;
                } 
            }

        }

        /* This code highlights the corresponding item in the menu */
        const makeActiveNavigation = (menuList) => {

            /* This for loop removes the class from all section element */
            for (const menu of menuList) 
            {
                    menu.classList.remove('active-menu');
            }

            /* This for loop adds the class to the first element that it finds */
            for (const menu of menuList) 
            {
                let identity = menu.getAttribute('href');
                    identity = identity.substring(1);

                content = document.querySelector(`[id="${identity}"]`);

                if (inView(content)) {
                    menu.classList.add('active-menu');
                    break;
                } 
            }

        }



        /*********************************************************************************************************/
        /* These functions add the 'active' class to the section tag in view || and remove it from all other tags*/
        /*********************************************************************************************************/

        const scrollOnClick = (event, anchorLink) => {

            event.preventDefault();

            let reference = anchorLink.getAttribute('href');
            let anchorTarget = document.querySelector(reference);
            
            anchorTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            })

        }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


    // build the nav


    // Add class 'active' to section when near top of viewport


    // Scroll to anchor ID using scrollTO event





/**
 * End Main Functions
 * Begin Events
 * 
*/




        /* EventListener appends the created nav when the page loads*/
        window.addEventListener("load", () => {


            // Build menu 
            /* EventListener appends the created nav when the page loads*/
            let nav;
            nav = buildNav(navigationData);
            navBar.appendChild(nav);
            


            // Scroll to section on link click
            /* EventListener creates scroll on click*/
            let anchorLinks = document.querySelectorAll('a[href^="#"]');
            for (const anchorLink of anchorLinks) { 
                anchorLink.addEventListener('click', (event) => scrollOnClick(event, anchorLink));
            }
            /* This code must be in the event listener otherwiser anchorLinks would be empty */
    


            // Set sections as active
            /* EventListener triggers the makeActive function whenever we scroll*/
            window.addEventListener('scroll', () => {
        
                makeActive(navigationData);
                const navMenu = document.querySelectorAll('.menu__link');
                makeActiveNavigation(navMenu);
    
            })
            /* I'm sure there is a better way to do this :{ */



        });


