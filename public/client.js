
document.addEventListener('DOMContentLoaded', function(){
    let succesErrorMessage = document.querySelector('.errorMessages')
    if(succesErrorMessage.innerHTML !==''){
        setTimeout(function(){
            succesErrorMessage.innerHTML = ''
        }, 4000)

        }
})

document.addEventListener('DOMContentLoaded', function(){
    let greet = document.querySelector('.greetSection')
    if(greet.innerHTML !==''){
        setTimeout(function(){
            greet.innerHTML = ''
        }, 4000)

        }
})



