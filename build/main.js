(function() {
	'use strict';

	const VISIBLE_STEP_CLASS = 'step--visible';

	const sections = Array.prototype.slice.call(document.querySelectorAll('[data-test-section]'))
	let activeStep = sections[0];

	const tests = {
		manifest: testManifest,
		now: now
	};

	const buttons = Array.prototype.slice.call(document.querySelectorAll('[data-test-btn]'));

	function now() {
		activeStep.classList.remove(VISIBLE_STEP_CLASS);
		activeStep = sections[1];
		localStorage.setItem('currentSection', 1);
		activeStep.classList.add(VISIBLE_STEP_CLASS);
	}

	function testCase(condition, errorMessage) {
		return new Promise((resolve, reject) => {

			if(condition) {
				return resolve(condition);
			} else {
				console.error(errorMessage);
				return resolve(errorMessage);
			}

		}).catch(error => new Error(error));
	}


	function testManifest(button) {

		const request = new XMLHttpRequest();
		request.open('GET', '/manifest.json', true);

		request.onload = function() {
			if(request.status === 404) {
				const tests = activeStep.querySelector('[data-test-errors]');

				tests.innerHTML = `<li class="test__item">Unable to find manifest.json please make sure it is in the root of build.</li>`;
			}

			if (request.status >= 200 && request.status < 400) {

				var data = JSON.parse(request.responseText);

				const icons = data.icons.filter(icon => {
					return icon.sizes === '48x48' || icon.sizes === '72x72' || icon.sizes === '96x96' ||icon.sizes === '144x144' || icon.sizes === '168x168' || icon.sizes === '192x192' || icon.sizes === '512x512';
				});


				const testCases = [
					testCase(data.hasOwnProperty('short_name'), 'Manifest does not have a short name property. This is used if there is insufficient space.'),
					testCase(data.hasOwnProperty('name'), 'Manifest does not contain a name property. This provides a human readblae name to the user.'),
					testCase(data.hasOwnProperty('icons'), 'Manifest does not contain a icons property'),
					testCase(icons.length === 7, 'You need icon sizes of 48, 72, 96, 144, 168, 192, 512 in your icons property array. Check MDN for icon format.'),
					testCase(data.hasOwnProperty('start_url'), 'Manifest does not contain a start_url property. This is the root url that the application opens.'),
					testCase(data.start_url.includes('?utm_source=homescreen'), 'Start url does not have a utm source of homescreen. We need this to track where our users have come from.'),
					testCase(document.querySelector('link[rel="manifest"]') !== null, 'Manifest does not exist in the dom. You need a meta tag with the rel attribute to be manifest & href to the file.'),
					testCase(data.hasOwnProperty('display'), 'Manifest does not contain a display property. This defines the developers preferred display mode for the web application.'),
					testCase(data.hasOwnProperty('theme_color'), 'Manifest does not contain a theme_color property. This is the colour for an application, this appears on the tab bar as well as the background colour on the splash screen.'),
					testCase(data.hasOwnProperty('background_color'), 'Manifest does not contain a background_color. This property defines the background colour of the application.'),
					testCase(data.hasOwnProperty('description'), 'Manifest does not contain a description property. This provides a general description of what the web application does.')
				];

				Promise.all(testCases).then(results => {

					const inValidTests = results.filter(result => result !== true);

					if(inValidTests.length === 0) {
						activeStep.classList.remove(VISIBLE_STEP_CLASS);
						activeStep = sections[2];
						localStorage.setItem('currentSection', 1);
						activeStep.classList.add(VISIBLE_STEP_CLASS);
					} else {
						const tests = activeStep.querySelector('[data-test-errors]');

						tests.innerHTML = inValidTests.map(test => {
							return `<li class="test__item">${test}</li>`;
						}).join('');

					}
				})
				.catch(error => {
					new Error(error);
				});
			};
		}

		request.send();

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

	/*

		STEP 4.1 - Setup Sync Event & request permission for Notificaions

		We need to register the sync event when the user has clicked the button

		- bind a click event to the prder pizza button. Name the function anything you want.
		- navigator.serviceWorker.ready will be a promise, so we need to return the then function with the reg paramter
			- next we need to check if the reg has a property call ** sync **
				- reg.sync.register('any-name-here') which is a promise.
					- THEN console.log('Sync registered')
					- catch the error.
			- else console log sync not supported.
	*/

		const button = document.querySelector('[data-background-sync]');

		if(button !== null) {
			// do some event binding here
		}
}());
