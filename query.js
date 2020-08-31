console.log('in file')
if (document.querySelectorAll("iframe#cafe_main")[0].contentWindow.document.body.querySelector("iframe").src !== ""){
    console.log('Type: iframe\'s URI')
    document.querySelectorAll("iframe#cafe_main")[0].contentWindow.document.body.querySelector("iframe").src

}else{
    console.log('Type: script\'s JSON')
    document.querySelectorAll("iframe#cafe_main")[0].contentWindow.document.body.querySelector("script.__se_module_data").getAttribute("data-module")
}
