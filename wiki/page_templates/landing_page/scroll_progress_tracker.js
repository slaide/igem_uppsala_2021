
function scroll_height_fraction(){
    /*damn this is bad*/
    const scroll_range=document.getElementById("pagecontent").clientHeight-window.innerHeight+16
    let current_scroll=document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset

    return current_scroll/scroll_range
}
let logo_animation_has_played=false
let animation_interval_object=null

function move_scrollable_elements(){
    let scroll_things=document.getElementsByClassName("scroll_thing")

    let current_fraction=scroll_height_fraction()

    let cow_left=min(current_fraction*100/2,50)
    scroll_things[0].style="left:"+cow_left+"%;"
    scroll_things[1].style="left:"+(100-cow_left)+"%;"

    /*transform flask from cow-counterpart in size and position into the upper half of the logo, with corresponding size and position*/
    if(current_fraction>0.95){
        //document.getElementById("logo_flask").style="transform:translate(-50%, -50%) translateY(-43px) scale(0.57);"/* -43px assumes container height of 100px */
        document.getElementById("logo_flask").style="transform:translate(-50%, -50%) translateY(-4.3vh) scale(0.57);"
    }else{
        document.getElementById("logo_flask").style=""
    }

    if(!logo_animation_has_played){if(current_fraction>0.999){
        logo_animation_has_played=true

        for(element of document.getElementsByClassName("scroll_thing")){
            element.classList.add("invisible")
        }

        const animation_duration=1 /*seconds*/ /*also not very precise due to the use of requestAnimationFrame*/

        /* after 150% of animation duration in seconds, make scroll-progress logo re-appear */
        setTimeout(()=>{
        for(element of document.getElementsByClassName("scroll_thing")){
            element.classList.remove("invisible")
        }},animation_duration*1500)

        /*number of animation frames*/
        const animation_frames=animation_duration*framerate
        let i=0

        function move_logo(){
            //20% is max width of text, head should be placed on left half of screen, half way between left edge of screen and left edge of text
            const left_start=0.5
            const left_target=(1-0.2)/4
            //should move up to 50% height of container
            const top_target=0.5
            const top_start=(window.innerHeight-100/2)/window.innerHeight

            let animation_fraction_elapsed=i/animation_frames
            let left=left_target-(left_target-left_start)*(1-animation_fraction_elapsed)
            let top=top_target-(top_target-top_start)*(1-animation_fraction_elapsed)

            const target_scale=1
            const start_scale=1/5.5
            let scale=start_scale+(target_scale-start_scale)*animation_fraction_elapsed*animation_fraction_elapsed
            document.getElementById("logo_animated").style="left:"+left*100+"%;"+"top:"+top*100+"vh;--scale:"+scale+";"

            i+=1

            if(i<=animation_frames){
                requestAnimationFrame(move_logo)
            }
        }

        requestAnimationFrame(move_logo)
    }}
}

move_scrollable_elements()
window.addEventListener("scroll",()=>requestAnimationFrame(move_scrollable_elements))