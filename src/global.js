const global = {}

global.size = 9; // cm

global.adjustHeight = function(){
    let clientHeight = document.documentElement.clientHeight;

    let header = document.querySelector("header");
    let headerHeight = 0;
    if(header != undefined) headerHeight = header.offsetHeight

    let footer=document.querySelector("footer");
    let footerHeight = 0;
    if(footer != undefined) footerHeight = footer.offsetHeight

    let content = document.querySelector(".content");
    content.style.minHeight = clientHeight - headerHeight - footerHeight + "px";
};

export default global