# Lesson 2

This section covers over the following:

- Custom add to homescreen banner
- offline forms

To get started run `npm run start-l2` and then spin up [Localhost](http//localhost:8080). When localhost is spun up make sure you clear your application data on that port just in case there is any living service-workers from other projects that have been installed on that port.

Notes:

- update on reload messes up with the background sync sending the fetch off because it is installing a new service worker each time and not activiating it.


Testing steps when completed:

1. clear your app data and refresh your page. The service worker will install and register all the sync requests.
2. refresh the page again. this is where the service worker activates and its now fully working and ready to go.
3. turn off internet connection & fill out the form
4. you should get an opps offline message and in your indexedDB have the form data saved there.
5. turn internet connection back on
6. expect to see no data in indexedDB & the console return the values which were saved.
