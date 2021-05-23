console.log("this is my project from javascript")

// hide the parameter box intinatilly
let parameter = document.getElementById("parametersBox");
parameter.style.display = 'none';

let requestJsonBox = document.getElementById("requestJsonBox");
// requestJsonBox.style.display = 'none';

// if the user click on the params hide the json box
// if the use click on the json box hide the param box

let paramsRadio = document.getElementById('paramsRadio')

paramsRadio.addEventListener('click', () => {
    parameter.style.display = 'block';
    requestJsonBox.style.display = 'none'
    console.log("click")
})

let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener("click", () => {
    requestJsonBox.style.display = 'block';
    parameter.style.display = 'none'

})

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// for initalizing the param count
let count = 0;

// this will append the parama
let addparams = document.getElementById('addParam');
addparams.addEventListener("click", () => {
    let string = `<div class="form-row my-3">
            <label for="url" class="col-sm-2 col-form-label">Parameter ${count + 2} </label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${count + 2}" placeholder="Enter Parameter ${count + 2} Key">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${count + 2}" placeholder="Enter Parameter ${count + 2} Value">
            </div>
            <button i class="btn btn-primary deleteParam">-</button>
        </div>`
    count++;
    // paramsElement is the inner html of the params
    let paramsElement = getElementFromString(string);
    let param = document.getElementById('params');
    //appendinf in the param div
    param.appendChild(paramsElement);
    // console.log(param)
    // console.log(params)
    // console.log("lsdf")
    // console.log("lfhdios")

    // this will delete the specific element frm the param
    let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
})

// creating the function for sumbit

let sumbit = document.getElementById('submit');
sumbit.addEventListener('click', () => {
    let responseJsonText = document.getElementById('responsePrism').value = 'Please wait fetching the API.......'

    //fetch all the log data
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //if the user input the params insted of json collect data in object form
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < count + 1; i++) {
           if (document.getElementById('parameterKey'+(i + 1)) != undefined) {
                Key = document.getElementById('parameterKey'+(i + 1)).value;
                value = document.getElementById('parameterValue'+(i + 1)).value;
                data[Key] = value;
        }
    }
    // convert the data from obect to string
        data = JSON.stringify(data)
    
    }
    else{
        data = document.getElementById('responsePrism').value
    }
    // log all the enter data for debbuging
    console.log("url is",url)
    console.log('request type is ',requestType);
    console.log('content type is' ,contentType);
    console.log('data is',data);
    // if the request type is get 
    if(requestType=='GET'){
        fetch(url , {
            method: 'GET',
        }).then(response=> response.text())
        .then(text=>{
            document.getElementById('responsePrism').innerHTML = text
        })
    }
    else{
        fetch(url , {
            method: 'POST',
            body: data ,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              } 
        }).then(response=> response.text())
        .then(text=>{
            document.getElementById('responsePrism').innerHTML = text
        })  
    }
    
}
)


