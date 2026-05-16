const toggle = document.getElementById('toggle');

browser.storage.local.get({ enabled: true }, ({ enabled }) => {
    toggle.checked = enabled;
});

// Goes through tabs to find active youtube tab
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    browser.storage.local.set({ enabled });
    browser.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        browser.tabs.sendMessage(tab.id, { enabled }).catch(() => { });
    });
});
