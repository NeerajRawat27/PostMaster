console.log("this is project6");

// initilize no. of parameter
let paramCount = 0;
// Hide params box initially
let paramterBox = document.getElementById('parameterBox');
paramterBox.style.display = 'none';

// Utitlity function:
// 1.Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;

}
// If user click on json box, hide the params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parameterBox').style.display = 'none';
})

// If user click on params box, hide the json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})

// If the user click on + button, add more parameter
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {

    let string = `<div class="row my-2">
    <label for="url" class="col-sm-2 col-form-label ">Parameter${paramCount + 2}</label>
    <div class="col">
        <input type="text" class="form-control" id="parameterKey${paramCount + 2}" placeholder="Enter the parameter ${paramCount + 2} key">
    </div>
    <div class="col">
        <input type="text" class="form-control" id="parameterValue${paramCount + 2}"
            placeholder="Enter the parameter ${paramCount + 2} value">
    </div>
    <div class="col">
        <button id="addParams" class="btn btn-primary deleteParam">-</button>
    </div>

</div>`
    // convert the element string to DOM node
    let element = getElementFromString(string);
    //console.log(element);
    params.appendChild(element);
    paramCount++;
    let deleteParam = document.getElementsByClassName('deleteParam');
    // Add an event listener to remove the parameter on clicking - button
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {

            e.target.parentElement.parentElement.remove();

        })
    }



})

// If user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJsonText').value = "please wait.. Fetching response...";
    document.getElementById('responsePrism').innerHTML = "please wait.. Fetching response...";
    //prism.highlightAll();

    // fetch all value which is entered by user
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='Request Type']:checked").value;
    let contentType = document.querySelector("input[name='Content Type']:checked").value;

    console.log(url);
    console.log(requestType);
    console.log(contentType);

    let data = {};
    if (contentType == 'params') {
        for (let i = 0; i < paramCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {

                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;

            }
        }
        data = JSON.stringify(data);
        // console.log(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    // if the request type is get, invoke fetch api to create a post request
    if (requestType == 'GET') {
        fetch(url).then(response => response.text()).then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();


        })

    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: { "Content-Type": "application/json" }

        }).then(response => response.text()).then((text) => {

            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();


        })

    }
})