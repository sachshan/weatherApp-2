const wform = document.querySelector('form');
const lSearch = document.querySelector('input');
const m1 = document.querySelector('#m1');
const m2 = document.querySelector('#m2');

m1.innerText = "Hey this is the frontend js"


wform.addEventListener('submit',(event)=>{

    event.preventDefault();
    console.log('/weather?address=+'+lSearch.value);
    
    fetch('/weather?address=+'+ lSearch.value).then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            console.log(data.error);
        }
        else
        {
            console.log(data.location + " " + data.weather_description);
        }
    })
})

});
        





    
