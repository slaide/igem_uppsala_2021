for(element of document.getElementsByClassName("page_tab_switcher")){
    for(child of element.children){
        /* add proper styling to all elements that _should_ function as section_headers */
        child.classList.add("section_header")

        function activate_section(event){
            let event_target=event.target
            if(!event_target.getAttribute("target_section")){
                event_target=event_target.parentElement
            }

            for(t_sibling of event_target.parentElement.children){
                t_sibling.classList.remove("active_tab")
            }
            event_target.classList.add("active_tab")

            let active_sections=document.getElementsByClassName("active_section")
            if(active_sections.length>1){
                window.alert("more than one section currently active, which is a bug! please report to patrick.")
            }
            if(active_sections.length==1){
                active_sections[0].classList.remove("active_section")
            }

            let target_section_id=event_target.getAttribute("target_section")
            document.getElementById(target_section_id).classList.add("active_section")
        }

        child.addEventListener("click",activate_section)
    }

    /* automatically select the first section_header on page load */
    activate_section({target:element.children[0]})
}