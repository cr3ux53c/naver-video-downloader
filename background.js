chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: 'cafe.naver.com'}}),
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: 'blog.naver.com'}}),
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});