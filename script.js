document.addEventListener('DOMContentLoaded', () => {

    fetchRandomDogImage().then(imageUrl => {
        displayDogImage(imageUrl);
    });

    fetchDogBreeds().then(breeds => {
        displayBreedList(breeds);
    });

  
    document.getElementById('breed-select').addEventListener('change', handleBreedChange);

 
    document.getElementById('random-dog-button').addEventListener('click', () => {
        document.getElementById('dog-images').innerHTML = '';
        fetchRandomDogImage().then(imageUrl => {
            displayDogImage(imageUrl);
        });
    });
});


async function fetchRandomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    return data.message;
}


async function fetchDogBreeds() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return Object.keys(data.message);
}


async function fetchImagesByBreed(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    return data.message;
}


function displayDogImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Dog Image';
    document.getElementById('dog-images').appendChild(img);
}


function displayBreedList(breeds) {
    const select = document.getElementById('breed-select');
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed;
        select.appendChild(option);
    });
}


function handleBreedChange(event) {
    const selectedBreed = event.target.value;
    const dogImagesContainer = document.getElementById('dog-images');
    dogImagesContainer.innerHTML = '';
    
    if (selectedBreed === "") {
        fetchRandomDogImage().then(imageUrl => {
            displayDogImage(imageUrl);
        });
    } else {
        fetchImagesByBreed(selectedBreed).then(images => {
            images.forEach(image => displayDogImage(image));
        });
    }
}
