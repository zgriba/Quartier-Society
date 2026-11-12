// ==========================================
// H1 DISTRICT 4: IRON TRAIN LOGIC CONTROLLER
// ==========================================

// ------------------------------------------
// H2 4.1 DOM ELEMENTS MAP (THE PATCH BAY)
// ------------------------------------------
const detailButtons = document.querySelectorAll('.btn-details');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-exercise-title');
const closeButton = document.getElementById('btn-close-modal');
const modalBodyText = document.querySelector('.modal-body p');
const bgAudio = document.getElementById('district-audio');
const btnAudioToggle = document.getElementById('btn-audio-toggle');
const volumeSlider = document.getElementById('audio-volume');
// ------------------------------------------
// H2 4.2 MODAL FUNCTIONS (THE MACROS)
// ------------------------------------------

// 1. SELECT THE DOM ELEMENTS (Cablarea hardware-ului la software)
const btnOpen = document.getElementById('btn-open-workout');
const btnClose = document.getElementById('btn-close-workout');
const workoutModal = document.getElementById('workout-modal');

// 2. CREATE THE FUNCTIONS (Logica de execuție)
function openWorkoutModal() {
    // Removes the class that hides the modal
    workoutModal.classList.remove('modal-hidden');
    // Prevents the body from scrolling while modal is open
    document.body.style.overflow = 'hidden';
}

function closeWorkoutModal() {
    // Adds the hiding class back
    workoutModal.classList.add('modal-hidden');
    // Restores body scrolling ONLY if the Biomechanics modal is also closed
    if (modalOverlay.classList.contains('modal-hidden')) {
        document.body.style.overflow = 'auto';
    }
}


// 3. ATTACH EVENT LISTENERS (Trăgaciul)
// When the buttons are clicked, run the functions
btnOpen.addEventListener('click', openWorkoutModal);
btnClose.addEventListener('click', closeWorkoutModal);

// Optional: Close modal if user clicks outside the panel (on the dark overlay)
workoutModal.addEventListener('click', function (event) {
    if (event.target === workoutModal) {
        closeWorkoutModal();
    }
});

// Defines the exact steps to CLOSE the modal as a single reusable macro
const closeModal = () => {
    modalOverlay.classList.add('modal-hidden');
    // Only restore scroll if the workout modal is also closed
    if (workoutModal.classList.contains('modal-hidden')) {
        document.body.style.overflow = 'auto';
    }
    console.log('[SYS-LOG] Modal Closed.');
};

// Defines the exact steps to OPEN the modal, requiring 'title' and 'data' arguments
const openModal = (title, data) => {
    modalTitle.innerText = title;
    modalBodyText.innerText = data;
    modalOverlay.classList.remove('modal-hidden');
    // Lock scroll
    document.body.style.overflow = 'hidden';
    console.log(`[SYS-LOG] Modal Opened for: ${title}`);
};


// ------------------------------------------
// H2 4.3 EVENT LISTENERS (THE TRIGGERS)
// ------------------------------------------

// 1. OPEN SIGNAL
detailButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Skip if this is the workout protocol button
        if (button.id === 'btn-open-workout') return;

        event.preventDefault();

        const exerciseCard = event.target.closest('.exercise-card');
        if (!exerciseCard) return;

        const exerciseTitle = exerciseCard.querySelector('.exercise-title').innerText;
        const biomechanicsData = button.dataset.biomechanics || "System analysis pending...";

        // Calls the macro function and passes the extracted data
        openModal(exerciseTitle, biomechanicsData);
    });
});


// 2. CLOSE SIGNAL: The 'X' Button
// Instead of writing a new function, we just point to the closeModal macro
closeButton.addEventListener('click', closeModal);

// 3. CLOSE SIGNAL: The Overlay Click
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) closeModal(); // Look how clean this is!
});

// 4. CLOSE SIGNAL: The Escape Key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modalOverlay.classList.contains('modal-hidden')) {
        closeModal(); // Clean again!
    }
});
// ------------------------------------------
// H2 4.4 AUDIO ENGINE LOGIC
// ------------------------------------------

// 1. Initial Setup: Syncs the audio volume to the HTML slider value (0.3)
bgAudio.volume = volumeSlider.value;

// 2. Play/Pause Macro Function
const toggleAudio = () => {
    // Checks if the audio track is currently paused
    if (bgAudio.paused) {
        bgAudio.play();
        btnAudioToggle.innerText = 'PAUSE SOUND';
        console.log('[SYS-LOG] Audio Engine: PLAYING');
    } else {
        bgAudio.pause();
        btnAudioToggle.innerText = 'PLAY SOUND';
        console.log('[SYS-LOG] Audio Engine: PAUSED');
    }
};

// 3. Audio Toggle Trigger
btnAudioToggle.addEventListener('click', toggleAudio);

// 4. Volume Fader Trigger
// 'input' event fires continuously as the slider is dragged
volumeSlider.addEventListener('input', (event) => {
    bgAudio.volume = event.target.value;
    console.log(`[SYS-LOG] Audio Volume updated to: ${event.target.value}`);
});

// 5. Global Autoplay Triger (Fires only once on first interaction)
document.addEventListener('click', (event) => {
    if (bgAudio.paused) {
        bgAudio.play();
        btnAudioToggle.innerText = 'PAUSE SOUND';
        console.log('[SYS-LOG] Auto-Play Triggered by First Interaction');
    }
}, { once: true });

