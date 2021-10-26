// get various buttons, paragraphs, and audio track
const ply = document.getElementById('ply')
const pse = document.getElementById('pse')
const track = document.getElementById('track')
const prevLyrics = document.getElementById('prev-lyrics')
const lyrics = document.getElementById('lyrics-container')
const nxtLyrics = document.getElementById('nxt-lyrics')



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

let trackTime // to be updated later in event listener for the time update event of track


 



function loadJSON(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'lyrics-file.json', true)
    xobj.onreadystatechange = function(){
        if (xobj.readyState == 4 && xobj.status == "200"){
            callback(xobj.responseText);
        }
    };
    xobj.send(null)
}

function init(){
    loadJSON(function(response){
        var lyricsText = JSON.parse(response)
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
            
        })
        console.log(lyricsText)
    });
}

init()








