const scales = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonicMajor: [0, 2, 4, 7, 9],
    pentatonicMinor: [0, 3, 5, 7, 10],
    natural: [0, 2, 3, 5, 7, 8, 10],
    harmonic: [0, 2, 3, 5, 7, 8, 11],
    melodic: [0, 2, 3, 5, 7, 9, 11],
    majorBlues: [0, 2, 3, 4, 7, 9],
    minorBlues: [0, 3, 5, 6, 7, 10]
};

const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const chromaticRing = document.querySelector('.chromatic-ring');
const scaleRing = document.getElementById('scaleRing');
const scaleSelect = document.getElementById('scaleSelect');
const rootNoteInput = document.getElementById('rootNote');

// Helper function to create notes in a ring
function createNotes(ring, notes, radius, displayNumbers = false) {
    ring.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const angle = (360 / 12) * i;
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        const note = notes[i];
        noteDiv.textContent = note !== null ? note : '';
        noteDiv.style.transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
        ring.appendChild(noteDiv);
    }
}

// Create the chromatic ring
createNotes(chromaticRing, chromaticScale, 130);

// Update the scale ring
function updateScale() {
    const selectedScale = scaleSelect.value;
    const rootNote = parseInt(rootNoteInput.value);
    const notes = Array(12).fill(null);

    // Populate the notes array with the scale notes based on the root note
    scales[selectedScale].forEach((interval, index) => {
        notes[(interval + rootNote) % 12] = index + 1;
    });

    createNotes(scaleRing, notes, 90, true); // Adjust radius to separate the rings and display note numbers closer to the center
}

// Initial scale
updateScale();

// Update scale on selection or root note change
scaleSelect.addEventListener('change', updateScale);
rootNoteInput.addEventListener('input', updateScale);
