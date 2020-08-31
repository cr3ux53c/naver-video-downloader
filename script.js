chrome.tabs.executeScript({
    code: 'document.querySelectorAll(\'iframe#cafe_main\')[0].contentWindow.document.body.querySelector("iframe").src'
}, function (res) {
    console.log(res[0].split('?')[1].split('&'));
    search_param = new URLSearchParams(res[0].split('?')[1]);
    console.log(search_param.get("vid"));
    console.log(search_param.get("inKey"));

    let query_string = new URLSearchParams('key=&videoId=')
    query_string.set('videoId', search_param.get("vid"))
    query_string.set('key', search_param.get("inKey"))
    query_string = 'https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/' + search_param.get("vid") + '?' + query_string.toString()
    fetch_json(query_string)
});


function fetch_json(url) {
    fetch(url, {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain',
        }
    }).then(
        function (res) {
            console.log(res.json().then(
                function (res) {
                    // console.log(res.videos)
                    // console.log(res.videos.list)
                    // console.log(res.videos.list.length)
                    // console.log(res.videos.list[0])
                    // console.log(res.videos.list[0].source)

                    for (let i = 0; i < res.videos.list.length; i++) {
                        let download_link = document.createElement('a');
                        download_link.setAttribute('href', res.videos.list[i].source);
                        download_link.setAttribute('target', '_blank');
                        download_link.appendChild(document.createTextNode('Download video as a' + res.videos.list[i].encodingOption.name));
                        document.getElementById('btn_space').appendChild(download_link)
                        document.getElementById('btn_space').appendChild(document.createElement('br'))
                    }
                })
            )
        }
    )
}