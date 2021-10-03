<script purpose="add lineup entries to dom">
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
                                    if(and(schedule[key].time.length==1,schedule.length>(key+1))){
                                        timerange_div.innerText+=" - "+schedule[key+1].time[0]
                                    }else{
                                        timerange_div.innerText+=" - "+schedule[key].time[1]
                                    }
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

                                    webinar_day_element.appendChild(outer_div)

                                    /* template copied here
                                    <div>
                                        <div class="webinar_entry_timerange">10:15 - 10:30</div>
                                        <div class="webinar_entry_speaker">
                                            <div class="webinar_entry_speaker_image">
                                                <img src="https://th.bing.com/th/id/R.927fa5f474d3871303751f61107530c1?rik=ZZBvTAdkuxyRhQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-lUBtYiFt-9s%2fT7owG9DyamI%2fAAAAAAAAODc%2fQZHpXGrivvg%2fs1600%2fTobey%2bMaguire.jpg&ehk=jFtyBXCtoTqhpzFzPDoWmW7e56WwhaeLNIe2tdIR9vM%3d&risl=&pid=ImgRaw&r=0">
                                            </div>
                                            <div class="webinar_entry_speaker_name">
                                                iGEM Uppsala
                                            </div>
                                        </div>
                                        <div class="webinar_entry_topic">Opening remarks</div>
                                    </div>
                                    */
                                }
                            }
                        </script>