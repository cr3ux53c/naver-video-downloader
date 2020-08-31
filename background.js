chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: 'cafe.naver.com'}}),
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: 'blog.naver.com'}}),
                new chrome.declarativeContent.PageStateMatcher({pageUrl: {hostEquals: 'extensions'}})
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});