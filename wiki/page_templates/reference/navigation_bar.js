<script purpose="internal_open_close_navbar">
            function open_navbar(){
                document.getElementById("navigation_bar").classList.add("fully_open")
                document.getElementById("pagecontent").classList.add("blurred_navigation_bar_open")
                //this is broken. blurring the main element makes the scrolly things lose their position setting
                for(element of document.getElementsByClassName("scroll_thing")){
                    element.style.setProperty("filter","blur(15px)")
                }
            }
            function close_navbar(){
                document.getElementById("navigation_bar").classList.remove("fully_open")
                document.getElementById("pagecontent").classList.remove("blurred_navigation_bar_open")
                //this is broken. blurring the main element makes the scrolly things lose their position setting
                for(element of document.getElementsByClassName("scroll_thing")){
                    element.style.setProperty("filter","initial")
                }
            }

            /* open/close navigation bar while scrolling */
            window.addEventListener("wheel",(ev)=>{
                if(ev.deltaY>0){
                    document.getElementById("dropdown-container").classList.remove("scrolled_down")
                }else{
                    document.getElementById("dropdown-container").classList.add("scrolled_down")
                }
            })
        </script>