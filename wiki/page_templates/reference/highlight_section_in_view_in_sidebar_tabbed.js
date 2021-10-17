let offsets={}
let base=null;
/* this code is executed on load */
function get_section_offsets(){
    for(element of document.getElementById("fgfuture_content").children){
        if(!base){
            let offset=0;
            
            let current_element=element;
            while(current_element){
                offset+=current_element.offsetTop;
                current_element=current_element.offsetParent;
            }
            base=offset;
        }
        offsets[element.id]=base
        base+=element.clientHeight
    }
}

function highlight_current_section_in_sidebar(){
    let current_scroll=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset

    let found=false
    let index=0
    for(element in offsets){
        /*
        const subtracted_negative_screen_fraction=0.67
        const added_positive_screen_fraction=0.15

        let above_lower=(offsets[element]+document.getElementById(element).clientHeight-window.innerHeight*subtracted_negative_screen_fraction)>=current_scroll
        let below_upper=offsets[element]>=(current_scroll+window.innerHeight*added_positive_screen_fraction)
        let above_lowest=(offsets[element]+document.getElementById(element).clientHeight)<=current_scroll
        let is_last_element_in_list=(index==(Object.keys(offsets).length-1))

        if(and(above_lower, !found)||and(below_upper, above_lowest)||and(is_last_element_in_list, !found)){
            if(found){
                document.getElementById("sidebar_list_container").children[index-1].classList.remove("current_section")
            }
            found=element
            document.getElementById("sidebar_list_container").children[index].classList.add("current_section")
        }else{
            document.getElementById("sidebar_list_container").children[index].classList.remove("current_section")
        }
        index+=1
        */
    }
}
