let list_append = document.getElementsByClassName("accept_list")[0]
let audio_tag = document.getElementsByClassName("audio_tag")[0]
let currentAndTotleTime = document.getElementsByClassName("currentAndTotleTime")[0]
let currentProgress = document.getElementById("currentProgress")
let playButton = document.getElementsByClassName("playButton")[0]
let pauseButton = document.getElementsByClassName("pauseButton")[0]
let previousButton = document.getElementsByClassName("previousButton")[0]
let nextButton = document.getElementsByClassName("nextButton")[0]

const music_list = [
    {audioId: "../audio/MYAW NAY MAL SAUNG ( OFFICIAL MUSIC VIDEO 2020).mp3", audioName: "Myaw Nal Ml Saung - Hlwan Paing / Official Music"},
    {audioId: "../audio/December nya - ဒီဇင်ဘာည - လင်းနစ်.mp3", audioName: "DecemberNya-Lin Nit"},
    {audioId: "../audio/Hnin -Hlwang Paing, Po Po Hay Thar [lSJXyZhr9nY].mp3", audioName: "Hnin- Hlwan Paing ft Po Po Hay Thar"},
    {audioId: "../audio/come here - zenith (prod. cracky).mp3", audioName: "Zenith - Shin Nal Ya Tae A Date Pyay"},
    {audioId: "../audio/G Fatt x Wink - Radio (Official MV).mp3", audioName: "Radio - G Fatt ft Wink"}
]

for(let i = 0; i < music_list.length; i++) {
    let append_music = document.createElement("div")
    append_music.addEventListener("click", () => {
        let audioId = music_list[i].audioId
        audio_tag.src = audioId
        audio_tag.play()
        isPlaying = true
        updatePlayAndPause()
        indexID = 0;
        indexID = i;
    })
    append_music.classList.add("append_music")
    let audio_title = (i+1).toString() + ". " + music_list[i].audioName
    append_music.innerHTML = audio_title
    list_append.append(append_music)
}

let duration = 0;
let duration_text = "00:00"
audio_tag.addEventListener("loadeddata", () => {
    duration = Math.floor(audio_tag.duration)
    duration_text = create_time(duration)
})

audio_tag.addEventListener("timeupdate", () => {
    let currentTime = Math.floor(audio_tag.currentTime)
    let currentTime_text = create_time(currentTime)
    let musicTimer_text = currentTime_text + " / " + duration_text
    currentAndTotleTime.innerHTML = musicTimer_text
    createProgressBar(currentTime)
})

let createProgressBar = (current) => {
    let currentProgressdefine = (500 / duration) + current
    currentProgress.style.width = currentProgressdefine.toString() + "px"
}
let isPlaying = false;
let indexID = 0;
playButton.addEventListener("click", () => {
    isPlaying = true
    let curent_time = Math.floor(audio_tag.currentTime)
    if (curent_time === 0) {
    play_song()
    } else {
        audio_tag.play()
        updatePlayAndPause()
    }
})

pauseButton.addEventListener("click", () => {
    isPlaying = false
    audio_tag.pause()
    updatePlayAndPause()
})

previousButton.addEventListener("click", () => {
    if (indexID == 0) {
        indexID = music_list.length - 1
        play_song()
        return
    }
    indexID -=1;
    play_song()
})

nextButton.addEventListener("click", () => {
    if (indexID == music_list.length - 1) {
        indexID = 0;
        play_song()
        return
    }
    indexID += 1;
    play_song()
})

let play_song = () => {
    let play_audio = music_list[indexID].audioId
        audio_tag.src = play_audio
        audio_tag.play()
        isPlaying = true
        updatePlayAndPause() 
}

let updatePlayAndPause = () => {
    if (isPlaying) {
        playButton.style.display = "none"
        pauseButton.style.display = "inline"
    }else {
        playButton.style.display = "inline"
        pauseButton.style.display = "none"
    }
}

let create_time = (totalTimer) => {
    let minutes = Math.floor(totalTimer / 60)
    let seconds = totalTimer % 60
    let min = minutes < 10 ? "0" + minutes.toString() : minutes
    let sec = seconds < 10 ? "0" + seconds.toString() : seconds
    return min + ":" + sec
}
