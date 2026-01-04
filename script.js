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
      <button class="my-button" tabindex="-1" ><img src="./img/${image}" class="img-thumbnail"  tabindex="0"
      id="${index}"  alt="${image.slice(0, -4)}" />
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
function openDialog(img) {
    currentImageId = parseInt(img.id, 10);
     createDialog(img);
      document.body.style.overflow = "hidden"; // Hintergrund-Scroll sperren 
      overlay.classList.add("active");
      dialog.showModal();

}
let createDialog = (item) => {
    dialog.innerHTML = getDialogTemplate(item);
   
}

function getDialogTemplate(item) {
    return`
    <div class="inner-dialog">
    <button class="close" onclick="closeDialog()" aria-label="Ansicht Schließen">&times;</button>
        <img src="${item.src}" alt="${item.alt}" class="dialog-image"tabindex="-1" aria-hidden="true">
        <div class="next-and-prev-buttons">
        <button class="prev-image" onclick="prevImage(${item.id})" aria-label="vorheriges Bild">
        <img src="./icon/arrow.png" aria-labelledby="next" class="arrow next" id="nextArrow" 
            alt="Prev Image">
    </button>
    <button class="next-image" onclick="nextImage(${item.id})" aria-label="nächstes Bild">
        <img src="./icon/arrow.png" aria-labelledby="next" class="arrow prev" id="nextArrow" 
        alt="Next Image">
    </button>
      </div>
    <div class="page-counter">
        ${currentImageId + 1} / ${images.length}
        </div>
    </div>`;
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
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Scroll wieder erlauben
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


