<script purpose="popup initiaiziation">
            for(element of document.getElementsByClassName("popup")){
                console.log(element.children)
                element.children[1].style.setProperty("display","none")
                element.children[1].innerHTML="<span class='popup_content_header'>"+element.children[0].innerText+"</span><br><br>"+element.children[1].innerHTML

                function open_popup(ev){
                    let element=ev.target
                    if(!element.classList.contains("popup")){
                        element=element.parentElement
                    }

                    if(element.getAttribute("vanish_timer")){
                        clearTimeout(element.getAttribute("vanish_timer"))
                    }

                    element.setAttribute("popped_up",true)
                    let element_bb=element.getBoundingClientRect()
                    element.children[1].style.setProperty("display","initial")
                    let left_offset=element_bb.x+(element_bb.width/2) // centering of popup happens in css
                    left_offset=max(element.children[1].getBoundingClientRect().width/2,left_offset) // make sure it does not leave the screen area to the left for text that is close to the left border
                    left_offset=min(window.innerWidth-(element.children[1].getBoundingClientRect().width/2),left_offset) // make sure the popup does not leave the screen area on the right
                    //the min/max caps above could probably be omitted on the wiki page since the main text area has enough padding on the left and right, but better to be safe than sorry (could also be adjusted to make sure the popup does not leave the text area, bu i do not think that it would a visual issue if it did)
                    element.children[1].style.setProperty("left",left_offset+"px")
                    element.children[1].style.setProperty("top",element_bb.bottom+"px")
                }
                function close_popup(ev){
                    let element=ev.target
                    if(!element.classList.contains("popup")){
                        element=element.parentElement
                    }

                    //small gap between link and popup content is not valid popup surface, to moving the mouse from the link to the popup content leaves the container area, which closes the popup
                    //this timeout means that the popup window is closed if the mouse is not positioned within the container area within 250ms after it left the area, ergo the popup remains visible while the mouse moves over the gap between the link and the popup
                    //and 250ms looks short enough to make it seem like the popup would still automatically vanish when the user leaves the popup area with the mouse actively, to move it somewhere else
                    element.setAttribute("vanish_timer",setTimeout(
                        ()=>{
                            element.setAttribute("popped_up",false)
                            element.children[1].style.setProperty("display","none")
                        },250
                    ))
                }

                element.addEventListener("mouseenter",open_popup)
                element.addEventListener("mouseleave",close_popup)
            }
        </script>