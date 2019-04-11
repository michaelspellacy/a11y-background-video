// Video Hero Banner (VHB)
// Developer: Michael Spellacy (Spell), https://spellacy.net

var heroBanner = document.getElementById("hero-banner");

// Check if banner exists.

if(heroBanner) {

	heroBanner.classList.add("hero-banner-active");

	// Variables

	var heroBannerMedia = heroBanner.getAttribute("data-banner-media");
	var heroBannerAll = heroBanner.getAttribute("data-banner-all");
	var heroBannerDesktop = heroBanner.getAttribute("data-banner-desktop");
	var heroBannerMobile = heroBanner.getAttribute("data-banner-mobile");
	var heroBannerPlay = "Play Background Animation";
	var heroBannerPause = "Pause Background Animation";
	var heroBannerState = "paused";

	// Create: Video

	var heroBannerVideo = document.createElement("video");
	heroBannerVideo.id = "hero-banner-video";
	heroBannerVideo.setAttribute("aria-label", "Background Animation");
	heroBannerVideo.setAttribute("playsinline", "");
	heroBannerVideo.setAttribute("type", "video/mp4");

	// TODO: Add fallback Image

	// Add: Video

	heroBanner.appendChild(heroBannerVideo);

	// Create: Play/Pause Button

	var heroBannerButton = document.createElement("button");
	heroBannerButton.id = "hero-banner-button";

	// Check Cookie. If set to true, pause video.

	var heroBannerPaused = getCookie("heroBannerPaused");

	console.log("Hero Banner Cookie Set:" + heroBannerPaused);

	// Viewport Media Query Listener

	var mediaQuery = window.matchMedia(heroBannerMedia);
	mediaQuery.addListener(viewPortWidth);
	viewPortWidth(mediaQuery);

	// Prefers Reduced Motion Listener

	var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	motionQuery.addListener(viewportMotion);
	viewportMotion(motionQuery);

	// Add: Play/Pause Button

	// Note: The pause button should _never_ be removed from the UI. This is an important accessibility feature.
	// While script does make use of prefers-reduced-motion, we can't fully depend on it.

	heroBanner.appendChild(heroBannerButton);

	// Event: Play/Pause Button

	heroBannerButton.onclick = function(){

		if (heroBanner.classList.contains(heroBannerState)) {

			document.cookie = "heroBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

			playVideo();

		} else {

			pauseVideo();

			document.cookie = "heroBannerPaused=true; path=/";

		}

	};

}

// Get Cookie

function getCookie(name) {

	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value !== null) ? unescape(value[1]):null;

}

// Pause Video

function pauseVideo() {

	heroBannerVideo.pause();
	heroBanner.classList.add(heroBannerState);
	heroBannerButton.setAttribute("aria-label", heroBannerPlay);

}

// Play Video

function playVideo() {

	var isPlaying = heroBannerVideo.currentTime > 0 && !heroBannerVideo.paused && !heroBannerVideo.ended && heroBannerVideo.readyState > 2;

	if (!isPlaying) {

		heroBannerVideo.loop = true;
		heroBannerVideo.muted = true;

		heroBannerVideo.play();
		heroBanner.classList.remove(heroBannerState);
		heroBannerButton.setAttribute("aria-label", heroBannerPause);

	}

}

// Viewport Width Media Query

function viewPortWidth(mediaQuery) {

	heroBannerVideo.loop = true;
	heroBannerVideo.muted = true;

	if(heroBannerAll !== null) {

		heroBannerVideo.setAttribute("src", heroBannerAll);

	} else {

		if (mediaQuery.matches) {

			heroBannerVideo.setAttribute("src", heroBannerDesktop);

		} else {

			heroBannerVideo.setAttribute("src", heroBannerMobile);

		}

	}

	heroBannerVideo.load();

	// If cookie exists, then pause video

	if(heroBannerPaused !== null) {

			heroBanner.classList.add(heroBannerState);

	} else {

		heroBannerButton.setAttribute("aria-label", heroBannerPause);

	}

	if(heroBanner.classList.contains("paused")) {

		heroBannerVideo.pause();

	} else {

		var isPlaying = heroBannerVideo.currentTime > 0 && !heroBannerVideo.paused && !heroBannerVideo.ended && heroBannerVideo.readyState > 2;

		if (!isPlaying) {

			heroBannerVideo.play();

		}

	}

	// Since this is decorative, let us disable the video menu.

	heroBannerVideo.oncontextmenu = function(){

		return false;

	};

}

// Prefers Reduced Motion Media Query (WIP)

function viewportMotion(motionQuery){

	if (motionQuery.matches) {

		pauseVideo();

	}

}
