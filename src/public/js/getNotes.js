async function getNotes() {
  const response = await fetch("http://localhost:3000/api/notes");

  const data = await response.json();

  console.log(data);

  const showNotes = document.getElementById("show-notes");

  const mensaje = document.getElementById("message");
  if (data.notes.length == 0) {
    mensaje.textContent = "No existen mensajes que mostrar";
  } else {
    mensaje.innerHTML = "";

    for (let i = 0; i < data.notes.length; i++) {
      const id = data.notes[i]._id;
      //creamos los elementos que se mostraran en get
      const title = document.createElement("h5");
      const date = document.createElement("small");
      const description = document.createElement("p");

      const btnDelete = document.createElement("button");
      const btnShow = document.createElement("button");
      const btnEdit = document.createElement("button");

      const note = document.createElement("div");
      const btnDiv = document.createElement("div");
      const btnForm = document.createElement("form");

      //establecer las clases
      note.className = "card mb-3 px-2 py-2 card-note";
      btnDiv.className = "d-flex flex-row mt-2";
      //asignar los valores
      title.textContent = data.notes[i].title;

      date.textContent =
        data.notes[i].date.substring(8, 10) +
        data.notes[i].date.substring(4, 8) +
        data.notes[i].date.substring(0, 4); //ordena las fechas

      description.textContent = data.notes[i].description;

      //caracteristicas de los botones
      btnShow.classList = "btn btn-primary btn-sm";
      btnDelete.classList = "btn btn-danger btn-sm";
      btnEdit.classList = "btn btn-success btn-sm mx-2";

      btnShow.id = "show" + i;
      btnShow.textContent = "Mostrar";
      btnShow.type = "button";

      btnDelete.id = "delete" + i;
      btnDelete.textContent = "Eliminar";
      btnDelete.type = "submit";

      btnEdit.id = "edit" + i;
      btnEdit.textContent = "Editar";
      btnEdit.type = "button";

      //Añadir documentos al DOM
      note.append(title);
      note.append(date);

      btnDiv.append(btnShow);
      btnForm.append(btnEdit);
      btnForm.append(btnDelete);
      btnDiv.append(btnForm);

      note.append(btnDiv);

      showNotes.append(note);

      //BOTO SHOW
      btnShow.onclick = () => {
        const modals = document.getElementById("modals");
        modals.classList.remove("active");

        const titleModal = document.getElementById("title-modal");
        titleModal.textContent = data.notes[i].title;

        const contentBody = document.getElementById("modal-body");
        contentBody.textContent = data.notes[i].description;
      };
      const btnHiden = document.getElementById('hiden')
      btnHiden.onclick = () => {
        modals.classList.add('active');
      }

      /* BOTTON ELIMINAR */
      btnDelete.onclick = () => {
        deleteNote(id);
      }

      /* BOTON EDITAR */
      btnEdit.onclick = () => {
        const title = data.notes[i].title;
        const description = data.notes[i].description;

        /* enviamos los datos a la direccion o url */
        window.location.href = 'edit.html?id=' + id + '&title=' + title + '&description=' + description;
      }
    }
  }
}

async function deleteNote(id) {
    await fetch('http://localhost:3000/api/delete/' + id, {
        method: 'DELETE',
    }).then(res => res.text()).then(res => console.log(res))
}

getNotes();
