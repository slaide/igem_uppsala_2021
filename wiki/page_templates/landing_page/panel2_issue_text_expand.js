
function show_greenhouse_gases(){
    let element=document.getElementById("co2_text")
    element.children[1].classList.remove("invisible")
    hide_meat_problem_areas("co2_text")
}
function show_deforestation(){
    let element=document.getElementById("deforestation_text")
    element.children[1].classList.remove("invisible")
    hide_meat_problem_areas("deforestation_text")
}
function show_factory_farming(){
    let element=document.getElementById("factory_text")
    element.children[1].classList.remove("invisible")
    hide_meat_problem_areas("factory_text")
}
function show_antibiotic_resistance(){
    let element=document.getElementById("antibiotic_text")
    element.children[1].classList.remove("invisible")
    hide_meat_problem_areas("antibiotic_text")
}

function hide_meat_problem_areas(except){
    for (id of "co2_text deforestation_text antibiotic_text factory_text".split(" ")){
        if(id!=except){
            document.getElementById(id).children[1].classList.add("invisible")
        }
    }
}