async function deleteBlog(id){
    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
    });
    if(response.ok){
        document.location.reload();
    }else{
        alert('error please try again later')
    }
}
function getIdDel(event){
    event.preventDefault();
    let info = event.target;
    const id = info.getAttribute('data');
    deleteBlog(id)
}

async function createBlog(){
    const title = document.querySelector('#blogTitle').value.trim();
    const text = document.querySelector('#blogText').value.trim();

    if(text && title){
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({title:title, description:text}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            document.location.reload()
        }else{
            alert('error posting, please try again later')
        }
    }
} 

async function editBlog(id,text){
    const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: text})
    });
    if(response.ok){
        console.log('done')
        document.location.reload();
    }else{
        alert('error please try again later')
    }
}


async function showForm(event){
    event.preventDefault();
    let info = event.target;
    const parent = await info.parentNode;
    const form = await parent.querySelector('#editForm') 
    console.log(form)
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
async function showBlog(event){
    event.preventDefault();
    let info = event.target;
    const parent = await info.parentNode;
    const form = await parent.querySelector('#formBlog') 
    console.log(form)
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

async function getEditId(event){
    event.preventDefault();
    let info = await event.target;
    const id = await info.getAttribute('data');
    const text = await event.target.parentNode.querySelector('#editText').value.trim()
    editBlog(id,text);
}

document.querySelectorAll('#delete').forEach(e => e.addEventListener('click', getIdDel));

document.querySelector('#toggleCreate').addEventListener('click',showBlog)

document.querySelector('#create').addEventListener('click', createBlog);

document.querySelectorAll('#edit').forEach(e => e.addEventListener('click', showForm));

document.querySelectorAll('#submitEdit').forEach(e => e.addEventListener('click', getEditId));
