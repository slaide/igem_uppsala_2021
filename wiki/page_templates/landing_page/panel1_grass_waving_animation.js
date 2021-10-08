
let animation_functions=[]
let disable_complex_animations=true
const cap_framerate=60

let grass_front=document.getElementById('grass_front')
grass_front.innerHTML=grass_front_svg

/* maybe precompute equally spaced states and cache them instead of recalculating them every time */
const warp_front = new Warp(grass_front.children[0])
let offset_front = 0
const offset_front_delta=1.25/cap_framerate
const amplitude=0.15
const phase_multiplier=0.035
function animate_front_grass(){
    warp_front.transform(([ x, y ]) => [ x+amplitude*Math.sin(phase_multiplier*y+offset_front), y])
    offset_front += offset_front_delta
}
animation_functions.push(animate_front_grass)

function animate_all(){
    if (disable_complex_animations){
        return
    }
    for(fun of animation_functions){
        fun()
    }
}

setInterval(animate_all,1000/cap_framerate)