window.electron.onMessage((message) => {
    document.getElementById("message").innerText = message;
});