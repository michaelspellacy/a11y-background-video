// Accessible Background Video
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

if(document.getElementById("hero-banner-video")) {

	function getCookie(name) {

		var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]):null;

	}

	var heroBannerPaused = getCookie("heroBannerPaused");
	var heroBanner = document.getElementById("hero-banner");
	var heroBannerVideo = document.getElementById("hero-banner-video");
	var heroBannerMedia = heroBannerVideo.getAttribute("data-banner-media");
	var heroBannerDesktop = heroBannerVideo.getAttribute("data-banner-desktop");
	var heroBannerDefault = heroBannerVideo.firstElementChild.src;
	var heroBannerPlay = "Play Video";
	var heroBannerPause = "Pause Video";
	var heroBannerState = "paused";

	function pauseVideo() {

		heroBannerVideo.pause();
		heroBanner.classList.add(heroBannerState);
		button.setAttribute("aria-label", heroBannerPlay);

	}

	function playVideo() {

		heroBannerVideo.play();
		heroBanner.classList.remove(heroBannerState);
		button.setAttribute("aria-label", heroBannerPause);

	}

	function viewPortWidth(mediaQuery) {

		if (mediaQuery.matches) {

			heroBannerVideo.firstElementChild.src = heroBannerDesktop;

		} else {

			heroBannerVideo.firstElementChild.src = heroBannerDefault;

		}

		heroBannerVideo.load();

		if(heroBanner.classList.contains(heroBannerState)) {

			heroBannerVideo.pause();

		} else {

			heroBannerVideo.play();

		}

	}

	if (heroBannerDesktop !== null) {

		const mediaQuery = matchMedia(heroBannerMedia);
		mediaQuery.addListener(viewPortWidth);
		viewPortWidth(mediaQuery);

	}

	// Check for prefers-reduced-motion

	function viewportMotion(motionQuery){

		if (motionQuery.matches) {

			pauseVideo();

		}

	}

	const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
	motionQuery.addListener(viewportMotion);
	viewportMotion(motionQuery);

	// Create Play/Pause Button

	var button = document.createElement("button");
	button.id = "hero-banner-button";

	// Check Cookie. If set to true, pause video.

	if(heroBannerPaused !== null) {

		pauseVideo();

	} else {

		button.setAttribute("aria-label", heroBannerPause);

	}

	// Add Button

	heroBanner.appendChild(button);

	// Play/Pause Button Event

	button.onclick = function(){

		if (heroBanner.classList.contains(heroBannerState)) {

			playVideo();

			document.cookie = "heroBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		} else {

			pauseVideo();

			document.cookie = "heroBannerPaused=true; Secure; path=/";

		}

	}

}
