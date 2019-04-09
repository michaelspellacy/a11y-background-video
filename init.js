// Accessible Background Video
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

(function() {

	var heroBanner = document.getElementById("hero-banner");

	if(heroBanner) {

		// Get Cookie

		function getCookie(name) {

			var re = new RegExp(name + "=([^;]+)");
	    var value = re.exec(document.cookie);
	    return (value !== null) ? unescape(value[1]):null;

		}

		// Create: Video

		var heroBannerVideo = document.createElement("video");

		heroBannerVideo.id = "hero-banner-video";
		heroBannerVideo.setAttribute("aria-label", "Background Animation");

		// Add: Video

		heroBanner.appendChild(heroBannerVideo);

		var heroBannerMedia = heroBanner.getAttribute("data-banner-media");
		var heroBannerAll = heroBanner.getAttribute("data-banner-all");
		var heroBannerDesktop = heroBanner.getAttribute("data-banner-desktop");
		var heroBannerMobile = heroBanner.getAttribute("data-banner-mobile");
		var heroBannerPlay = "Play Background Animation";
		var heroBannerPause = "Pause Background Animation";
		var heroBannerState = "paused";

		function pauseVideo() {

			heroBannerVideo.pause();
			heroBanner.classList.add(heroBannerState);
			herBannerButton.setAttribute("aria-label", heroBannerPlay);

		}

		function playVideo() {

			heroBannerVideo.play();
			heroBanner.classList.remove(heroBannerState);
			herBannerButton.setAttribute("aria-label", heroBannerPause);

		}

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

			heroBannerVideo.loop = true;
			heroBannerVideo.muted = true;
			heroBannerVideo.playsinline = true;

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

		const mediaQuery = matchMedia(heroBannerMedia);
		mediaQuery.addListener(viewPortWidth);
		viewPortWidth(mediaQuery);

		// Check for prefers-reduced-motion (Still WIP)

		function viewportMotion(motionQuery){

			if (motionQuery.matches) {

				pauseVideo();

			}

		}

		const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
		motionQuery.addListener(viewportMotion);
		viewportMotion(motionQuery);

		// Create: Play/Pause Button

		var herBannerButton = document.createElement("button");
		herBannerButton.id = "hero-banner-button";

		// Check Cookie. If set to true, pause video.

		var heroBannerPaused = getCookie("heroBannerPaused");

		if(heroBannerPaused !== null) {

			pauseVideo();

		} else {

			herBannerButton.setAttribute("aria-label", heroBannerPause);

		}

		// Add: Play/Pause Button

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

		}

	}

})();
