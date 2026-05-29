const CLASS = 'hide-shorts-enabled';
const SUBSCRIPTION_CLASS = 'hide-shorts-subscription-enabled';
const ON_SUBSCRIPTION_PAGE_CLASS = 'on-subscriptions-class';

let isEnabled = true;
let isSubscriptionEnabled = true;

function applyState() {
    document.documentElement.classList.toggle(CLASS, isEnabled);
    document.documentElement.classList.toggle(SUBSCRIPTION_CLASS, isSubscriptionEnabled);
}

function updatePageClass() {
    document.documentElement.classList.toggle(ON_SUBSCRIPTION_PAGE_CLASS, location.pathname === '/feed/subscriptions');
}

// Watch for YouTube SPA navigation
const navObserver = new MutationObserver(updatePageClass);
navObserver.observe(document.querySelector('title') ?? document.documentElement, {
    childList: true, subtree: true
});
updatePageClass();

// Re-apply our classes if YouTube's init code removes them from <html>
const classObserver = new MutationObserver(() => {
    if (document.documentElement.classList.contains(CLASS) !== isEnabled ||
        document.documentElement.classList.contains(SUBSCRIPTION_CLASS) !== isSubscriptionEnabled) {
        applyState();
    }
});
classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
});

// Optimistically hide immediately to prevent flash; storage read corrects if disabled
document.documentElement.classList.add(CLASS);

browser.storage.local.get({ enabled: true, hideInSubscriptions: true }, ({ enabled, hideInSubscriptions }) => {
    isEnabled = enabled;
    isSubscriptionEnabled = hideInSubscriptions;
    applyState();
});

browser.runtime.onMessage.addListener((msg) => {
    if ('enabled' in msg) {
        isEnabled = msg.enabled;
    }
    if ('hideInSubscriptions' in msg) {
        isSubscriptionEnabled = msg.hideInSubscriptions;
    }
    applyState();
});
