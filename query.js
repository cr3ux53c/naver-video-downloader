console.log('hello')
console.log(window.location.hostname)

if (window.location.hostname === 'cafe.naver.com'){
    console.log('Cafe')
    if (document.querySelectorAll("iframe#cafe_main")[0].contentWindow.document.body.querySelector("iframe").src !== '') {
        console.log('Type: iframe\'s URI')
        result = document.querySelectorAll(
            "iframe#cafe_main")[0].contentWindow.document.body.querySelector(
            "iframe").src

    } else {
        console.log('Type: script\'s JSON')
        result = document.querySelectorAll(
            "iframe#cafe_main")[0].contentWindow.document.body.querySelector(
            "script.__se_module_data").getAttribute("data-module")
    }
}else if (window.location.hostname === 'blog.naver.com'){
    console.log('Blog')
    if (document.querySelectorAll("iframe#mainFrame").length === 0){
        result = document.querySelectorAll("div#postListBody script.__se_module_data")[0].getAttribute('data-module')
    }else{
        result = document.querySelectorAll("iframe#mainFrame")[0].contentWindow.document.body.querySelectorAll("div#postListBody script.__se_module_data")[0].getAttribute('data-module')
    }
}else{
    console.assert(false)
}
