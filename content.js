const CLASS = 'hide-shorts-enabled';

browser.storage.local.get({ enabled: true }, ({ enabled }) => {
    document.documentElement.classList.toggle(CLASS, enabled);
});

browser.runtime.onMessage.addListener(({ enabled }) => {
    document.documentElement.classList.toggle(CLASS, enabled);
});
