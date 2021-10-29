// get various buttons, paragraphs, and audio track
const track = document.getElementById('track')
const ply = document.getElementById('ply')
const pse = document.getElementById('pse')
const stp = document.getElementById('stp')
const prevLyrics = document.getElementById('prev-lyrics')
const lyrics = document.getElementById('lyrics-container')
const nxtLyrics = document.getElementById('nxt-lyrics')
const durationDisplay = document.getElementById('duration-display')
let currentDisplay = document.getElementById("current-display")
let seek = document.getElementById('seek')

console.log(track)
//************************************************************* */
// -------THOUGHT PROCES-----------------------------
// get audio file metadata
// get playback time
// implement a srt system
// probably numbered sequence
// time and/or duration
// block of text(lyrics)
// probably JSON
// loop through the contents
// if (playback time >= start || <= end) {display block of text}
// ------------------------------------
// time update event

// ******************************************************************
let playStatus = false
ply.addEventListener('click', ()=>{ 
    
    if(playStatus == false){
        track.play()
        ply.innerHTML ="<b>II</b>"
        playStatus = true
    } else if (playStatus == true){
        track.pause()
        ply.innerHTML ="&#9658"
        playStatus = false
    }
})

stp.addEventListener('click', ()=>{
    track.currentTime=0
    track.pause()
    prevLyrics.innerText = ""
    lyrics.innerText = ""
    nxtLyrics.innerText = ""
    ply.innerHTML ="&#9658"
    playStatus = false
})

seek.max = track.duration
console.log(track.duration)
seek.value = 0

let trackTime // to be updated later in event listener for the time update event of track
let durationSeconds = parseInt(track.duration)%60 
let durationMinutes = parseInt(parseInt(track.duration)/60)

durationDisplay.innerText = durationMinutes + ":" + durationSeconds
// to display the length/duration of the audio file 


//*****************NOTE*********** */
// Leaving the following code commented out becasue it can be used later when loading lyrics from a JSON file
// function loadJSON(callback){
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("/*path/url to JSON file.json*/");
//     xobj.open('GET', 'lyrics-file.json', true)
//     xobj.onreadystatechange = function(){
//         if (xobj.readyState == 4 && xobj.status == "200"){
//             callback(xobj.responseText);
//         }
//     };
//     xobj.send(null)
// }

// function init(){
//     loadJSON(function(response){
//         var lyricsText = JSON.parse(response)
//         track.addEventListener('timeupdate', (e)=>{
//             //  console.log(e.target.currentTime)
//             trackTime = e.target.currentTime
//             for (el of lyricsText){
//                 if(trackTime >= parseFloat(el.timeIn) && trackTime <= parseFloat(el.timeOut)){
//                     if(lyricsText.indexOf(el) === 0){
//                         lyrics.innerText = el.text
//                         nxtLyrics.innerText = lyricsText[lyricsText.indexOf(el)+1].text
//                     }else if(lyricsText.indexOf(el) > 0 && lyricsText.indexOf(el) < (lyricsText.length - 1)){
//                     prevLyrics.innerText = lyricsText[lyricsText.indexOf(el)-1].text
//                     lyrics.innerText = el.text
//                     nxtLyrics.innerText = lyricsText[lyricsText.indexOf(el)+1].text
//                     // console.log(lyricsText.indexOf(el))
//                     } else{
//                         prevLyrics.innerText = lyricsText[lyricsText.indexOf(el)-1].text
//                     lyrics.innerText = el.text
//                     nxtLyrics.innerText = "..."
//                     }
//                 }
//             }
            
//         })
//         console.log(lyricsText)
//     });
// }

// init()

seek.addEventListener('input', (e)=>{
    track.currentTime = seek.value
})


track.addEventListener('timeupdate', (e)=>{
    //  console.log(e.target.currentTime)
    trackTime = e.target.currentTime
    for (el of lyricsText){
        if(trackTime >= parseFloat(el.timeIn) && trackTime <= parseFloat(el.timeOut)){
            if(lyricsText.indexOf(el) === 0){
                lyrics.innerText = el.text
                nxtLyrics.innerText = lyricsText[lyricsText.indexOf(el)+1].text
            }else if(lyricsText.indexOf(el) > 0 && lyricsText.indexOf(el) < (lyricsText.length - 1)){
            prevLyrics.innerText = lyricsText[lyricsText.indexOf(el)-1].text
            lyrics.innerText = el.text
            nxtLyrics.innerText = lyricsText[lyricsText.indexOf(el)+1].text
            // console.log(lyricsText.indexOf(el))
            } else{
                prevLyrics.innerText = lyricsText[lyricsText.indexOf(el)-1].text
            lyrics.innerText = el.text
            nxtLyrics.innerText = "..."
            }
        }
    }
    seek.value = trackTime

    let currentSeconds = parseInt(trackTime)%60
    let currentMinutes = parseInt(parseInt(trackTime)/60)

    if(currentSeconds<10){
        currentDisplay.innerText = currentMinutes + ":0" + currentSeconds
    } else{
        currentDisplay.innerText = currentMinutes + ":" + currentSeconds
    }
    //Displays the current time of the audio file
})




var lyricsText = [
    {
        "text": "...",
        "timeIn": "0000",
        "timeOut": "0002"
    },{
        "text": "ooohh yeah yeah yeah yeah yeah, say yes, I do",
        "timeIn": "0002",
        "timeOut": "12.99999"
    },{
        "text": "one look in your eyes, and there I see",
        "timeIn": "13",
        "timeOut": "22.50"
    },{
        "text": "just what you mean to me",
        "timeIn": "22.51",
        "timeOut": "27.50"
    },{
        "text": "here in my heart, I believe",
        "timeIn": "27.51",
        "timeOut": "34.50"
    }
]




