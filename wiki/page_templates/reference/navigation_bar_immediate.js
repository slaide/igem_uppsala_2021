/* register dropdown opening/closing events */
for(dropdown of document.getElementsByClassName("dropdown")){
    dropdown.addEventListener("mouseenter",function(ev){
        function remove_hovering_highlighting(ev){
            ev.target.removeEventListener("mouseleave",remove_hovering_highlighting)
            ev.target.classList.remove("hovering_over")
        }
        ev.target.classList.add("hovering_over")
        ev.target.addEventListener("mouseleave",remove_hovering_highlighting)
    })
}
document.getElementById("navigation_bar").addEventListener("mouseenter",(ev)=>{
    ev.target.children[1].classList.add("panel_opened")
    ev.target.children[1].classList.add("scrolled_down")
})
document.getElementById("navigation_bar").addEventListener("mouseleave",(ev)=>{
    ev.target.children[1].classList.remove("panel_opened")
})