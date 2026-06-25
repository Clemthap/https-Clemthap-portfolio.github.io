// Clock Function
function updateClock() {
    const now = new Date();
    
    // Time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    // Date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    // Update DOM elements
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('ampm').textContent = ampm;
    document.getElementById('date-display').textContent = `${dayName}, ${monthName} ${date}, ${year}`;
    
    // Update timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('timezone-display').textContent = `${timezone}`;
}

// Location Function
function getLocation() {
    const locationText = document.getElementById('location-text');
    
    // Checking if Geolocation is supported
    if (!navigator.geolocation) {
        locationText.textContent = ' Geolocation is not supported by your browser';
        return;
    }

    // Get the user's position
    navigator.geolocation.getCurrentPosition(
        // Success callback
        async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            // Show coordinates while getting location name
            locationText.textContent = ` ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            
            // Get location name using reverse geocoding
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                );
                const data = await response.json();
                
                if (data && data.display_name) {
                    // Extract city, state, and country
                    const address = data.address;
                    const city = address.city || address.town || address.village || address.county || '';
                    const state = address.state || '';
                    const country = address.country || '';
                    
                    // Format the location string
                    let locationString = '';
                    if (city) locationString += city;
                    if (state) locationString += locationString ? `, ${state}` : state;
                    if (country) locationString += locationString ? `, ${country}` : country;
                    
                    if (locationString) {
                        locationText.textContent = ` ${locationString}`;
                    } else {
                        locationText.textContent = ` ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    }
                }
            } catch (error) {
                console.log('Error getting location name:', error);
                // Keep showing coordinates if we can't get the name
            }
        },
        // Error callback
        function(error) {
            let errorMessage = ' Location access denied. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage += 'Please allow location access in your browser settings.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage += 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage += 'Location request timed out.';
                    break;
                default:
                    errorMessage += 'An unknown error occurred.';
            }
            locationText.textContent = errorMessage;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial calls
updateClock();
getLocation();

// Recheck location every minute (in case the user moves)
setInterval(getLocation, 60000);

// IP-based location fallback (if geolocation is denied)
async function getLocationByIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data && data.city && data.country_name) {
            const locationString = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('location-text').textContent = ` ${locationString}`;
            document.getElementById('timezone-display').textContent = ` ${data.timezone || 'Unknown timezone'}`;
        }
    } catch (error) {
        console.log('IP location fallback failed:', error);
    }
}

// Modified getLocation function with fallback
function getLocationWithFallback() {
    if (!navigator.geolocation) {
        getLocationByIP();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function(position) {
            // ... (existing success code)
        },
        function(error) {
            // If geolocation is denied, try IP fallback
            document.getElementById('location-text').textContent = ' Getting location from IP...';
            getLocationByIP();
        }
    );
}

// Replace getLocation() with:
getLocationWithFallback();



// Text rotation for the subtitle
function rotateSubtitle() {
    const subtitleElement = document.querySelector('.hero-text h2');
    if (!subtitleElement) return;
    
    // Array of phrases to cycle through
    const phrases = [
        'Full Stack Developer - Intern', 'BCom Student', 'FinTech Enthusiast', 'Aspring Software Engineer'];
    
    let currentIndex = 0;
    
    // Change text every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        subtitleElement.textContent = phrases[currentIndex];
    }, 3500);
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', function() {
    rotateSubtitle();
});


// Elementary important staff
function changename(){
    let curName = document.getElementsByClassName("logo").textContent;
    curName = "Clement";
    curName.color = "red";
}
changename();


//filtering the projects
document.addEventListener("DOMContentLoaded", () => {
    // const filterButtons = document.querySelectorAll("[data-filter]");
    // const projects = document.querySelectorAll(".project-card");
    
    // filterButtons.forEach(btn => {
    //     btn.addEventListener("click", () => {
    //         const category = btn.dataset.filter;
    //         projects.forEach(project => {
    //             // Fixed the display logic
    //             if (category === "all" || project.dataset.category === category) {
    //                 project.style.display = "block";
    //             } else {
    //                 project.style.display = "none";
    //             }
    //         });
    //     });
    // });
    // getting info from a form
    const contactForm = document.getElementById("contactFrom");
    if(contactForm){
        contactForm.addEventListener("submit", function(e){
            e.preventDefault();
        
            emailjs.send("service_ywiwpxe", "template_0jj1jtw",  {
                from_name:document.getElementById("name").value,
                from_email:document.getElementById("email").value,
                message:document.getElementById("message").value
            }).then(()=> {
                document.getElementById("form-status").textContent = "Message send successfully";
                contactForm.reset();
            }).catch((err)=>{
                document.getElementById("form-status").textContent  = "Failed to send message.";
                console.log(err);
            });
        });
    }
});

/* == MOBILE MENU TOGGLE == */

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".navMenu");
    const closeBtn = document.querySelector(".nav-close");
    const sidebar = document.querySelector(".list");
    const closeByLink = document.querySelector("nav-links");

    // Create overlay dynamically
    const overlay = document.createElement("div");
    overlay.classList.add("menu-overlay");
    document.body.appendChild(overlay);

    function openMenu() {
        sidebar.style.right = "0";
        overlay.style.display = "block";


        setTimeout(() => {
            overlay.style.opacity = "0.5";
        }, 10);
    }

    function closeMenu() {
        sidebar.style.right = "-100%";
        overlay.style.opacity = "0";

        setTimeout(() => {
            overlay.style.display = "none";
        }, 300);
    }

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    closeByLink.addEventListener("click", closeMenu);
});


// Get the button
const topBtn = document.getElementById('btnTop');

// Listen for scroll events
window.addEventListener('scroll', function() {
  // If scrolled down more than 100px, show button
  if (window.scrollY > 100) {
    topBtn.classList.add('visible');
  } else {
    // At the top (Home), hide button
    topBtn.classList.remove('visible');
  }
});

// Optional: smooth scroll to top when clicked
topBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});