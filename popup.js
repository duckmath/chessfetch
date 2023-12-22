const apply_button = document.getElementById('apply_button');

apply_button.addEventListener('click', () => {
    const host = document.getElementById('host').value;
    const port = document.getElementById('port').value;
    chrome.storage.local.set({ ChessFetchHost: host });
    chrome.storage.local.set({ ChessFetchPort: port });
    alert('Applied');
});

