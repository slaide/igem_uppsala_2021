function undo_igem_bs(){
    let element=document.getElementsByClassName("top_bar")[0]
    if(element){
        element.classList.remove("top_bar")
        element.style="display:none;"
    }
    for(class_name of "clear extra_space".split(" ")){
        for(element of document.getElementsByClassName(class_name)){
            element.classList.remove(class_name)
        }
    }

    let navigation_bar_list=document.getElementById("navigation_bar_list")
    if(navigation_bar_list){
        if(navigation_bar_list.style.getPropertyValue("display")=="none"){
            navigation_bar_list.style=undefined
        }
        for(child of navigation_bar_list.children){
            child.classList.remove("current_hub")
            child.classList.remove("current_page")
            child.style=undefined
        }
    }
    for(dropdown of document.getElementsByClassName("dropdown")){
        dropdown.style=""
    }
    //disable a whole bunch of css styles applied to subelements of #content (which does NOT include the holy login bar)
    let content_element=document.getElementById("content")
    if(content_element){
        content_element.id=""
    }
    for(classname of ["igem_content_wrapper","igem_column_wrapper"]){

        let elements_in_class=document.getElementsByClassName(classname)
        for(element of elements_in_class){
            //mainly disable the 'p' at the end of the column wrapper content which is just blank white space at the bottom of the page for some reason, but also just remove all other things that are unexpected there
            let igem_column_wrappers=document.getElementsByClassName(classname)
            for(igem_column_wrapper of igem_column_wrappers){
                for(child of igem_column_wrapper.children){
                    if(child.tagName=="P"){
                        child.style="display:none;"
                    }
                }
            }
            element.classList.remove(classname)
        }
    }
}