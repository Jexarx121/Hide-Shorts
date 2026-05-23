const toggle = document.getElementById('toggle');
const toggleSubscription = document.getElementById('toggle-subscriptions');
const subscriptionRow = document.getElementById('subscription');

browser.storage.local.get({ enabled: true }, ({ enabled }) => {
    toggle.checked = enabled;
});

// Hiding in subscriptions is false by default
browser.storage.local.get({ hideInSubscriptions: false }, ({ hideInSubscriptions }) => {
    toggleSubscription.checked = hideInSubscriptions;
})

// Goes through tabs to find active youtube tab
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    subscriptionRow.style.display = enabled ? 'flex' : 'none';
    browser.storage.local.set({ enabled });
    browser.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        browser.tabs.sendMessage(tab.id, { enabled }).catch(() => { });
    });
});

toggleSubscription.addEventListener('change', () => {
    console.log(toggleSubscription.checked);
    const hideInSubscriptions = toggleSubscription.checked;
    browser.storage.local.set({ hideInSubscriptions });
    browser.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        browser.tabs.sendMessage(tab.id, { hideInSubscriptions }).catch(() => { });
    });
})
