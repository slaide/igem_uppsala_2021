
function scale_steak(){
    const my_height=919 /*not 1080, because browsers*/
    const my_width=1920

    const scale_fraction=window.innerWidth/my_width

    let petri_dish_steaks=document.getElementsByClassName("petri_dish_steak")
    let small_petri_dish_steak_scale=(31.705727770031103/100 * window.innerHeight / 1076.55 * 0.8 / 2)

    petri_dish_steaks[0].style.setProperty("--steak-max-scale",small_petri_dish_steak_scale+"")
    petri_dish_steaks[1].style.setProperty("--steak-max-scale",small_petri_dish_steak_scale*2+"")

    let steak=document.getElementById("steak_big")
    steak.style.setProperty("--steak-height", 580.06 *scale_fraction +"px")
    steak.style.setProperty("--steak-width",1073 *scale_fraction +"px")

    for(id of "#syringe_container,#antibiotic_syringe_body,#antibiotic_syringe_top,#antibiotic_syringe_fluid".split(",")){
        let element=document.getElementById(id.substr(1))

        element.style.setProperty("--syringe-top-height",140.66*scale_fraction+"px")
        element.style.setProperty("--syringe-top-width",629.17*scale_fraction+"px")

        element.style.setProperty("--syringe-body-height",262.02*scale_fraction+"px")
        element.style.setProperty("--syringe-body-width",1081.73*scale_fraction+"px")
    }

    let syringe_fluid=document.getElementById("antibiotic_syringe_fluid")
    syringe_fluid.style.setProperty("--height",113.41*scale_fraction+"px")
    syringe_fluid.style.setProperty("--width",232.48*scale_fraction+"px")

    for(id of "deforestation_container,co_bubble_container,factory_container".split(",")){
        let element=document.getElementById(id)
        if(!element){
            console.log(id)
        }
        element.style.setProperty("transform","scale("+scale_fraction+")")
    }
}
scale_steak()