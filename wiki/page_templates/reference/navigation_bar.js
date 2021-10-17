function open_navbar(){
    document.getElementById("navigation_bar").classList.add("fully_open")
    document.getElementById("pagecontent").classList.add("blurred_navigation_bar_open")
    //this is broken. blurring the main element makes the scrolly things lose their position setting
    for(element of document.getElementsByClassName("scroll_thing")){
        element.style.setProperty("filter","blur(15px)")
    }
}
function close_navbar(){
    document.getElementById("navigation_bar").classList.remove("fully_open")
    document.getElementById("pagecontent").classList.remove("blurred_navigation_bar_open")
    //this is broken. blurring the main element makes the scrolly things lose their position setting
    for(element of document.getElementsByClassName("scroll_thing")){
        element.style.setProperty("filter","initial")
    }
}

/* open/close navigation bar while scrolling */
window.addEventListener("wheel",(ev)=>{
    let scroll_height=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset
    if(and(ev.deltaY>0,scroll_height>(window.innerHeight*0.5 + 16 /* scroll height has passed parallax top and login bar (which offsets parallax image) */))){
        document.getElementById("dropdown-container").classList.remove("scrolled_down")
    }else{
        document.getElementById("dropdown-container").classList.add("scrolled_down")
    }
})

function highlight_current_topic_in_navbar(){
    const match_path_text=window.location.pathName || ""
    const match_path_length=match_path_text.length
    for(element of document.getElementsByClassName("dropdown_content")){
        for(child of element.children){
            //const match_path_text="/Team:Uppsala/Model"
            if(child.getAttribute("href").substr(-match_path_length)==match_path_text){
                child.classList.add("current_topic")
            }
        }
    }
}