let ROWS, COLS;
const wordToInsert = "";
const wordVisibilityDuration = 3000; // 3 seconds

function updateDimensions() {
    ROWS = Math.floor(window.innerHeight / 19);
    COLS = Math.floor(window.innerWidth / 27);
}

function clearScreen() {
    document.getElementById('matrix-container').textContent = '';
}

function printMatrix(matrix) {
    document.getElementById('matrix-container').textContent = matrix.map(row => row.join('  ')).join('\n');
}

function insertWord(matrix, word, visible) {
    for (let i = 0; i < word.length; i++) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * (COLS - word.length + 1));
        matrix[row].fill(' ', col, col + word.length);
        if (visible) {
            matrix[row].splice(col, word.length, ...word.split(''));
        }
    }
}

function updateMatrix(matrix) {
    matrix.pop();
    matrix.unshift(Array(COLS).fill(' ').map(() => String.fromCharCode(Math.floor(Math.random() * 94) + 33)));
}

function printAsciiArt() {
    // Add your ASCII art here
}

function main() {
    updateDimensions();
    let matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
    let isVisible = false;

    function update() {
        clearScreen();
        updateMatrix(matrix);
        printAsciiArt();
        printMatrix(matrix);
    }

    setInterval(update, 100);

    setInterval(() => {
        isVisible = !isVisible;
        for (let i = 0; i < 5; i++) {
            insertWord(matrix, wordToInsert, isVisible);
        }
    }, wordVisibilityDuration);

    window.addEventListener('resize', () => {
        updateDimensions();
        matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
        update();
    });
}

main();