<script purpose="derive sidebar entries from user-generated content">
            //for each child of the 'INSERT CONTENT HERE' section
            let fgfuture_content=document.getElementById("fgfuture_content")
            for(let child_num=0;child_num<fgfuture_content.children.length;child_num++){
                let element=fgfuture_content.children[child_num]
                //check if first element is header element
                if(element.tagName=="SCRIPT" || element.tagName=="STYLE"){
                    continue;
                }
                
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

                //get the sidebar dom element
                let sidebar_list_container=document.getElementById("sidebar_list_container")

                //create the invisible span element at the beginning of the section that serves as 'sroll-to' anchor for the section
                let link_span=document.createElement("span")
                link_span.setAttribute("id","section"+child_num+"_link")
                element.insertBefore(link_span,element.children[0])

                //create sidebar entry for the current section/its header
                let new_element=document.createElement("li")
                let new_span=document.createElement("span")
                let new_a=document.createElement("a")
                new_a.setAttribute("href","#section"+child_num+"_link")
                new_a.innerText=header
                new_span.setAttribute("id","span"+child_num)
                new_span.appendChild(new_a)
                new_element.classList.add("sidebar_list_section")
                new_element.appendChild(new_span)

                //add created sidebar entry to the sidebar
                sidebar_list_container.appendChild(new_element)
            }
        </script>