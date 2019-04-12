// Video Hero Banner (VHB)
// Developer: Michael Spellacy (Spell), https://spellacy.net

// Note: If you have a PWA, please see https://github.com/michaelspellacy/video-hero-banner/issues/7 before using

var heroBanner = document.getElementById("hero-banner");

// Check if banner exists.

if(heroBanner) {

	// Check Cookie. If set to true, pause video.

	var heroBannerPaused = getCookie("heroBannerPaused");

	// Set "active" hook to main element

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
	heroBannerVideo.setAttribute("loop", "");
	heroBannerVideo.setAttribute("playsinline", "");
	heroBannerVideo.setAttribute("disableRemotePlayback", "");

	// TODO: Add fallback Image

	// Add: Video

	heroBanner.appendChild(heroBannerVideo);

	// Create: Play/Pause Button

	var heroBannerButton = document.createElement("button");
	heroBannerButton.id = "hero-banner-button";

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

			document.cookie = "heroBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; path=/;";

			playVideo();

		} else {

			pauseVideo();

			document.cookie = "heroBannerPaused=true; Secure; path=/";

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

	heroBannerVideo.play();
	heroBanner.classList.remove(heroBannerState);
	heroBannerButton.setAttribute("aria-label", heroBannerPause);

}

// Viewport Width Media Query

function viewPortWidth(mediaQuery) {

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
	heroBannerVideo.muted = true;

	// If cookie exists, then pause video

	if(heroBannerPaused !== null) {

			heroBanner.classList.add(heroBannerState);

	} else {

		heroBannerButton.setAttribute("aria-label", heroBannerPause);

	}

	if(heroBanner.classList.contains("paused")) {

		heroBannerVideo.pause();

	} else {

		heroBannerVideo.play();

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
