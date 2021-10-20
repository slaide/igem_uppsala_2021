function nextSlide(slideshow_id) {
    let slideshow_element=document.getElementById(slideshow_id)
    let current_slide_id=slideshow_element.getAttribute("current_slide_id")
    let number_of_slides=slideshow_element.getAttribute("number_of_slides")

    let new_slide_id=current_slide_id+1

    if(new_slide_id==number_of_slides){
        new_slide_id=0
    }

    let old_slide_element=slideshow_element.children[current_slide_id]
    let new_slide_element=slideshow_element.children[new_slide_id]

    showSlide(slideshow_element,old_slide_element,new_slide_element);
}

function previousSlide(slideshow_id) {
    let slideshow_element=document.getElementById(slideshow_id)
    let current_slide_id=slideshow_element.getAttribute("current_slide_id")
    let number_of_slides=slideshow_element.getAttribute("number_of_slides")

    let new_slide_id=current_slide_id-1

    if(new_slide_id<0){
        new_slide_id=number_of_slides-1
    }

    let old_slide_element=slideshow_element.children[current_slide_id]
    let new_slide_element=slideshow_element.children[new_slide_id]

    showSlide(slideshow_element,old_slide_element,new_slide_element);
}

function showSlide(_target_element,old_slide_element,new_slide_element) {
    new_slide_element.style.setProperty("display","none");

    if(old_slide_element){
       old_slide_element.style.setProperty("display","block");
    }
}

function init_slideshows(){
    for(slideshow_container of document.getElementsByClassName("slideshow-container")){
        if(!slideshow_container.id){
            window.alert("a slideshow container does not have an id! (but should have one)")
            console.log("add id to "+slideshow_container)
        }

        let number_of_slides=0
        for(child of slideshow_container.children){
            if(!child.classList.contains("mySlide")){
                window.alert("slideshow "+slideshow_container.id+"contains a child that is not a slide(missing mySlide class)!")
                console.log("error in "+slideshow_container)
            }
            number_of_slides+=1
        }
        slideshow_container.setAttribute("number_of_slides")=number_of_slides

        let first_slide=slideshow_container.children[0]

        showSlide(slideshow_container,null,first_slide)

        let next_button=document.createElement("a")
        next_button.outerHTML=`
            <a class="prev" onclick="nextSlide('${slideshow_container.id}')">❮</a>
        `
        let previous_button=document.createElement("a")
        previous_button.outerHTML=`
            <a class="next" onclick="previousSlide('${slideshow_container.id}')">❯</a>
        `
        slideshow_container.appendChild(next_button)
        slideshow_container.appendChild(previous_button)
    }
}