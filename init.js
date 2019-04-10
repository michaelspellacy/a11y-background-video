// Video Hero Banner (VHB)
// Developer: Michael Spellacy (Spell), https://spellacy.net

"use strict";

(function() {

	var heroBanner = document.getElementById("hero-banner");

	// Check if banner exists.

	if(heroBanner) {

		heroBanner.classList.add("hero-banner-active");

		// Variables

		var heroBannerMedia = heroBanner.getAttribute("data-banner-media");
		var heroBannerAll = heroBanner.getAttribute("data-banner-all");
		var heroBannerDesktop = heroBanner.getAttribute("data-banner-desktop");
		var heroBannerMobile = heroBanner.getAttribute("data-banner-mobile");
		var heroBannerPoster = document.getElementById("hero-banner-image").src;
		var heroBannerPlay = "Play Background Animation";
		var heroBannerPause = "Pause Background Animation";
		var heroBannerState = "paused";

		// Create: Video

		var heroBannerVideo = document.createElement("video");
		heroBannerVideo.id = "hero-banner-video";
		heroBannerVideo.setAttribute("aria-label", "Background Animation");
		heroBannerVideo.setAttribute("playsinline", "");
		heroBannerVideo.setAttribute("type", "video/mp4");

		// Add: Video

		heroBanner.appendChild(heroBannerVideo);

		// Viewport Media Query Listener

		var mediaQuery = window.matchMedia(heroBannerMedia);
		mediaQuery.addListener(viewPortWidth);
		viewPortWidth(mediaQuery);

		// Prefers Reduced Motion Listener

		var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		motionQuery.addListener(viewportMotion);
		viewportMotion(motionQuery);

		// Create: Play/Pause Button

		var herBannerButton = document.createElement("button");
		herBannerButton.id = "hero-banner-button";

		// Check Cookie. If set to true, pause video.

		var heroBannerPaused = getCookie("heroBannerPaused");

		// If cookie exists, then pause video

		if(heroBannerPaused !== null) {

			pauseVideo();

		} else {

			herBannerButton.setAttribute("aria-label", heroBannerPause);

		}

		// Add: Play/Pause Button

		// Note: The pause button should _never_ be removed from the UI. This is an important accessibility feature.
		// While script does make use of prefers-reduced-motion, we can't fully depend on it.

		heroBanner.appendChild(herBannerButton);

		// Event: Play/Pause Button

		herBannerButton.onclick = function(){

			if (heroBanner.classList.contains(heroBannerState)) {

				playVideo();

				document.cookie = "heroBannerPaused=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; path=/;";

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
		herBannerButton.setAttribute("aria-label", heroBannerPlay);

	}

	// Play Video

	function playVideo() {

		heroBannerVideo.play();
		heroBanner.classList.remove(heroBannerState);
		herBannerButton.setAttribute("aria-label", heroBannerPause);

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

		// See if fallback image is present

		if(heroBannerPoster !== null) {

			heroBannerVideo.poster = heroBannerPoster;

		}

		heroBannerVideo.loop = true;
		heroBannerVideo.muted = true;

		// Since this is decorative, let us disable the video menu.

		heroBannerVideo.oncontextmenu = function(){

			return false;

		};

		if(heroBanner.classList.contains(heroBannerState)) {

			heroBannerVideo.pause();

		} else {

			heroBannerVideo.play();

		}

	}

	// Prefers Reduced Motion Media Query (WIP)

	function viewportMotion(motionQuery){

		if (motionQuery.matches) {

			pauseVideo();

		}

	}

}());
