var MORE = {};

MORE.App = (function() {
	var html = document.documentElement;
	if ( html.className === 'no-js' ) {
		html.className = html.className.replace( 'no-js', 'js' );
	}
	/**
	 * Progressively enhance an off-canvas menu-type-thing.
	 * See: http://heydonworks.com/practical_aria_examples/#hamburger
	 */
	var toggleSwitch = document.querySelector( '.js #more-toggle' ),
		closeToggle = document.querySelector( '.js #close-toggle' ),
		slideContainer = document.querySelector( '.js #more' ),
		slideContainerOpen = false,
		lastFocus,
		escapeKey = 27;

	// Fire it up.
	function initApp() {
		toggleSwitch.setAttribute( 'role', 'button' );
		toggleSwitch.setAttribute( 'aria-controls', 'more' );
		toggleSwitch.setAttribute( 'aria-expanded', 'false' );
		slideContainer.setAttribute( 'aria-expanded', 'false' );
		toggleSwitch.addEventListener( 'click', togglePanel );
		slideContainer.addEventListener( 'keydown', handleEscape );
		closeToggle.addEventListener( 'click', togglePanel );
	}

	// Toggle all the things on click.
	function togglePanel( e ) {
		// Do this on open.
		function openToggle() {
			lastFocus = document.activeElement;
			toggleSwitch.setAttribute( 'aria-expanded', 'true' );
			slideContainer.setAttribute( 'aria-expanded', 'true' );
			slideContainer.setAttribute( 'tabIndex', '-1' );
			slideContainerOpen = true;
			setTimeout( function() {
				slideContainer.focus();
			}, 50 );
			toggleSwitch.addEventListener( 'blur', handleOpenToggle  );
		}
		// Do this on close.
		function closeToggle() {
			toggleSwitch.setAttribute( 'aria-expanded', 'false' );
			slideContainer.setAttribute( 'aria-expanded', 'false' );
			slideContainer.removeAttribute( 'tabIndex', '-1' );
			slideContainerOpen = false;
			setTimeout( function() {
				lastFocus.focus();
			}, 50 );
			toggleSwitch.removeEventListener( 'blur', handleOpenToggle, false );
		}

		document.body.classList.toggle( 'more-open' );
		e.preventDefault();
		if ( slideContainerOpen === true ) {
			closeToggle();
		} else {
			openToggle();
		}
	}

	function handleEscape( e ) {
		if ( e.keyCode === escapeKey ) {
			if ( slideContainerOpen === true ) {
				document.body.classList.toggle( 'more-open' );
				toggleSwitch.setAttribute( 'aria-expanded', 'false' );
				slideContainer.setAttribute( 'aria-expanded', 'false' );
				slideContainer.removeAttribute( 'tabIndex', '-1' );
				slideContainerOpen = false;
				setTimeout( function() {
					lastFocus.focus();
				}, 50 );
				toggleSwitch.removeEventListener( 'blur', handleOpenToggle, false );
			}
		}
	}

	function handleOpenToggle() {
		setTimeout( function() {
			slideContainer.focus();
		}, 50 );
	}

	return {
		init: function() {
			initApp();
		}
	};
})();

document.addEventListener( 'DOMContentLoaded', function() {
	MORE.App.init();
});