
const svg_namespace="http://www.w3.org/2000/svg"

/* path for cow tissue and fgf2 protein */
let svg=document.createElementNS(svg_namespace,"svg")
let path=document.createElementNS(svg_namespace,"path")
path.setAttribute("d","M0,1080c569.5-504.5,1420.5-468.5,1920,0")
path.setAttribute("viewBox","0 0 1920.67 365.87")
svg.appendChild(path)

const total_path_length=path.getTotalLength()
const default_delta=total_path_length/framerate/add_stuff_to_petri_dish_duration

function at_percent_length(pl){
    return path.getPointAtLength(total_path_length*pl/100)
}
let base_y=at_percent_length(0).y
let max_height=base_y-at_percent_length(50).y

var delta_time_fgf2=0
var fgf2_delta=default_delta
function fgf2_animation(step){
    //delta_time_fgf2+=fgf2_delta
    delta_time_fgf2+=total_path_length*step/add_stuff_to_petri_dish_duration

    let delta_length=(delta_time_fgf2/total_path_length)*100
    let point=at_percent_length(delta_length)

    let current_height=base_y-point.y

    let bottom=current_height/max_height*100
    
    if(delta_time_fgf2>total_path_length){
        delta_length=0
        bottom=0
        if(delta_time_fgf2>(animation_steps*total_path_length)){
            delta_time_fgf2=0
        }
    }

    let attributes="--left:"+(100-delta_length)+"%;--bottom:"+bottom+"%;"
    document.getElementsByClassName("fgf2_old")[0].style=attributes
    document.getElementsByClassName("fgf2_new")[0].style=attributes
}

var delta_time_tissue=0
var tissue_delta=default_delta
function tissue_animation(step){
    //delta_time_tissue+=tissue_delta
    delta_time_tissue+=total_path_length*step/add_stuff_to_petri_dish_duration

    let delta_length=(delta_time_tissue/total_path_length)*100
    let point=at_percent_length(delta_length)

    let current_height=base_y-point.y

    let bottom=current_height/max_height*100
    
    if(delta_time_tissue>total_path_length){
        delta_length=0
        bottom=0
        if(delta_time_tissue>(animation_steps*total_path_length)){
            delta_time_tissue=0
        }
    }

    let attributes="--right:"+(100-delta_length)+"%;--bottom:"+bottom+"%;"
    for(element of document.getElementsByClassName("cow_tissue")){
        element.style=attributes
    }
}

/*includes steak and fork animations!*/
var delta_steak=0
function steak_animation(step){
    //delta_steak+=1 for every animation step (number of animation frames changes accordingly)
    //delta_steak+=1/(framerate*add_stuff_to_petri_dish_duration)
    delta_steak+=step/add_stuff_to_petri_dish_duration

    const steak_scale_delay=0.2
    var steak_scale=max(min(delta_steak-steak_scale_delay,1-steak_scale_delay),0)
        
    //to normalize steak scale to 100% of max value no matter how many steps this takes

    const animation_steps_preceding_steak_movement=animation_steps/2 /*not quite sure why this formula. tested for 4 animation steps, where the first one is the cow tissue, the second is the fgf3, the third is the steak growth and the fourth is the steak movement*/
    const delta_steak_movement_threshold=animation_steps_preceding_steak_movement/1.5

    /* steak movement */
    var steak_movement_progress=0
    if(delta_steak>delta_steak_movement_threshold){
        steak_movement_progress=delta_steak-delta_steak_movement_threshold
        steak_movement_progress*=100

        if(delta_steak>animation_steps){
            delta_steak=0
        }
    }

    const fork_angle=35

    var steak_point={
        x: Math.cos((90+fork_angle)/180*Math.PI)*steak_movement_progress,
        y: Math.sin((90+fork_angle)/180*Math.PI)*steak_movement_progress
    }

    let steaks=document.getElementsByClassName("petri_dish_steak")
    for(steak of steaks){
        steak.style.setProperty("--scale",steak_scale)
        steak.style.setProperty("--bottom",steak_point.y+"vh")
    }
    steaks[0].style.setProperty("--left",steak_point.x+"vh")
    steaks[1].style.setProperty("--left",-steak_point.x+"vh")

    /* fork movement */
    const animation_steps_preceding_fork_movement=1
    const delta_fork_movement_threshold=animation_steps_preceding_fork_movement

    var fork_movement_progress=0
    if(/*delta_steak>delta_fork_movement_threshold && */delta_steak<delta_steak_movement_threshold){
        fork_movement_progress=delta_steak-delta_fork_movement_threshold-(delta_steak_movement_threshold-delta_fork_movement_threshold)
        fork_movement_progress*=100

        var fork_point={
            x: Math.cos((90+fork_angle)/180*Math.PI)*fork_movement_progress,
            y: Math.sin((90+fork_angle)/180*Math.PI)*fork_movement_progress
        }
        fork_point.y*=-1
    }else if(delta_steak>delta_fork_movement_threshold){
        fork_movement_progress=delta_steak-delta_steak_movement_threshold
        fork_movement_progress*=100

        var fork_point={
            x: Math.cos((90+fork_angle)/180*Math.PI)*fork_movement_progress,
            y: Math.sin((90+fork_angle)/180*Math.PI)*fork_movement_progress
        }
    }

    if (fork_movement_progress<0){
        document.getElementsByClassName("fork_upper")[0].style.setProperty("transform","translateX("+-fork_point.x+"vh) translateY("+-fork_point.y+"vh)")
        document.getElementsByClassName("fork_lower")[0].style.setProperty("transform","translateX("+-fork_point.x+"vh) translateY("+-fork_point.y+"vh)")
    }else{
        document.getElementsByClassName("fork_upper")[0].style.setProperty("transform","translateX("+fork_point.x+"vh) translateY("+-fork_point.y+"vh)")
        document.getElementsByClassName("fork_lower")[0].style.setProperty("transform","translateX("+-fork_point.x+"vh) translateY("+-fork_point.y+"vh)")
    }
}