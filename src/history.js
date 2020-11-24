const history = {};

history.store=function(data){
    if(localStorage.getItem("sizer_history")==undefined){
        localStorage.setItem("sizer_history", "[]");
    }
    let oldData = JSON.parse(localStorage.getItem("sizer_history"));
    oldData.push(data);
    localStorage.setItem("sizer_history", JSON.stringify(oldData));
}

history.clear=function(){
    localStorage.removeItem("sizer_history");
}

history.read=function(){
    if(localStorage.getItem("sizer_history")==undefined){
        localStorage.setItem("sizer_history", "[]");
    }
    return JSON.parse(localStorage.getItem("sizer_history"));
}

export default history