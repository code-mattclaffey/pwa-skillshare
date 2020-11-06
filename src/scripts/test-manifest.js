const validateManifest = (manifest) => {
  const icons = manifest.icons.filter((icon) => {
    return (
      icon.sizes === "48x48" ||
      icon.sizes === "72x72" ||
      icon.sizes === "96x96" ||
      icon.sizes === "144x144" ||
      icon.sizes === "168x168" ||
      icon.sizes === "192x192" ||
      icon.sizes === "512x512"
    );
  });

  const testCases = [
    [
      manifest.hasOwnProperty("short_name"),
      "Manifest does not have a short name property. This is used if there is insufficient space.",
    ],
    [
      manifest.hasOwnProperty("name"),
      "Manifest does not contain a name property. This provides a human readable name to the user.",
    ],
    [
      manifest.hasOwnProperty("icons"),
      "Manifest does not contain a icons property",
    ],
    [
      icons.length === 7,
      "You need icon sizes of 48, 72, 96, 144, 168, 192, 512 in your icons property array. Check MDN for icon format.",
    ],
    [
      manifest.hasOwnProperty("start_url"),
      "Manifest does not contain a start_url property. This is the root url that the application opens.",
    ],
    [
      manifest.start_url.includes("?utm_source=homescreen"),
      "Start url does not have a utm source of home screen. We need this to track where our users have come from.",
    ],
    [
      document.querySelector('link[rel="manifest"]') !== null,
      "Manifest does not exist in the dom. You need a meta tag with the rel attribute to be manifest & href to the file.",
    ],
    [
      manifest.hasOwnProperty("display"),
      "Manifest does not contain a display property. This defines the developers preferred display mode for the web application.",
    ],
    [
      manifest.hasOwnProperty("theme_color"),
      "Manifest does not contain a theme_color property. This is the colour for an application, this appears on the tab bar as well as the background colour on the splash screen.",
    ],
    [
      manifest.hasOwnProperty("background_color"),
      "Manifest does not contain a background_color. This property defines the background colour of the application.",
    ],
    [
      manifest.hasOwnProperty("description"),
      "Manifest does not contain a description property. This provides a general description of what the web application does.",
    ],
  ];

  const invalidCases = testCases.filter((testCase) => {
    if (testCase[0]) {
      return `<li class="errors__item">${testCase[1]}</li>`;
    }
  });

  if (invalidCases.length > 0) {
    const errorContainer = document.querySelector("[data-test-errors]");
    errorContainer.innerHTML = invalidCases.join("");
  }
};

const validateRequest = (response) => {
  if (request.status >= 200 && request.status < 400) {
    return response.json;
  }

  throw Error("Not found");
};

const handleError = () => {
  const errorContainer = document.querySelector("[data-test-errors]");
  errorContainer.innerHTML = `<li class="errors__item">Unable to find manifest.json please make sure it is in the root of build.</li>`;
};

const testManifest = () => {
  fetch("/assets/manifest.json")
    .then(validateRequest)
    .then(validateManifest)
    .catch(handleError);
};

const manifestButton = document.querySelector('[data-test-btn="manifest"]');

if (manifestButton) {
  manifestButton.addEventListener("click", testManifest);
}
