// background.js

// Initialize a Set to store unique parameter names
let parameterNames = new Set();

// Load existing parameter names from storage
chrome.storage.local.get(['parameterNames'], (result) => {
    if (result.parameterNames) {
        parameterNames = new Set(result.parameterNames);
    }
});


// Listener for web requests.
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        try{
             // Parse the URL
            const url = new URL(details.url);
    
            // Extract the parameters
            const params = new URLSearchParams(url.search);
    
            // Loop through the parameters and add them to the set
            for (let [key, value] of params.entries()) {
               parameterNames.add(key);
            }
    
            // Update storage
            chrome.storage.local.set({parameterNames: Array.from(parameterNames)}, () => {
            // console.log("Parameters saved:", Array.from(parameterNames));
        });
        }
        catch(e) {
            // console.error("Error processing URL: ", details.url, e);
        }

    },
    {urls: ["<all_urls>"]},
    ["requestBody"]
);

// Optional: Clear all stored params
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.message === "clear_params"){
        parameterNames = new Set();
        chrome.storage.local.set({parameterNames: Array.from(parameterNames)}, () => {
          sendResponse({message: "params cleared"});
        });
        
        // this is important if sending a response
        return true;
      }
    }
  );