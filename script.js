// Accessible Background Video
// Developer: Michael "Spell" Spellacy, Developer: Michael "Spell" Spellacy. Twitter: @spellacy, GitHub: michaelspellacy

if(document.getElementById("hero-banner-video")) {

	function getCookie(name) {

		var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(document.cookie);
		return (value != null) ? unescape(value[1]) : null;

	}

	var heroBannerActive = getCookie("heroBannerActive");
	var heroBanner = document.getElementById("hero-banner");
	var heroBannerVideo = document.getElementById("hero-banner-video");
	var heroBannerPlay = "Play Background Video";
	var heroBannerPause = "Pause Background Video";

	// Create Play/Pause Button

	var button = document.createElement("button");
	button.id = "hero-banner-button";

	// Check Cookie. If set to true, pause video.

	if(heroBannerActive == "true") {

		heroBannerVideo.pause();
		heroBanner.classList.add("active");
		button.setAttribute("aria-label", heroBannerPlay);

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

			document.cookie = "heroBannerActive=";

		} else {

			heroBannerVideo.pause();
			heroBanner.classList.add("active");
			this.setAttribute("aria-label", heroBannerPlay);

			document.cookie = "heroBannerActive=true";

		}

	}

}
