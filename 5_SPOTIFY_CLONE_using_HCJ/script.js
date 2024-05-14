let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    var formattedSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + formattedSeconds;
}

async function getSongs() {
    let currentURL = window.location.href; // Get the current URL
    const indexHtmlIndex = currentURL.lastIndexOf('/index.html');
    if (indexHtmlIndex !== -1) {
        // If "/index.html" is found in the URL, remove it
        currentURL = currentURL.substring(0, indexHtmlIndex);
    }

    let a = await fetch(currentURL + "/songs");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('m4a')) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = `${window.location.pathname.split("/index")[0]}/songs/${track}`;
    if (!pause) {
        currentSong.play();
        play.src = "svgimg/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track.split(".m")[0];
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main() {
    songs = await getSongs();
    playMusic(decodeURI(songs[0]), true);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                                                    <div class="desc">
                                                        <img class="invert" src="svgimg/music.svg" alt="Music-icon">
                                                         <div class="info">
                                                            <div>${song.replaceAll("%20", " ").replace("%26", " ").split(" - ")[0]}</div>
                                                            <div id="artistname">${song.replaceAll("%20", " ").replace("%26", " ").split(" - ")[1].split(".m")[0]}</div>
                                                        </div>
                                                    </div>
                                                    <div class="playNow">
                                                        <span>Play Now</span>
                                                        <img class="invert" src="svgimg/play.svg" alt="Play-icon">
                                                    </div>
                                                </li>`;
    }

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(`${e.querySelector(".info").firstElementChild.innerHTML} - ${e.querySelector(".info").lastElementChild.innerHTML}.m4a`.trim());
        })
    })

    // Attaching event listerner to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "svgimg/pause.svg";
        } else {
            currentSong.pause();
            play.src = "svgimg/play.svg"
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("songs/")[1]);
        if (index < songs.length - 1) {
            playMusic(decodeURI(songs[index + 1]));
        } else if (index == songs.length - 1) {
            playMusic(decodeURI(songs[0]));
        }
    })

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("songs/")[1]);
        if (index > 0) {
            playMusic(decodeURI(songs[index - 1]));
        } else if (index == 0) {
            playMusic(decodeURI(songs[songs.length - 1]));
        }
    })

    // Lister for timeupdate event 
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        if (currentSong.currentTime == currentSong.duration) {
            let index = songs.indexOf(currentSong.src.split("songs/")[1]);
            if (index < songs.length - 1) {
                playMusic(decodeURI(songs[index + 1]));
            } else if (index == songs.length - 1) {
                playMusic(decodeURI(songs[0]));
            }
        }
    })

    // Adding an event lister to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (((currentSong.duration) * percent) - 100) / 100;
    })

    // Adding an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    })

    // Adding an event listener for cross icon
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-150%";
    })

    // Adding event to change volume
    range.addEventListener("change", (e) => {
        let val = parseInt(e.target.value);
        currentSong.volume = val / 100;
        if (val == 0) {
            vol.src = "svgimg/mute.svg";
        }
        else if (val <= 50) {
            vol.src = "svgimg/volmid.svg";
        } else {
            vol.src = "svgimg/volhigh.svg";
        }
    })

    // Adding this event to remove the glitch in which left part get disapear in Hub Max view when we click on cross 
    window.addEventListener("resize", () => {
        let viewWidth = window.innerWidth;
        if (viewWidth > 1200) {
            document.querySelector(".left").style.left = "0%";
        } else {
            document.querySelector(".left").style.left = "-200%";
        }
    })
}

main();

