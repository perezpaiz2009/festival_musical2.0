document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  document.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const CantImagenes = 16;
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= CantImagenes; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen galeria";

    //Event Handler
    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

function mostrarImagen(i) {
  const imagen = document.createElement("IMG");
  imagen.src = `src/img/gallery/full/${i}.jpg`;
  imagen.alt = "Imagen galeria";

  //Creando Modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = cerrarModal;

  //Boton cerrar Modal
  const cerrarModalBtn = document.createElement("BUTTON");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  //Agregar al HTML
  const body = document.querySelector("BODY");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");

  setTimeout(() => {
    const body = document.querySelector("BODY");
    body.classList.remove("overflow-hidden");
    //Si la clase modal existe se remueve el modal
    modal?.remove();
  }, 500);
}

function resaltarEnlace() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    let actual = "";
    sections.forEach((section) => {
      //la ditancia que hay entre el elemento padre y su hijo en el DOM
      const sectionTop = section.offsetTop;
      //Muestra la altura de un elemento.
      const sectionHeight = section.clientHeight;
      //al hacer scroll hacia arriba o abajo permite resaltar como la seccion actual
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);
      console.log(section);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
