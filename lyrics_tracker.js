// get various buttons, paragraphs, and audio track
const ply = document.getElementById('ply')
const pse = document.getElementById('pse')
const stp = document.getElementById('stp')
const track = document.getElementById('track')
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

ply.addEventListener('click', ()=>track.play())
pse.addEventListener('click', ()=>track.pause())
stp.addEventListener('click', ()=>{
    track.currentTime=0
    track.pause()
    prevLyrics.innerText = ""
    lyrics.innerText = ""
    nxtLyrics.innerText = ""
})

seek.max = track.duration
console.log(track.duration)
seek.value = 0

let trackTime // to be updated later in event listener for the time update event of track
let durationSeconds = parseInt(track.duration)%60
let durationMinutes = parseInt(parseInt(track.duration)/60)
 
// let currentMinutes = parseInt(track.currentTime)%60
// let currentSeconds = parseInt(parseInt(track.currentTime)/60)


// currentDisplay.innerText = currentMinutes + ":" + currentSeconds
durationDisplay.innerText = durationMinutes + ":" + durationSeconds
 



// function loadJSON(callback){
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
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




