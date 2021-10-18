var sidebar_tabbed_references={}

function find_tabbed_section_containing_id(id){
    for(_tab of Object.keys(sidebar_tabbed_references)){
        let tab=sidebar_tabbed_references[_tab]
        let index_of_id=tab.section_list.indexOf(id)
        if(index_of_id>-1){
            return tab.id
        }
    }
    return null
}

function derive_sidebar_content(){
    //get the sidebar dom element
    let sidebar_list_container=document.getElementById("sidebar_list_container")

    for(child of document.getElementById("page_switcher").children){
        let tab_header_target=child.getAttribute("target_section")
        let tab_header_name=child.children[0].innerText
    
        let new_sidebar_list_section=document.createElement("li")
        new_sidebar_list_section.classList.add("sidebar_list_section")
    
        let new_header=document.createElement("div")
        new_header.classList.add("sidebar_tabbed_list_section_header")
        new_header.innerText=tab_header_name
    
        new_sidebar_list_section.appendChild(new_header)

        let new_tabbed_list_container=document.createElement("ul")
        new_tabbed_list_container.classList.add("sidebar_list_container")

        let current_tab_sections=[]
    
        for(element of document.getElementById(tab_header_target).children){
            //check if first element is header element
            let header=element.children[0]
            if(header.tagName!="H1" || header.innerText.length==0){
                window.alert("section "+element.id+" must have an <h1>Headline</h1> as first line!")
            }
            //get header text of this section
            header=header.innerText

            //insert horizontal line between header and text for that section
            let horizontal_seperator=document.createElement("hr")
            if(element.children.length>1){
                element.insertBefore(horizontal_seperator,element.children[1])
            }else{
                element.appendChild(horizontal_seperator)
            }

            //create the invisible span element at the beginning of the section that serves as 'sroll-to' anchor for the section
            let link_span=document.createElement("span")
            link_span.setAttribute("id",element.id+"_link")
            link_span.classList.add("link_target")
            element.insertBefore(link_span,element.children[0])


            //create sidebar entry for the current section/its header
            let new_element=document.createElement("li")
            new_element.classList.add("sidebar_tabbed_list_section")
            new_element.setAttribute("target_id",element.id)

            new_element.addEventListener("click",(event)=>{
                let target=event.target
                if(target.tagName!="LI"){
                    target=target.parentElement
                }
                if(target.tagName!="LI"){
                    target=target.parentElement
                }
                if(target.tagName!="LI"){
                    console.log(event.target,target)
                    window.alert("something went wrong (1)")
                }

                let target_tab_id=find_tabbed_section_containing_id(target.getAttribute("target_id"))
                if(!target_tab_id){
                    window.alert("something went wrong (2)")
                }
                let target_tab;
                for(tab_switcher_element of tab_switcher_ids){
                    if(tab_switcher_element.target==target_tab_id){
                        target_tab=tab_switcher_element.id
                    }
                }
                if(!target_tab){
                    window.alert("something went wrong (3)")
                }

                activate_section({target:target_tab})
                setTimeout(()=>{
                    window.location.hash="#"+target.getAttribute("target_id")+"_link"
                },10)
            })

            let new_span=document.createElement("span")
            let new_a=document.createElement("a")
            //new_a.setAttribute("href","#section"+child_num+"_link")
            new_a.innerText=header
            //new_span.setAttribute("id","span"+child_num)
            new_span.appendChild(new_a)
            new_element.appendChild(new_span)

            //add created sidebar entry to the sidebar
            new_tabbed_list_container.appendChild(new_element)

            current_tab_sections.push(element.id)
        }

        new_sidebar_list_section.appendChild(new_tabbed_list_container)

        sidebar_list_container.appendChild(new_sidebar_list_section)

        sidebar_tabbed_references[tab_header_name]={
            id:tab_header_target,
            section_list:current_tab_sections,
        }
    }
}
derive_sidebar_content()