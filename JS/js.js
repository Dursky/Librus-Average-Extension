function isFloat(n){return Number(n) === n && n % 1 !== 0;}//Check if number is float

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      var array_price = []
      var doc = new DOMParser().parseFromString(request.source, "text/html")
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if(url.includes("przegladaj_oceny")){                      
            var length_elements =doc.body.querySelectorAll('td.right').length;
            console.log(length_elements);
            for (var i = 0; i <length_elements;i++){
                var single_element =doc.body.querySelectorAll('td.right')[i].textContent;
               var floats = parseFloat(single_element)
               if (floats !== parseInt(floats, 10)){
               if(isFloat(floats)==true){
                array_price.push(floats)
               }}
            }
            message.innerText = ((array_price.reduce((a, b) => a + b, 0))/array_price.length).toFixed(3);
        }       
    });
    }
  });
  
  function onWindowLoad() {
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }
  window.onload = onWindowLoad;