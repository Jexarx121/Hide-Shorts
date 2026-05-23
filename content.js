const CLASS = 'hide-shorts-enabled';
const SUBSCRIPTION_CLASS = 'hide-shorts-subscription-enabled';
const ON_SUBSCRIPTION_PAGE_CLASS = 'on-subscriptions-class';

function updatePageClass() {
    document.documentElement.classList.toggle(ON_SUBSCRIPTION_PAGE_CLASS, location.pathname === '/feed/subscriptions');
};

// Watch for YouTube SPA navigation
const observer = new MutationObserver(updatePageClass);
observer.observe(document.querySelector('title') ?? document.documentElement, {
    childList: true, subtree: true
});
updatePageClass();

browser.storage.local.get({ enabled: true, hideInSubscriptions: false }, ({ enabled, hideInSubscriptions }) => {
    document.documentElement.classList.toggle(CLASS, enabled);
    document.documentElement.classList.toggle(SUBSCRIPTION_CLASS, hideInSubscriptions);
});

browser.runtime.onMessage.addListener((msg) => {
    if ('enabled' in msg) {
        document.documentElement.classList.toggle(CLASS, msg.enabled);
    }

    if ('hideInSubscriptions' in msg) {
        document.documentElement.classList.toggle(SUBSCRIPTION_CLASS, msg.hideInSubscriptions);
    }
});
