chrome.tabs.executeScript({
    // code: 'document.querySelectorAll(\'iframe#cafe_main\')[0].contentWindow.document.body.querySelector("iframe").src'
    code: 'document.querySelectorAll("iframe#cafe_main")[0].contentWindow.document.body.querySelector("script.__se_module_data").getAttribute("data-module")'
}, function (res) {
    res = JSON.parse(res)['data']
    console.log(res)
    // console.log(res[0].split('?')[1].split('&'));
    // search_param = new URLSearchParams(res[0].split('?')[1]);
    // console.log(search_param.get("vid"));
    // console.log(search_param.get("inKey"));
    console.log(res['vid'])
    console.log(res['inkey'])

    let query_string = new URLSearchParams('key=&videoId=')
    query_string.set('videoId', res['vid'])
    query_string.set('key', res['inkey'])
    query_string = 'https://apis.naver.com/rmcnmv/rmcnmv/vod/play/v2.0/' + res['vid'] + '?' + query_string.toString()
    console.log(query_string)
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
                })
            )
        }
    )
}