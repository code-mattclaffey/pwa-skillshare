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

const button = document.querySelector("[data-background-sync]");

if (button !== null) {
  // do some event binding here
}
