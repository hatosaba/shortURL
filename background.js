function onClick(info, tab) {
    const linkUrl = info.linkUrl;
    const pattern = /http(s)?:\/\//;

    if (!linkUrl.match(pattern)) return; 

    chrome.tabs.sendMessage(
        tab.id, { url: linkUrl }
    );
}

chrome.contextMenus.create({
    id: 'SHORT',
    contexts: ["link"],
    title: "URLを短縮"
});

chrome.contextMenus.onClicked.addListener(onClick);
