const btn = document.getElementById('btn');

btn.onclick = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const alert = document.getElementById('alerta'); 

    if(title == '' || description == '') {
            alert.classList.remove('active');
            setTimeout(() => {
                alert.classList.add('active');
            }, 5000);
    } else {
        //guardar los datos en la base de dato
        postData(title, description);
    };
}

async function postData(title, description){
    const response = await fetch('http://localhost:3000/api/save', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': title,
            'description': description
        })
    });

    const data = await response.json();
    console.data(data);
}