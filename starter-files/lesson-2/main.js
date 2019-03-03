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

	function indexDB() {
		activeStep.classList.remove(VISIBLE_STEP_CLASS);
		activeStep = sections[2];
		localStorage.setItem('currentSection', 2);
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

	if(window.location.search === '?utm_source=homescreen') {
		indexDB();
	}
}());

(function() {
	'use strict';

	const form = document.querySelector('form');

	if (!form) return;

	function handleSubmission(event) {
		event.preventDefault();

		const apiUrl = form.getAttribute('action');

		const data = {
			first_name: form.querySelector('input[name="firstName"]').value,
			last_name: form.querySelector('input[name="lastName"]').value,
		};

		form.querySelector('fieldset').setAttribute('disabled', 'disabled');


		/**********
		 *
		 *  STEP 2.5
		 *
		 * *********/
		// when the user first arrives to the page we will not be registered on the page it will just be installed but when they arrive to the page again it will activate the service worker
		// we need to check if the navigator.serviceWorker.controller !== null
		// then inside the if we need to use the postMessage method that is on the controller which takes an object
		// we want to pass an object in there with the value of 'form_data': data

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response) => {
			return response.text();
		})
		.then(text => {
			console.log(text);
			document.querySelector('[data-form-completed]').textContent = 'Submission successfully submitted!';

			document.querySelector('[data-form-completed]').style.display = 'block';
		})
		.catch((error) => {
			if (!navigator.onLine) {
				// probably want to do a fetch request or something to double check you are actually offline just to be 100%
				document.querySelector('[data-form-completed]').textContent = `Opps! Looks like you may be offline but don't worry, as soon as you're back online we will send off your submission and let you know.`;
			} else {
				document.querySelector('[data-form-completed]').textContent = 'Opps! Something went wrong';
			}

			document.querySelector('[data-form-completed]').style.display = 'block';

			console.log('data sent to server successfully... to indexdb');
		});
	}

	form.addEventListener('submit', handleSubmission);
})();

/**********
 *
 *  STEP 1.1
 *
 * *********/


(function() {
	'use strict';

	// This piece of code only works in Chrome see: https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent

	// firstly lets get our variables setup we need a deferredPrompt to be null & lets just get out data-aths-prompt from the DOM

	// we then need to add a beforeinstallprompt event on the window
	// remember: to pass the event parameter down as we will need that
		// inside that we need to preventDefault on the event. This will prevent Chrome 67 and earlier from automatically showing the prompt
		// assign event to our deferred prompt variable to the event
		// set button to display block

	// now we need to add a click event on the button
		// hide the button
		// our deferred prompt variable has a prompt method that we need to call

		// when the user interacts with that prompt there is a promise object which returns the choice that the user made
		// this is really good for sending GA events and seeing who actually click it and accepted it.
		// so stop rambling Matt lets get to it. deferredPrompt.userChoice.then(func(USERCHOICE)..)
		// check if the choiceResult.outcome is accepted (string)


	// some golden nuggets for extra tracking...

	// window.addEventListener('appinstalled', (evt) => {
	// 	// log when the app successfully installs...
	// });

	// if (window.matchMedia('(display-mode: standalone)').matches) {
	// 	// good way to check if the app how often a user opens the app mode...
	// }
}());
