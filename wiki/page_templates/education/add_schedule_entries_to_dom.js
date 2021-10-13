for(let webinar_day of [["webinar_lineup_day1_content",schedule_day1],["webinar_lineup_day2_content",schedule_day2]]){
    let lineup_id=webinar_day[0]
    let schedule=webinar_day[1]
    let webinar_day_element=document.getElementById(lineup_id)
    for(let key in schedule){
        key=Number(key) /*because javascript uses strings as keys, even for arrays*/
        if(isNaN(key)){
            continue;
        }
        let outer_div=document.createElement("div")

        let timerange_div=document.createElement("div")
        timerange_div.classList.add("webinar_entry_timerange")
        timerange_div.innerText=schedule[key].time[0]

        outer_div.appendChild(timerange_div)

        let speaker_div=document.createElement("div")
        speaker_div.classList.add("webinar_entry_speaker")

        let speaker_image_div=document.createElement("div")
        speaker_image_div.classList.add("webinar_entry_speaker_image")
        speaker_image_div.innerHTML="<img src='"+(schedule[key].image||"https://th.bing.com/th/id/R.927fa5f474d3871303751f61107530c1?rik=ZZBvTAdkuxyRhQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-lUBtYiFt-9s%2fT7owG9DyamI%2fAAAAAAAAODc%2fQZHpXGrivvg%2fs1600%2fTobey%2bMaguire.jpg&ehk=jFtyBXCtoTqhpzFzPDoWmW7e56WwhaeLNIe2tdIR9vM%3d&risl=&pid=ImgRaw&r=0")+"'>"
        speaker_div.appendChild(speaker_image_div)

        let speaker_name_div=document.createElement("div")
        speaker_name_div.classList.add("webinar_entry_speaker_name")
        speaker_name_div.innerText=schedule[key].speaker
        speaker_div.appendChild(speaker_name_div)
        
        outer_div.appendChild(speaker_div)

        let topic_div=document.createElement("div")
        topic_div.classList.add("webinar_entry_topic")
        topic_div.innerText=schedule[key].topic
        outer_div.appendChild(topic_div)

        let speaker_first_name=schedule[key].speaker.split(" ")[0]

        if(schedule[key].recording){
            let video_div=document.createElement("div")
            video_div.classList.add("webinar_entry_recording")
            video_div.innerHTML=`<a id='webinar_recording_${speaker_first_name}_popup_target' href='' class='button wide'>${speaker_first_name}'s recording</a>`
            outer_div.appendChild(video_div)
        }
        if(schedule[key].popup_content){
            let popup_button=document.createElement("div")
            popup_button.classList.add("webinar_entry_recording")
            popup_button.innerHTML=`<a id='webinar_recording_${speaker_first_name}_popup_target' href='' class='button wide'>${schedule[key].popup_content[0]}</a>`
            outer_div.appendChild(popup_button)
        }

        webinar_day_element.appendChild(outer_div)

        if(schedule[key].recording){
            let video_popup=document.createElement("span")
            video_popup.innerHTML=`
                <span class="popup w25" target="webinar_recording_${speaker_first_name}_popup_target" id="webinar_recording_${speaker_first_name}_popup">
                    <div class="popup_content_header">Webinar recording of ${speaker_first_name}</div>
                    <span class="popup_content">
                        <span>(Loading of the video may take a short time.)</span>
                        <video controls muted preload="none">
                            <source src="${schedule[key].recording}" type="video/mp4">
                        </video>
                        <span>This recording is also available at higher quality on <a href="${schedule[key].youtube}">YouTube</a>.</span>
                    </span>
                </span>
            `
            document.getElementById("webinar").appendChild(video_popup)
        }
        if(schedule[key].popup_content){
            let video_popup=document.createElement("span")
            video_popup.innerHTML=`
                <span class="popup w25" target="webinar_recording_${speaker_first_name}_popup_target" id="webinar_recording_${speaker_first_name}_popup">
                    <div class="popup_content_header">${schedule[key].popup_content[0]}</div>
                    <span class="popup_content">
                        ${schedule[key].popup_content[1]}
                    </span>
                </span>
            `
            document.getElementById("webinar").appendChild(video_popup)
        }
    }
}