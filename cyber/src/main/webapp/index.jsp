<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cipher Techniques</title>
    <script src="scripts/cipher.js"></script>
   <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa; /* Light gray */
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
        }
        header {
            background-color: #007bff; /* Soft blue */
            color: white;
            padding: 20px;
            width: 100%;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            font-size: 24px;
            font-weight: bold;
        }
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 30px;
        }
        .card {
            background: #fff; /* White */
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin: 20px;
            padding: 30px;
            width: 320px;
            text-align: center;
            transition: transform 0.3s;
        }
        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        h1 {
            margin: 0;
            font-size: 28px;
            color: #007bff; /* Soft blue */
        }
        label {
            display: block;
            margin: 20px 0 10px;
            font-weight: bold;
            color: #555;
        }
        select,
        input[type="text"],
        input[type="number"] {
            width: calc(100% - 24px); /* Adjusted width */
            padding: 12px;
            margin: 10px 0 20px;
            border: 1px solid #ddd;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 16px;
        }
        input[type="button"] {
            background-color: #007bff; /* Soft blue */
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            width: calc(100% - 24px); /* Adjusted width */
            font-size: 16px;
            margin-top: 10px; /* Add margin-top */
        }
        input[type="button"]:hover {
            background-color: #0056b3; /* Darker shade of blue */
        }
        #result {
            background-color: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            word-break: break-all;
            border: 1px solid #ddd;
            font-size: 16px;
            color: #333;
        }
       
         /* Customizing the dropdown */
select.custom-select {
    width: calc(100% - 24px);
    padding: 12px;
    margin: 10px 0 20px;
    border: 1px solid #007bff; /* Soft blue */
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, #007bff 50%), linear-gradient(135deg, #007bff 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
}
 .card#decryptedTextSection {
            display: none; /* Initially hide the decrypted text section */
            margin-top: 20px;
        }

        #decryptedText {
            background-color: #f0f0f0; /* Light gray background */
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #007bff; /* Blue border */
            font-size: 18px;
            color: #333; /* Dark text color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
            margin-top: 20px;
            word-break: break-all; /* Break long words if needed */
        }
    </style>
</head>
<body>
    <header>
        Cipher Techniques
    </header>
    <div class="container">
        <div class="card">
            <h1>Plaintext</h1>
            <label for="plainText">Enter plain text:</label>
            <input type="text" id="plainText" name="plainText">
        </div>
        <div class="card">
            <h1>Encode</h1>
            <label for="cipherType">Choose a cipher:</label>
            <select id="cipherType" name="cipherType" onchange="toggleInputs()" class="custom-select">
    <option value="affine">Affine Cipher</option>
    <option value="railfence">Railfence Cipher</option>
    <option value="atbash">Atbash Cipher</option>
    <option value="rot13">ROT13 Cipher</option>
    <option value="caesar">Caesar Cipher</option>
    <option value="vigenere">Vigenère Cipher</option>
</select>

            <div id="additionalInputs">
                <label for="key" id="keyLabel" style="display:none;">Enter key:</label>
                <input type="text" id="key" name="key" placeholder="Enter key (two characters)" style="display:none;">
                <label for="depth" id="depthLabel" style="display:none;">Enter depth:</label>
                <input type="number" id="depth" name="depth" style="display:none;" placeholder="Enter depth">
                <label for="shiftNumber" id="shiftNumberLabel" style="display: none;">Enter shift number:</label>
                <input type="number" id="shiftNumber" name="shiftNumber" style="display: none;" placeholder="Enter shift number">
            </div>
            <input type="button" value="Encrypt" onclick="encryptText()">
        </div>
        <div class="card" id="decryptedTextSection" style="display: none;">
            <h1>Decrypted Text</h1>
            <div id="decryptedText"></div>
        </div>
        <div class="card">
            <h1>Ciphertext</h1>
            <div id="result"></div>
            <input type="button" value="Decrypt" onclick="decryptText()">
        </div>
    </div>

</body>
</html>
