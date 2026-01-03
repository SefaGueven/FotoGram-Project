const imagesContainer =document.getElementById("content");
const dialog = document.getElementById("dialogContent");
let currentImageId = null;
let images =[
    'eagle.jpg',
    'HouseOnMountain.jpg',
    'jellyfish.jpg',
    'Himeji.jpg',
    'poppies.jpg',
    'poppyseed.jpg',
    'sarajevo.jpg' ,
    'ship.jpg' ,
    'lotus.jpg' ,
    'squirrel.jpg',
    'waves.jpg',
    'orangefish.jpg',
    'passion-fruit.jpg',
];

function displayImages(){
    imagesContainer.innerHTML = "";
    images.forEach((image, index) => {
    imagesContainer.innerHTML += getNoteTemplate(image, index);
    createEventListenersForImages();
});
}

function getNoteTemplate(image, index) {
    return`
      <img src="./img/${image}" class="img-thumbnail" 
      id="${index}" tabindex="0" alt="${image.slice(0, -4)}" 
     role="button"/> 
     `;  
}

function createEventListenersForImages() {
    const imgElements = imagesContainer.querySelectorAll("img");
   
    // Add event listeners to each image for keyboard navigation and click events
    imgElements.forEach((img) => {
        img.addEventListener("keydown",(event) => {
      if (event.key === "Enter") {
        event.preventDefault(); 
        openDialog(img);
      }
    });
    img.addEventListener("click", () => {
      openDialog(img);
        });
    });
}
 
function openDialog(index) {
    currentImageId =index; 
     createDialog(index);
      dialog.showModal();
}

let createDialog = (item) => {
    dialog.innerHTML="";
    dialog.innerHTML += getDialogTemplate(item);
}

function getDialogTemplate(item) {
    return`
    <div class="inner-dialog">
      <button class="close" onclick="closeDialog()" aria-label="Ansicht Schließen">&times;</button>
      ${item.outerHTML}
      <div class="next-and-prev-buttons">
        <button class="prev-image" id="prev" onclick="prevImage(${item.id})" aria-label="vorheriges Bild">
          <img src="./icon/arrow.png" aria-labelledby="next" class="arrow next" id="nextArrow" 
            alt="Next Image">
        </button>
        <button class="next-image" id="next" onclick="nextImage(${item.id})" aria-label="nächstes Bild">
          <img src="./icon/arrow.png" aria-labelledby="next" class="arrow prev" id="nextArrow" 
            alt="Next Image">
        </button>
      </div>
  </div>
    `;
}

// Check if the click is outside the dialog
function closeDialogOnClickOutside(event) {
    if (event.target==dialog) {
        closeDialog();
    }
}

// check if the dialog is open before trying to close it
function closeDialog() {
    if (dialog.open) {
        dialog.close();
        dialog.innerHTML ="";
    }
}

// showing next and previous image onclick
function nextImage(id) {
    let nextId = id + 1;
    if (id== images.length -1) {
        nextId = 0;
    }
     currentImageId = nextId; 
     const nextImage = document.getElementById(nextId);
      createDialog(nextImage); }

function prevImage(id) {
    let prevId = id -1;
    if (id == 0){
        prevId = images.length -1 ;
    }
    currentImageId = prevId;
     const prevImage = document.getElementById(prevId); 
     createDialog(prevImage);
}

document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;

    if (event.key === "ArrowRight") {
        nextImage(currentImageId);
    }

    if (event.key === "ArrowLeft") {
        prevImage(currentImageId);
    }

    if (event.key === "Escape") {
        closeDialog();
    }
});
