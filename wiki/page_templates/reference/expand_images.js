
let style_document=document.styleSheets[0].rules || document.styleSheets[0].cssRules
let image_shrink_duration=0
for (rule of style_document){
    if(rule.selectorText=="content_slice"){
        width=window.innerWidth*rule.style.width.slice(0,-2)/100
    }
    if(rule.selectorText=="actualcontent"){
        max_height=window.innerHeight*rule.style.height.slice(0,-1)/100
    }
    if(rule.selectorText==".image_shrink"){
        image_shrink_duration=rule.style.getPropertyValue("animation-duration").slice(0,-1)*1000
    }
}

for(element of document.getElementsByClassName("expandable_image")){
    element.addEventListener("click",expand_image)
}

function expand_image(ev){
    if(ev.target.tagName!="IMG"){
        console.log("image expanding did not hit img tag")
        console.log(ev.target)
        return
    }

    let image_element=ev.target

    let image_aspect_ratio=image_element.getAttribute("width")/image_element.getAttribute("height");
    image_aspect_ratio=image_element.getBoundingClientRect().width/image_element.getBoundingClientRect().height;

    const base_factor=0.8
    let final_height=window.innerHeight*base_factor;
    let final_width=final_height*image_aspect_ratio;

    for(let factor=base_factor;final_width>window.innerWidth*base_factor;factor-=0.05){
        final_height=window.innerHeight*factor;
        final_width=final_height*image_aspect_ratio;

        if(factor<0.2){
            console.log("image cannot be expanded")
            return;
        }
    }

    let image_overlay=document.getElementById("image_overlay")
    image_overlay.classList.remove("invisible")

    if(image_overlay.children.length==2){
        image_overlay.removeChild(image_overlay.lastChild)
    }

    let big_image=document.createElement("img")
    big_image.setAttribute("src",image_element.src)
    big_image.classList.add("overlay_image")

    image_overlay.appendChild(big_image)

    big_image.style.setProperty("--width",image_element.getBoundingClientRect().width+"px")
    big_image.style.setProperty("--height",image_element.getBoundingClientRect().height+"px")
    big_image.style.setProperty("--left",image_element.getBoundingClientRect().left+image_element.width/2+"px")
    big_image.style.setProperty("--top",image_element.getBoundingClientRect().top+image_element.height/2+"px")

    big_image.style.setProperty("--left-end",window.innerWidth/2+"px")
    big_image.style.setProperty("--top-end",((window.innerHeight*0.95 - 16)/2) + "px")

    big_image.style.setProperty("--overlay-width",final_width+"px")
    big_image.style.setProperty("--overlay-height",final_height+"px")

    big_image.classList.add("image_transition")

    image_element.classList.toggle("pseudo-invisible")

    image_overlay.image_element=image_element
    
    document.getElementById("pagecontent").classList.add("blurred_image_overlay")
}
function collapse_image(ev){
    let image_overlay=document.getElementById("image_overlay")

    image_overlay.children[1].classList.remove("image_transition")
    image_overlay.children[1].classList.add("image_shrink")

    document.getElementById("pagecontent").classList.remove("blurred_image_overlay")

    setTimeout(()=>{
        document.getElementById("image_overlay").classList.add("invisible")
        image_overlay.image_element.classList.toggle("pseudo-invisible")
    },image_shrink_duration)
}