let cont = 0;
const fotos = ["1.jpg", "2.jpg", "3.jpg"];

const prev = () => {
    cont--;
    if (cont < 0) {
        cont = fotos.length - 1;
    }
    document.getElementById("image").src = fotos [cont];
};

const next = () => {
    cont++;
    if (cont >= fotos.length) {
        cont = 0;
    }
    document.getElementById("image").src = fotos [cont];
};

