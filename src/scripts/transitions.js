window.addEventListener('load', () => {
  document.body.classList.add('entrance');
});

const animateOut = (e) => {
  e.preventDefault();
  var target = e.currentTarget.getAttribute('href');

  document.body.classList.add('exit');

  setTimeout(function () {
    window.location = target;
    clearTimeout(this);
  }, 1250);
}

Array.from(document.querySelectorAll('a')).forEach(anchor => {
  anchor.addEventListener('click', animateOut);
})
