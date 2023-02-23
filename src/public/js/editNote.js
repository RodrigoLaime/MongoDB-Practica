const btnEdit = document.getElementById('btn-Edit');

//obtener los parametros a traves de la url //los datos que se enviaron a la url desde getNotes

const values = window.location.search; //obtiene los parametros

const urlParams = new URLSearchParams(values);//creamos una instacia de los valores

var id = urlParams.get('id');
var titleParam = urlParams.get('title');
var descriptionParam = urlParams.get('description');

/* obtenemos los input del html */
const titlee = document.getElementById('title');
const descriptionn = document.getElementById('description');



/* asignar los valores  */
titlee.value = titleParam;
descriptionn.value = descriptionParam;

btnEdit.onclick = () => {
    const titleValue = titlee.value;
    const descriptionValue = descriptionn.value;

    const alerEdit = document.getElementById('alert-edit');

    if(titleValue == '' || descriptionValue == '') {
        alerEdit.classList.remove('active');
        setTimeout(() => {
            alerEdit.classList.add('active');
        }, 5000);
    } else {
        updateData(id, titleValue, descriptionValue);
        window.location.href = '/'
    }
}

async function updateData(id, title, description) {
    const response = await fetch('http://localhost:3000/api/update/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'aplication/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'description': description
        })
    });
/* para visualizar en consola la info */
    const data = await response.json();
    console.log(data);
}