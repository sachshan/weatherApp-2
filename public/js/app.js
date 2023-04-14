fetch('/weather?address=Boston').then((response)=>{
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

const wform = document.querySelector('form');
const lSearch = document.querySelector('input');

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
        





    
