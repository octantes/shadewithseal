# shadewithseal

**seal** is a local tool for creating, previewing, and saving fragment shaders directly in your browser. 
no internet connection or installation required, just download the html file and it will open as a webapp.

## what it does

- write GLSL fragment shaders and see the output in real time
- record animations as `.webm` videos, freezing frames if needed
- save your shaders in folders, stored locally in your browser's storage (indexedDB)
- nothing is uploaded or downloaded — everything stays on your device

## how to use

1. open the `seal.html` file with your browser
2. click `<>` to open the code editor
3. press ▶ to run the shader
4. click ⏺ to record and auto-download the result
5. organize your shaders in folders using the 📁 button

## how it works

- everything runs entirely in the browser
- no servers, no plugins, no accounts
- uses your browser’s local storage to save data