## PWA Game

> A gameified workshop that leads developers to building a production ready progressive web app

## Setup

- yarn && yarn start

The website is built from 11ty and uses nunjucks as a templating language. The folder setup is:

- final
  - 1,2,3,4 there for if you get stuck on a certain lesson
- src
  - 1,2,3,4 as the index.html files for each lesson
  - _includes
    - layouts
      - base.njk - will need to make changes here sparsely
  - scripts
    - sw.js - our service worker is where we will spend most of out time
    - 1.js,2,3,4 - lesson js


## Contents (in progress)

- Getting those lighthouse checks ticked off
- Going offline
- Custom add to homescreen banners
- Custom add to homescreen banners - for IOS
- Background syncing
- Push notifications

## Recommended skill level

### Must haves

- JavaScript - When we start getting into the service worker realm you will need some understanding of writing JavaScript
- CSS/HTML - So you understand your way around the site

### Nice to haves

- nunjucks - The website is built in 11ty and it uses nunjucks for its templating language.


## Emoji Helpers

I don't expect you to write every single line of code by yourself so I have added some emojis in the code which give you hints in what to do next. This was inspired by the epic react dev as it is a great idea.

📝 - Reading material
💬 - info around why its built like that
👷 - Bob the builder will give you the tools (hints) to what code needs to be written
📱 - When its time to test it in the browser
