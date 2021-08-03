
    /* function for the navigation bar to go away after scroll */

    /* DOESNT WORK */
    
    function myFunction(){
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
      document.getElementById("menu").style.height = "0%";
      }
      else {
        document.getElementById("menu").style.height = "10%";
      }
    }
