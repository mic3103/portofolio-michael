// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
            this.setAttribute('aria-expanded', expanded);
            navbar.classList.toggle('active');
        });
    }
});

// Typewriter effect
const roles = ["WEB DEVELOPER", "VIDEO EDITOR", "MUSIC PRODUCER", "UI/UX DESIGNER"];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 100;

function typeEffect() {
    const typewriter = document.getElementById("typewriter");
    if (!typewriter) return;

    if (!isDeleting && charIndex < roles[index].length) {
        currentText += roles[index][charIndex];
        charIndex++;
        setTimeout(typeEffect, speed);
    } else if (isDeleting && charIndex > 0) {
        currentText = currentText.slice(0, -1);
        charIndex--;
        setTimeout(typeEffect, speed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            index = (index + 1) % roles.length;
        }
        setTimeout(typeEffect, 1000);
    }

    typewriter.innerHTML = `<mark style="background-color: #22e6e2ff; color:#005461;">${currentText}</mark>`;
}

// Tab switching functionality
function initTabs() {
    const tabs = document.querySelectorAll('.link-tab');
    const panels = document.querySelectorAll('.tab-isi');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and panel
            this.classList.add('active');
            const activePanel = document.getElementById(tabId);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}

// Sort awards by year (newest first)
function sortAwards() {
    const awardsList = document.querySelector("#awards ul");
    if (!awardsList) return;
    
    let awardsItems = Array.from(awardsList.children);
    
    awardsItems.sort((a, b) => {
        let yearA = parseInt(a.querySelector("strong")?.textContent || "0");
        let yearB = parseInt(b.querySelector("strong")?.textContent || "0");
        return yearB - yearA;
    });
    
    awardsList.innerHTML = "";
    awardsItems.forEach(item => awardsList.appendChild(item));
}

// Sort education by year
function sortEducation() {
    const eduList = document.querySelector("#education ul");
    if (!eduList) return;
    
    let eduItems = Array.from(eduList.children);
    
    eduItems.sort((a, b) => {
        let textA = a.querySelector("strong")?.textContent || "";
        let textB = b.querySelector("strong")?.textContent || "";
        
        let getYear = (text) => {
            if (text.includes("Present")) return Infinity;
            let years = text.match(/\d{4}/g);
            return years ? Math.max(...years.map(Number)) : 0;
        };
        
        let yearA = getYear(textA);
        let yearB = getYear(textB);
        
        return yearB - yearA;
    });
    
    eduList.innerHTML = "";
    eduItems.forEach(item => eduList.appendChild(item));
}

// Sort experience by year
function sortExperience() {
    const expList = document.querySelector("#experience ul");
    if (!expList) return;
    
    let expItems = Array.from(expList.children);
    
    expItems.sort((a, b) => {
        let textA = a.querySelector("strong")?.textContent || "";
        let textB = b.querySelector("strong")?.textContent || "";
        
        let extractYear = (text) => {
            let years = text.match(/\d{4}/g);
            return years ? Math.max(...years.map(Number)) : 0;
        };
        
        let yearA = extractYear(textA);
        let yearB = extractYear(textB);
        
        return yearB - yearA;
    });
    
    expList.innerHTML = "";
    expItems.forEach(item => expList.appendChild(item));
}

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.hidden');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('show');
        }
    });
}

// Header scroll hide/show dengan initial state yang benar
let prevScrollpos = window.pageYOffset;
let ticking = false;

function handleHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    
    let currentScrollPos = window.pageYOffset;
    
    // Make sure header is visible on initial load
    if (currentScrollPos <= 10) {
        header.style.top = "20px";
        header.style.opacity = "1";
        header.style.visibility = "visible";
    } 
    // Scrolling down
    else if (prevScrollpos > currentScrollPos) {
        header.style.top = "20px";
        header.style.opacity = "1";
        header.style.visibility = "visible";
    } 
    // Scrolling up
    else {
        header.style.top = "-100px";
        header.style.opacity = "0";
        header.style.visibility = "hidden";
    }
    
    prevScrollpos = currentScrollPos;
    ticking = false;
}

// Optimized scroll handler with requestAnimationFrame for smoothness
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            handleHeaderScroll();
            revealOnScroll(); // Call revealOnScroll here too
            ticking = false;
        });
        ticking = true;
    }
});

// Ensure header is visible on page load
document.addEventListener("DOMContentLoaded", () => {
    // Initialize header visibility
    const header = document.getElementById("site-header");
    if (header) {
        header.style.top = "20px";
        header.style.opacity = "1";
        header.style.visibility = "visible";
    }
    
    // Initialize all other functions
    typeEffect();
    initTabs();
    sortAwards();
    sortEducation();
    sortExperience();
    revealOnScroll();
    initShowMoreButtons();
    
    // Set initial scroll position
    prevScrollpos = window.pageYOffset;
});

// Also handle when page is refreshed with hash
window.addEventListener('load', function() {
    const header = document.getElementById("site-header");
    if (header) {
        header.style.top = "20px";
        header.style.opacity = "1";
        header.style.visibility = "visible";
    }
    
    // If there's a hash in URL, scroll smoothly to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initTabs();
    sortAwards();
    sortEducation();
    sortExperience();
    revealOnScroll();
});


// Show More / Show Less functionality for Awards and Works
function initShowMoreButtons() {
    // Initialize limited view for awards
    const awardsList = document.querySelector('#awards .awards-list');
    if (awardsList) {
        awardsList.classList.add('limited');
    }
    
    // Initialize limited view for works
    const worksList = document.querySelector('#works .works-list');
    if (worksList) {
        worksList.classList.add('limited');
    }
    
    // Get all show more buttons
    const showMoreBtns = document.querySelectorAll('.show-more-btn');
    
    showMoreBtns.forEach(btn => {
        // Remove any existing event listeners by cloning
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const targetId = this.getAttribute('data-target');
            const targetList = document.querySelector(`#${targetId} .${targetId}-list`);
            
            if (targetList) {
                if (targetList.classList.contains('limited')) {
                    // Show all items
                    targetList.classList.remove('limited');
                    this.textContent = 'Show Less';
                } else {
                    // Show only first 3 items
                    targetList.classList.add('limited');
                    this.textContent = 'Show All ' + (targetId === 'awards' ? 'Awards' : 'Works');
                }
            }
        });
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initTabs();
    sortAwards();
    sortEducation();
    sortExperience();
    revealOnScroll();
    initShowMoreButtons(); // Add this line
});

// Update sortAwards function to preserve show more functionality
function sortAwards() {
    const awardsList = document.querySelector("#awards .awards-list");
    if (!awardsList) return;
    
    let awardsItems = Array.from(awardsList.children);
    
    awardsItems.sort((a, b) => {
        let yearA = parseInt(a.querySelector("strong")?.textContent || "0");
        let yearB = parseInt(b.querySelector("strong")?.textContent || "0");
        return yearB - yearA;
    });
    
    // Preserve the limited class while reordering
    const wasLimited = awardsList.classList.contains('limited');
    awardsList.innerHTML = "";
    awardsItems.forEach(item => awardsList.appendChild(item));
    if (wasLimited) {
        awardsList.classList.add('limited');
    }
}

// Update sortWorks function (new)
function sortWorks() {
    const worksList = document.querySelector("#works .works-list");
    if (!worksList) return;
    
    // Works are already in good order, but we can keep as is
    // This function can be extended if sorting by year is needed
}

// Update sortEducation function to preserve show more
function sortEducation() {
    const eduList = document.querySelector("#education ul");
    if (!eduList) return;
    
    let eduItems = Array.from(eduList.children);
    
    eduItems.sort((a, b) => {
        let textA = a.querySelector("strong")?.textContent || "";
        let textB = b.querySelector("strong")?.textContent || "";
        
        let getYear = (text) => {
            if (text.includes("Present")) return Infinity;
            let years = text.match(/\d{4}/g);
            return years ? Math.max(...years.map(Number)) : 0;
        };
        
        let yearA = getYear(textA);
        let yearB = getYear(textB);
        
        return yearB - yearA;
    });
    
    eduList.innerHTML = "";
    eduItems.forEach(item => eduList.appendChild(item));
}

// Update sortExperience function to preserve show more
function sortExperience() {
    const expList = document.querySelector("#experience ul");
    if (!expList) return;
    
    let expItems = Array.from(expList.children);
    
    expItems.sort((a, b) => {
        let textA = a.querySelector("strong")?.textContent || "";
        let textB = b.querySelector("strong")?.textContent || "";
        
        let extractYear = (text) => {
            let years = text.match(/\d{4}/g);
            return years ? Math.max(...years.map(Number)) : 0;
        };
        
        let yearA = extractYear(textA);
        let yearB = extractYear(textB);
        
        return yearB - yearA;
    });
    
    expList.innerHTML = "";
    expItems.forEach(item => expList.appendChild(item));
}