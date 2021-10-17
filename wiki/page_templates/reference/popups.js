
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
    top_offset=min(window.innerHeight-popup_element.getBoundingClientRect().height,top_offset)
    popup_element.style.setProperty("top",top_offset+"px")

    for(popup_content_child of popup_element.children[1].children){
        if(popup_content_child.tagName=="VIDEO"){
            if(!popup_content_child.getAttribute("has_started_loading")){
                popup_content_child.load();
                popup_content_child.setAttribute("has_started_loading","true")
            }
                    
            popup_content_child.play().then(
                (_result)=>{
                    popup_element.children[1].children[0].style.setProperty("display","none");
                }
            ).catch(err=>{})
        }

        if(popup_content_child.tagName=="OBJECT"){
            if(!popup_content_child.getAttribute("data")){
                popup_content_child.setAttribute("data",popup_content_child.getAttribute("future_data"))
            }
        }
    }
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

            //pause playback when the popup closes to not confuse the user
            for(popup_content_child of popup_element.children[1].children){
                if(popup_content_child.tagName=="VIDEO"){
                    popup_content_child.pause()
                }
            }
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

            //pause playback when the popup closes to not confuse the user
            for(popup_content_child of popup_element.children[1].children){
                if(popup_content_child.tagName=="VIDEO"){
                    popup_content_child.pause()
                }
            }
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

    target_element.addEventListener("mouseenter",open_popup)
    target_element.addEventListener("mouseleave",close_popup)
}