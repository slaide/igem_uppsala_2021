function switch_hp(hp_type){
    if(hp_type=="standard"){
        document.getElementById("page_switcher").children[1].classList.remove("active_section")
        document.getElementById("page_switcher").children[0].classList.add("active_section")

        document.getElementById("human_practices_content").classList.add("active_section")
        document.getElementById("integrated_human_practices_content").classList.remove("active_section")
    }else if(hp_type=="integrated"){
        document.getElementById("page_switcher").children[0].classList.remove("active_section")
        document.getElementById("page_switcher").children[1].classList.add("active_section")
        
        document.getElementById("human_practices_content").classList.remove("active_section")
        document.getElementById("integrated_human_practices_content").classList.add("active_section")
    }
}