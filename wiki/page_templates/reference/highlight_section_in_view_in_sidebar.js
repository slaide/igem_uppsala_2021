
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

    let found=null
    let index=0

    const offset_element_keys=Object.keys(offsets)
    for(element in offsets){
        const link_target_offset=100 + 0.05*window.innerHeight /*navigation bar*/ + 16 /*igem login bar*/ + 50 /* +50 to allow for some buffer in highlight range */

        let scrolled_below_current_target_begin=(
            offsets[element]
            - link_target_offset
        ) <= current_scroll

        let is_first_element_in_list=index==0
        let is_last_element_in_list=(index==(offset_element_keys.length-1))

        //if scrolled below link_target, current section is current section
        let current_section_should_highlight=scrolled_below_current_target_begin
        //or if current section is last section, and current section has not yet been found
        || and(!found,is_last_element_in_list)
        //or if current section is first section and scroll is above first section
        || and(!scrolled_below_current_target_begin,is_first_element_in_list)

        let next_section_not_in_range=true;
        if(!is_last_element_in_list){
            let next_element=offset_element_keys[index+1]
            next_section_not_in_range=(
                offsets[next_element]
                - link_target_offset
            ) >= current_scroll
        }

        if(and(and(current_section_should_highlight,next_section_not_in_range),!found)){
            found=element;
            document.getElementById("sidebar_list_container").children[index].classList.add("current_section")
        }else{
            document.getElementById("sidebar_list_container").children[index].classList.remove("current_section")
        }
        index+=1
    }
}