document.addEventListener('DOMContentLoaded', function() {
    const paramList = document.getElementById('paramList');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');


    function displayParameters(){
        chrome.storage.local.get(['parameterNames'], (result) => {
            const params = result.parameterNames || [];
            paramList.innerHTML = '';
            params.forEach(param => {
            const listItem = document.createElement('li');
                listItem.textContent = param;
                paramList.appendChild(listItem);
            });
        });
    }

    displayParameters()

    copyButton.addEventListener('click', function() {
        chrome.storage.local.get(['parameterNames'], (result) => {
            const params = result.parameterNames || [];
            navigator.clipboard.writeText(params.join('\n'));
          });
    });

    clearButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message:"clear_params"}, function(response) {
          if(response.message === "params cleared"){
            displayParameters()
          }
        });
    });

    
});