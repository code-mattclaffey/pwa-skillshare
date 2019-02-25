(function() {
	'use strict';

	const VISIBLE_STEP_CLASS = 'step--visible';

	const sections = Array.prototype.slice.call(document.querySelectorAll('[data-test-section]'))
	let activeStep = sections[0];

	const tests = {
		now: now,
	};

	const buttons = Array.prototype.slice.call(document.querySelectorAll('[data-test-btn]'));

	function now() {
		activeStep.classList.remove(VISIBLE_STEP_CLASS);
		activeStep = sections[1];
		localStorage.setItem('currentSection', 1);
		activeStep.classList.add(VISIBLE_STEP_CLASS);
	}

	function checkIfTheStepPasses({ currentTarget } = {}) {
		const test = currentTarget.getAttribute('data-test-btn');
		tests[test](currentTarget);
	}

	const storage = localStorage.getItem('currentSection');

	if(storage !== null && sections.length > 0) {
		activeStep.classList.remove(VISIBLE_STEP_CLASS);
		activeStep = sections[storage];
		activeStep.classList.add(VISIBLE_STEP_CLASS);
	}

	buttons.forEach(button => button.addEventListener('click', checkIfTheStepPasses));
}());

(function() {
	'use strict';

	// This piece of code only works in Chrome see: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

	var deferredPrompt = null;
	var button = document.querySelector('[data-aths-prompt]');

	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Update UI notify the user they can add to home screen
		button.style.display = 'block';
	});

	button.addEventListener('click', function() {
		button.style.display = 'none';

		deferredPrompt.prompt();

		deferredPrompt.userChoice.then(function(choiceResult) {
			if (choiceResult.outcome === 'accepted') {
				console.log('yay I was accepted send GA data');
			} else {
				console.log('Oh no I am not loved...');
			}

			deferredPrompt = null;
		});
	});

	window.addEventListener('appinstalled', (evt) => {
		// log when the app successfully installs...
	});

	if (window.matchMedia('(display-mode: standalone)').matches) {
		// good way to check if the app how often a user opens the app mode...
	}
}());
