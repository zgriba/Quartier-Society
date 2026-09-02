// ==========================================
// H1 DISTRICT 1: CORE ENGINE INITIALIZATION
// ==========================================

// ------------------------------------------
// H2 1.1 EVENT LISTENERS (GLOBAL)
// ------------------------------------------
// Waits for the entire HTML document structure to be fully loaded and parsed
document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // H1 DISTRICT 2: GLOBAL LOGIC (ALL PAGES)
    // ==========================================
    
    // ------------------------------------------
    // H2 2.1 THE EASTER EGG MECHANIC (CYBER MODE)
    // ------------------------------------------
    const logoElement = document.getElementById("brand-logo");
    const bodyElement = document.body;

    if (logoElement) {
        logoElement.addEventListener("click", function() {
            bodyElement.classList.toggle("cyber-mode");
            console.log("System Override: Cyber Mode Toggled.");
        });
    }

    // ==========================================
    // H1 DISTRICT 3: COMPASS LOGIC (DISTRICT 3 ONLY)
    // ==========================================
    
    // ------------------------------------------
    // H2 3.1 ADVANCED VEHICLE TELEMETRY
    // ------------------------------------------
    // Target the specific injection points (hooks) in the HTML
    const tempElement = document.getElementById("live-temp");
    const humElement = document.getElementById("live-hum");
    const statusElement = document.getElementById("live-status");
    const humBar = document.getElementById("humidity-bar");
    
    // GPS & Dynamics Hooks
    const latElement = document.getElementById("live-lat");
    const longElement = document.getElementById("live-long");
    const headingElement = document.getElementById("live-heading");
    const pitchElement = document.getElementById("live-pitch");
    const rollElement = document.getElementById("live-roll");

    // Safety Check: Run this logic ONLY if we are on the District 3 page
    if (tempElement && humElement && statusElement && latElement) {
        
        // Initialize base values for the simulation (Făgăraș Mountains offroad run)
        let currentTemp = 14.5;
        let currentHum = 77;
        let currentLat = 45.94320;
        let currentLong = 24.96680;
        
        // Vehicle Dynamics starting states
        let currentHeading = 342;
        let currentPitch = 12;
        let currentRoll = -4;

        // The Engine Loop: Runs every 2000 milliseconds (2 seconds)
        setInterval(function() {
            // 1. Atmosphere Calculation
            let tempFluctuation = (Math.random() * 0.4) - 0.2;
            let humFluctuation = Math.floor((Math.random() * 5) - 2); 
            
            // 2. GPS Calculation (Micro-movements simulating driving)
            let latFluctuation = (Math.random() * 0.00020) - 0.00010;
            let longFluctuation = (Math.random() * 0.00020) - 0.00010;

            // 3. Vehicle Dynamics Calculation (Simulating rough terrain)
            // Heading shifts slightly left/right (steering)
            let headingFluctuation = Math.floor((Math.random() * 5) - 2);
            // Pitch and Roll shift up/down simulating suspension movement over rocks
            let pitchFluctuation = Math.floor((Math.random() * 3) - 1);
            let rollFluctuation = Math.floor((Math.random() * 3) - 1);

            // Apply fluctuations
            currentTemp += tempFluctuation;
            currentHum += humFluctuation;
            currentLat += latFluctuation;
            currentLong += longFluctuation;
            currentHeading += headingFluctuation;
            
            // Constrain Pitch and Roll so the car doesn't visually "flip"
            currentPitch = Math.max(-20, Math.min(30, currentPitch + pitchFluctuation));
            currentRoll = Math.max(-15, Math.min(15, currentRoll + rollFluctuation));

            // Boundaries to keep humidity realistic (between 40% and 99%)
            if (currentHum > 99) currentHum = 99;
            if (currentHum < 40) currentHum = 40;

            // Inject the calculated numbers back into the HTML elements
            tempElement.textContent = currentTemp.toFixed(1);
            humElement.textContent = currentHum;
            latElement.textContent = currentLat.toFixed(5);
            longElement.textContent = currentLong.toFixed(5);
            headingElement.textContent = currentHeading + "°";
            
            // Add a plus sign for positive pitch/roll to look more technical
            pitchElement.textContent = (currentPitch > 0 ? "+" : "") + currentPitch + "°";
            rollElement.textContent = (currentRoll > 0 ? "+" : "") + currentRoll + "°";

            // DATA BINDING: Connect the humidity number to the CSS width of the bar
            if (humBar) {
                humBar.style.width = currentHum + "%";
            }

            // Simple logic to change system status based on temperature
            if (currentTemp < 14.0) {
                statusElement.textContent = "TERRAIN WARNING";
                statusElement.style.color = "var(--color-accent-unbroken)"; 
            } else {
                statusElement.style.color = "var(--color-accent-compass)"; 
                statusElement.textContent = "SYSTEM NOMINAL";
            }
        }, 2000);
    }

    // ------------------------------------------
    // H2 3.2 DYNAMIC STOREFRONT GENERATION
    // ------------------------------------------
    const storeContainer = document.getElementById("dynamic-store");

    if (storeContainer) {
        const gearDatabase = [
            {
                name: "All-Terrain Mud Tires",
                description: "Heavy-duty grip for untamed roads.",
                price: "$1,200",
                link: "#"
            },
            {
                name: "Tactical Expedition Tent",
                description: "Weather-proof shelter for off-grid nights.",
                price: "$450",
                link: "#"
            },
            {
                name: "Portable Condenser Mic",
                description: "Capture storytelling rhymes anywhere.",
                price: "$299",
                link: "#"
            }
        ];

        gearDatabase.forEach(function(product) {
            let productCard = document.createElement("article");
            productCard.classList.add("district-card");
            
            // Re-apply inline logic for layout specifically meant for Light Theme
            productCard.style.padding = "30px";
            productCard.style.display = "flex";
            productCard.style.flexDirection = "column";
            productCard.style.textAlign = "left"; 

            productCard.innerHTML = `
                <h3 style="color: var(--color-text-primary); margin-bottom: 10px; font-size: 1.2rem;">${product.name}</h3>
                <p style="color: var(--color-text-muted); flex-grow: 1; margin-bottom: 20px; font-size: 0.9rem;">${product.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--color-accent-compass); font-weight: bold; font-size: 1.1rem;">${product.price}</span>
                    <a href="${product.link}" style="color: var(--color-text-primary); text-decoration: none; font-size: 0.85rem; border: 1px solid var(--color-glass-border); padding: 6px 16px; border-radius: 4px; transition: background-color 0.3s ease;">Acquire</a>
                </div>
            `;

            storeContainer.appendChild(productCard);
        });
    }

});