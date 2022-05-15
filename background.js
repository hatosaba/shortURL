function onClick(info, tab) {
    const linkUrl = info.linkUrl;
    const pattern = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g;

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