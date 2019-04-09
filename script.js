// Accessible Background Video
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

if(document.getElementById("hero-banner-video")) {

	function getCookie(name) {

		var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]):null;

	}

	var heroBannerActive = getCookie("heroBannerActive");
	var heroBanner = document.getElementById("hero-banner");
	var heroBannerVideo = document.getElementById("hero-banner-video");
	var heroBannerMedia = heroBannerVideo.getAttribute("data-banner-media");
	var heroBannerDesktop = heroBannerVideo.getAttribute("data-banner-desktop");
	var heroBannerDefault = heroBannerVideo.firstElementChild.src;
	var heroBannerPlay = "Play Video";
	var heroBannerPause = "Pause Video";

	function viewPortWidth(mediaQuery) {

		if (mediaQuery.matches) {

			heroBannerVideo.firstElementChild.src = heroBannerDesktop;

		} else {

			heroBannerVideo.firstElementChild.src = heroBannerDefault;

		}

		heroBannerVideo.load();

		if(heroBanner.classList.contains("active")) {

			heroBannerVideo.pause();

		} else {

			heroBannerVideo.play();

		}

	}

	const mediaQuery = window.matchMedia(heroBannerMedia);
	mediaQuery.addListener(viewPortWidth);
	viewPortWidth(mediaQuery);

	// Create Play/Pause Button

	var button = document.createElement("button");
	button.id = "hero-banner-button";

	// Check Cookie. If set to true, pause video.

	function pauseVideo() {

		heroBannerVideo.pause();
		heroBanner.classList.add("active");
		button.setAttribute("aria-label", heroBannerPlay);

	}


	viewportMotion(motionQuery){

		if (motionQuery.matches) {

			alert("supported");

		}

	}


	const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
	motionQuery.addListener(viewportMotion);
	viewportMotion(motionQuery);

	if(heroBannerActive !== null) {

		pauseVideo();

	} else {

		button.setAttribute("aria-label", heroBannerPause);

	}

	heroBanner.appendChild(button);

	// Play/Pause Button Event

	button.onclick = function(){

		if (heroBanner.classList.contains("active")) {

			heroBannerVideo.play();
			heroBanner.classList.remove("active");
			this.setAttribute("aria-label", heroBannerPause);

			document.cookie = "heroBannerActive=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		} else {

			heroBannerVideo.pause();
			heroBanner.classList.add("active");
			this.setAttribute("aria-label", heroBannerPlay);

			document.cookie = "heroBannerActive=true; Secure; path=/";

		}

	}

}
