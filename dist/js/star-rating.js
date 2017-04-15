/* Nano Templates - https://github.com/trix/nano */
function nano(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}

function selectRating(element) {
    var form = document.querySelector('.' + element);
    var inputs = form.getElementsByTagName('input');
    var inputList = Array.prototype.slice.call(inputs);
    var ratingText = form.getElementsByClassName('star-rating-text')[0];
    
    inputList.forEach(function(input) {
        input.addEventListener('click', function(){
            ratingText.innerHTML = 'You selected: ' + input.dataset.rating;
        });
    });
};

(function(){
    var inputsDemoJson = [
        {
            "id": "0",
            "form_name": "defaultInputs",
            "rating_stars": 5,
            "rating_height": "xl",
            "rating_has_input": true,
            "rating_input_name": "demo-input",
            "rating_input_value": 0,
            "rating_input_text": "Select a rating"
        },
        {
            "id": "1",
            "form_name": "defaultInputs",
            "rating_stars": 5,
            "rating_height": "xl",
            "rating_has_input": false,
            "rating_input_name": "demo-static",
            "rating_input_value": 3.2,
            "rating_input_text": "Select a rating"
        }
    ];
    var inputsDemoHolder = document.getElementById('starsWithInputs');
    var inputsDemoTemplate = document.getElementById('templateForRatingsWithInputs').innerHTML;
    var staticDemoHolder = document.getElementById('starsJustStatic');
    var staticDemoTemplate = document.getElementById('templateForStaticRatings').innerHTML;
    

    var d;
    inputsDemoJson.forEach(function(rating){
        if(rating.rating_has_input == true){
            d = document.createElement('form');
            d.className = rating.form_name;
            d.classList.add('mrg-sep-xs');
            d.innerHTML = nano(inputsDemoTemplate, rating);
            inputsDemoHolder.appendChild(d);

            selectRating(rating.form_name);
        } else {
            d = document.createElement('div');
            d.className = 'mrg-sep-xs';
            d.innerHTML = nano(staticDemoTemplate, rating);
            staticDemoHolder.appendChild(d);
        }
    });
    
})();
