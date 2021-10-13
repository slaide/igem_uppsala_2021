
function open_popup(ev){
    let element=ev.target

    let target_id=element.getAttribute("popup")
    let popup_element=document.getElementById(target_id)
    popup_element.style.setProperty("display","initial")

    if(popup_element.getAttribute("vanish_timer")){
        clearTimeout(popup_element.getAttribute("vanish_timer"))
    }

    let element_bb=element.getBoundingClientRect()
    let left_offset=element_bb.x+(element_bb.width/2) // centering of popup happens in css
    popup_element.style.setProperty("left",left_offset+"px")

    let top_offset=element_bb.top+element_bb.height
    popup_element.style.setProperty("top",top_offset+"px")
}
function close_popup(ev){
    let element=ev.target

    let target_id=element.getAttribute("popup")
    let popup_element=document.getElementById(target_id)

    //small gap between link and popup content is not valid popup surface, to moving the mouse from the link to the popup content leaves the container area, which closes the popup
    //this timeout means that the popup window is closed if the mouse is not positioned within the container area within 250ms after it left the area, ergo the popup remains visible while the mouse moves over the gap between the link and the popup
    //and 250ms looks short enough to make it seem like the popup would still automatically vanish when the user leaves the popup area with the mouse actively, to move it somewhere else
    popup_element.setAttribute("vanish_timer",setTimeout(
        ()=>{
            popup_element.setAttribute("popped_up",false)
            popup_element.style.setProperty("display","none")
        },250
    ))
}
function keep_open_popup(ev){
    let popup_element=ev.target

    if(popup_element.getAttribute("vanish_timer")){
        clearTimeout(popup_element.getAttribute("vanish_timer"))
    }
}
function close_popup_self(ev){
    let popup_element=ev.target

    popup_element.setAttribute("vanish_timer",setTimeout(
        ()=>{
            popup_element.setAttribute("popped_up",false)
            popup_element.style.setProperty("display","none")
        },250
    ))
}

for(element of document.getElementsByClassName("popup")){
    let target_attribute=element.getAttribute("target")

    target_element=document.getElementById(target_attribute)
    if(!element.id){
        window.alert("popup does not have an id! check console for more info.")
        console.log("popup does not have an id!",element)
    }
    target_element.setAttribute("popup",element.id)

    element.addEventListener("mouseenter",keep_open_popup)
    element.addEventListener("mouseleave",close_popup_self)

    element.style.setProperty("display","none")
    console.log(element)

    target_element.addEventListener("mouseenter",open_popup)
    target_element.addEventListener("mouseleave",close_popup)
}