spaDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: a success response text printed on the browser's console indicating that the note has been added to the server

    Note right of browser: The browser executes client-side JavaScript code based on the single-page method, where a new note is appended to the list (notes array) and sent to the server using the POST method all without redirecting user to the spa page.