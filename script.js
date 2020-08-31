chrome.tabs.executeScript({
    file: '/query.js'
}, function (res) {
    console.log('in Callback')

    if (res[0].toString().substr(0, 4) === 'http') {
        console.log(res[0].split('?')[1].split('&'));
        search_param = new URLSearchParams(res[0].split('?')[1]);
        qs_vid = search_param.get("vid")
        qs_inkey = search_param.get("inKey")
    } else {
        res = JSON.parse(res)['data']
        console.log(res)
        qs_vid = res['vid']
        qs_inkey = res['inkey']
    }

    let query_string = new URLSearchParams('key=&videoId=')
    query_string.set('videoId', qs_vid)
    query_string.set('key', qs_inkey)
    query_string = 'https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/' + qs_vid + '?' + query_string.toString()
    console.log('query: ' + query_string)
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
            res.json().then(
                function (res) {
                    console.log(res.videos)
                    console.log(res.videos.list)
                    console.log(res.videos.list.length)
                    console.log(res.videos.list[0])
                    console.log(res.videos.list[0].source)

                    for (let i = 0; i < res.videos.list.length; i++) {
                        let download_link = document.createElement('a');
                        download_link.setAttribute('href', res.videos.list[i].source);
                        download_link.setAttribute('target', '_blank');
                        download_link.appendChild(document.createTextNode('Download video as a' + res.videos.list[i].encodingOption.name));
                        document.getElementById('btn_space').appendChild(download_link)
                        document.getElementById('btn_space').appendChild(document.createElement('br'))
                    }
                }
            )
        }
    )
}