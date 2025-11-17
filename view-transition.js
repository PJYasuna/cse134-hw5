console.log("View Transition script loaded!");

document.addEventListener("click", async (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  console.log("Link clicked:", link.href);
  const url = new URL(link.href);

  if (url.origin !== window.location.origin) return;
  
  if (link.target === "_blank") return;

  e.preventDefault();

  if (!document.startViewTransition) {
    console.log("View Transition API not supported, navigating normally");
    window.location.href = url.href;
    return;
  }

  console.log("Starting view transition...");


  const response = await fetch(url.href);
  const html = await response.text();

  const parser = new DOMParser();
  const newDocument = parser.parseFromString(html, "text/html");
  

  const transition = document.startViewTransition(() => {
    document.body.innerHTML = newDocument.body.innerHTML;
    document.title = newDocument.title;
    window.history.pushState({}, "", url.href);
    console.log("Content replaced!");
  });

  await transition.finished;
  console.log("Transition complete!");
  

  const scripts = newDocument.querySelectorAll("script[src]");
  scripts.forEach(script => {
    if (script.src.includes("toggle.js")) {
      const event = new Event("DOMContentLoaded");
      document.dispatchEvent(event);
    }
  });
});