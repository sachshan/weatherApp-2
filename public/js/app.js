const wform = document.querySelector('form');
const lSearch = document.querySelector('input');
const m1 = document.querySelector('#m1');
const m2 = document.querySelector('#m2');




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
            m1.innerText = data.location
            m2.innerText = "The weather is "+ data.weather_description+", and feels like "+ data.feelslike+" ,with the temperature of "+data.temperature+".";
        }
    })
})

});
        





    
