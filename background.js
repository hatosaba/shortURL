function onClick(info, tab) {
    chrome.tabs.sendMessage(
        tab.id, { url: info.linkUrl }
    );
}

chrome.contextMenus.create({
    id: 'SHORT',
    contexts: ["link"],
    title: "URLを短縮"
});

chrome.contextMenus.onClicked.addListener(onClick);