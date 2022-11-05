console.log('%c HI', 'color: firebrick')

function init(){
    images()
    breedList()

    function images(){
        return fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(response => response.json())
        .then(data => {
            let photoArray = data.message
            photoArray.forEach(element => {
                let imageDiv = document.getElementById('dog-image-container')
                let newImage = document.createElement('img')
                newImage.src = element
                imageDiv.appendChild(newImage)
            });
        })
    }

    function breedList(){
        return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(dogBreed => {
            let breedsArray = Object.keys(dogBreed.message)
            breedsArray.forEach(breed => {
                let list = document.getElementById('dog-breeds')
                let newListElement = document.createElement('li')
                newListElement.className = "dogs-list"
                newListElement.innerText = breed
                list.appendChild(newListElement)
                addColorEvent()
            })
        })
    }

    function addColorEvent(){
        let breedsLiElement = document.getElementById('dog-breeds')
        let breedsChild = [...breedsLiElement.children]
        breedsChild.forEach(item =>{
            item.addEventListener('click', changeColor)
        })
    }

    function changeColor(event){
        event.target.style.color = 'red'
    }

    document.getElementById('breed-dropdown').onchange = dropdownFilterCheck
    function dropdownFilterCheck(){
        let filterOption = document.getElementById('breed-dropdown').value
        let breedsLiElement = document.getElementById('dog-breeds')
        let breedsChild = [...breedsLiElement.children]
        breedsChild.forEach(item => {
            let listsFirstLetter = item.innerText.charAt(0)
            if(filterOption === listsFirstLetter){
                item.hidden = false
            }
            if(filterOption !== listsFirstLetter){
                item.hidden = true
            }
        })
    }
}
document.addEventListener('DOMContentLoaded', init)