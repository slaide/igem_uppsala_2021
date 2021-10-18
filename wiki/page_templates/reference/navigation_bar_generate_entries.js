let dropdown_container=document.getElementById("dropdown-container")
for(page of pages){
    let dropdown_element=document.createElement("li")
    dropdown_element.classList.add("dropdown")

        let dropbtn_element=document.createElement("div")
        dropbtn_element.classList.add("dropbtn")
        dropbtn_element.innerText=page.name

        dropdown_element.appendChild(dropbtn_element)

        let dropdown_content=document.createElement("div")
        dropdown_content.classList.add("dropdown_content")

        for(entry of page.entries){
            let a_element=document.createElement("a")
            a_element.classList.add("navigation_dropdown_entry")
            a_element.setAttribute("href",entry.link)
            a_element.innerHTML=entry.name
            dropdown_content.appendChild(a_element)
        }

        dropdown_element.appendChild(dropdown_content)
    dropdown_container.appendChild(dropdown_element)
}