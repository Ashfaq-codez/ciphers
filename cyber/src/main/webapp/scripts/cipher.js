let previousCipherType = '';

function toggleInputs() {
    const cipherType = document.getElementById('cipherType').value;
    const keyInput = document.getElementById('key');
    const keyLabel = document.getElementById('keyLabel');
    const depthInput = document.getElementById('depth');
    const depthLabel = document.getElementById('depthLabel');
    const shiftNumberLabel = document.getElementById('shiftNumberLabel');
    const shiftNumberInput = document.getElementById('shiftNumber');
    const decryptedTextSection = document.getElementById('decryptedTextSection');

    // Hide decrypted text section
    decryptedTextSection.style.display = 'none';

    // Hide all input fields and labels initially
    keyInput.style.display = 'none';
    keyLabel.style.display = 'none';
    depthInput.style.display = 'none';
    depthLabel.style.display = 'none';
    shiftNumberLabel.style.display = 'none';
    shiftNumberInput.style.display = 'none';

    // Show specific input fields and labels based on the selected cipher
    if (cipherType === 'caesar') {
        shiftNumberLabel.style.display = 'block';
        shiftNumberInput.style.display = 'block';
    } else if (cipherType === 'railfence') {
        depthInput.style.display = 'block';
        depthLabel.style.display = 'block';
    } else if (cipherType === 'vigenere') {
        keyInput.style.display = 'block';
        keyLabel.style.display = 'block';
        keyInput.placeholder = 'Enter key (two characters)';
    }

    // Update previous cipher type
    previousCipherType = cipherType;
}

function encryptText() {
    const cipherType = document.getElementById('cipherType').value;
    const plainText = document.getElementById('plainText').value;
    const key = document.getElementById('key').value;
    const depth = document.getElementById('depth').value;
    const shiftNumber = document.getElementById('shiftNumber').value;
    let cipherText = '';

    switch (cipherType) {
        case 'affine':
            cipherText = affineCipher(plainText);
            break;
        case 'railfence':
            cipherText = railfenceCipher(plainText, depth);
            break;
        case 'atbash':
            cipherText = atbashCipher(plainText);
            break;
        case 'rot13':
            cipherText = rot13Cipher(plainText);
            break;
        case 'caesar':
            cipherText = caesarCipher(plainText, shiftNumber);
            break;
        case 'vigenere':
            cipherText = vigenereCipher(plainText, key);
            break;
    }

    document.getElementById('result').innerText = cipherText;
}

function decryptText() {
    const cipherType = document.getElementById('cipherType').value;
    const cipherText = document.getElementById('result').innerText;
    const key = document.getElementById('key').value;
    const depth = document.getElementById('depth').value;
    const shiftNumber = document.getElementById('shiftNumber').value;
    let decryptedText = '';

    switch (cipherType) {
        case 'affine':
            decryptedText = decryptAffineCipher(cipherText);
            break;
        case 'railfence':
            decryptedText = decryptRailfenceCipher(cipherText, depth);
            break;
        case 'atbash':
            decryptedText = decryptAtbashCipher(cipherText);
            break;
        case 'rot13':
            decryptedText = rot13Cipher(cipherText); // Rot13 is its own inverse
            break;
        case 'caesar':
            decryptedText = decryptCaesarCipher(cipherText, shiftNumber);
            break;
        case 'vigenere':
            decryptedText = decryptVigenereCipher(cipherText, key);
            break;
    }

    // Display decrypted text
    document.getElementById('decryptedText').innerText = decryptedText;

    // Show decrypted text section
    document.getElementById('decryptedTextSection').style.display = 'block';
}


function affineCipher(text) {
    const a = 5;
    const b = 8;
    const m = 26;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            const charCode = text.charCodeAt(i);
            const isUpperCase = (charCode >= 65 && charCode <= 90);
            const offset = isUpperCase ? 65 : 97;
            const x = charCode - offset;
            const encrypted = (a * x + b) % m;
            result += String.fromCharCode(encrypted + offset);
        } else {
            result += text[i];
        }
    }

    return result;
}

function railfenceCipher(text, numRails) {
    numRails = parseInt(numRails);
    if (numRails <= 1) return text;

    let rail = Array.from({ length: numRails }, () => []);
    let direction = 1;
    let row = 0;

    for (let i = 0; i < text.length; i++) {
        rail[row].push(text[i]);
        row += direction;
        if (row === 0 || row === numRails - 1) {
            direction = -direction;
        }
    }

    return rail.reduce((acc, row) => acc + row.join(''), '');
}

function atbashCipher(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            const charCode = text.charCodeAt(i);
            const isUpperCase = (charCode >= 65 && charCode <= 90);
            const offset = isUpperCase ? 65 : 97;
            result += String.fromCharCode(offset + 25 - (charCode - offset));
        } else {
            result += text[i];
        }
    }
    return result;
}

function rot13Cipher(text) {
    return text.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
            c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
        );
    });
}

function caesarCipher(text, shift) {
    shift = parseInt(shift);
    let result = '';

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            const charCode = text.charCodeAt(i);
            const isUpperCase = (charCode >= 65 && charCode <= 90);
            const offset = isUpperCase ? 65 : 97;
            result += String.fromCharCode(((charCode - offset + shift) % 26) + offset);
        } else {
            result += text[i];
        }
    }

    return result;
}

function vigenereCipher(text, key) {
    let result = '';
    key = key.toLowerCase();
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            const charCode = text.charCodeAt(i);
            const isUpperCase = (charCode >= 65 && charCode <= 90);
            const offset = isUpperCase ? 65 : 97;
            const keyCharCode = key.charCodeAt(j % key.length) - 97;
            result += String.fromCharCode(((charCode - offset + keyCharCode) % 26) + offset);
            j++;
        } else {
            result += text[i];
        }
    }

    return result;
}

function decryptAffineCipher(text) {
    const a = 5; // Multiplicative key
    const b = 8; // Additive key
    const m = 26; // Size of the alphabet
    const a_inv = modInverse(a, m); // Multiplicative inverse of a modulo m
    let result = '';

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) {
            const charCode = text.charCodeAt(i);
            const isUpperCase = (charCode >= 65 && charCode <= 90);
            const offset = isUpperCase ? 65 : 97;
            const x = charCode - offset;
            let decrypted = (a_inv * (x - b + m)) % m;
            result += String.fromCharCode(decrypted + offset);
        } else {
            result += text[i];
        }
    }

    return result;
}

function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1; // No modular inverse if this line is reached (a and m must be coprime)
}


function decryptRailfenceCipher(text, numRails) {
    numRails = parseInt(numRails);
    if (numRails <= 1) return text;

    const length = text.length;
    const rail = Array.from({ length: numRails }, () => []);
    const pos = Array.from({ length }, () => 0);
    let row = 0;
    let direction = 1;

    // Determine the position of each character in the zigzag pattern
    for (let i = 0; i < length; i++) {
        pos[i] = row;
        row += direction;
        if (row === 0 || row === numRails - 1) {
            direction = -direction;
        }
    }

    // Fill each rail with the corresponding characters from the text
    let currentIndex = 0;
    for (let i = 0; i < numRails; i++) {
        for (let j = 0; j < length; j++) {
            if (pos[j] === i) {
                rail[i].push(text[currentIndex]);
                currentIndex++;
            }
        }
    }

    // Read the characters in a zigzag pattern to reconstruct the original message
    let result = '';
    row = 0;
    direction = 1;
    for (let i = 0; i < length; i++) {
        result += rail[row].shift();
        row += direction;
        if (row === 0 || row === numRails - 1) {
            direction = -direction;
        }
    }

    return result;
}

function decryptAtbashCipher(text) {
    return atbashCipher(text); // Atbash is its own inverse
}

function decryptCaesarCipher(text, shift) {
    shift = parseInt(shift);
    return caesarCipher(text, 26 - shift); // Decryption is shifting in the opposite direction
}

function decryptVigenereCipher(text, key) {
    let result = '';
    key = key.toLowerCase(); // Ensure key is in lowercase
    let j = 0; // Key index

    for (let i = 0; i < text.length; i++) {
        if (text[i].match(/[a-z]/i)) { // Check if character is a letter
            const charCode = text.charCodeAt(i); // Get character code
            const isUpperCase = (charCode >= 65 && charCode <= 90); // Check if uppercase
            const offset = isUpperCase ? 65 : 97; // ASCII offset for A/a
            const keyCharCode = key.charCodeAt(j % key.length) - 97; // Key character code (0-25)
            const decryptedCharCode = ((charCode - offset - keyCharCode + 26) % 26) + offset; // Decryption formula
            result += String.fromCharCode(decryptedCharCode); // Convert to character
            j++; // Move to next key character
        } else {
            result += text[i]; // Non-letter characters are appended directly
        }
    }

    return result;
}


function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}
