chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    fetch('https://hat.f5.si/API/CREATE-V2/', {
        method: 'POST',
        body: JSON.stringify({
            type: "PHP",
            new: 1,
            url: request.url,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.response == 100, 101) {
            if (request.url.toLowerCase().startsWith('https://')) {
                navigator.clipboard.writeText(data.url);
            } else {
                const inputID = 'shortURL';
                if (document.querySelector(`#${inputID}`) === null) {
                    const $input = document.createElement('input');
                    $input.setAttribute('type', 'text');
                    $input.setAttribute('id', inputID);
                    $input.setAttribute('style', 'position: absolute; left: -100vw; top: 0');
                    document.body.appendChild($input);
                }
                const $inputDom = document.querySelector(`#${inputID}`);
                $inputDom.value = data.url;
                $inputDom.select();
                document.execCommand('copy');
            }
            alert("成功！！\nURLをクリップボードにコピーしました！")
        } else {
            if (data.code == "timeout") {
                alert("タイムアウトしました\n生成頻度が高すぎます！！")
            } else {
                alert("失敗しました\nしばらく時間をおいて再度お試しください")
            }
        }
    }) 
    sendResponse({
        value: request.url,
    });
    return true;
});