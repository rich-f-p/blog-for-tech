

async function showComment(event){
    event.preventDefault();
    let info = event.target;
    const parent = await info.parentNode;
    const form = await parent.querySelector('#commentForm') 
    console.log(form)
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

async function addComment(event){
    event.preventDefault();
    let info = await event.target;
    const id = await info.getAttribute('data');
    const text = await event.target.parentNode.querySelector('#commentText').value.trim()
    const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({comment: text, blog_id: id}),
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


// async function getBlogId(event){
//     event.preventDefault();
//     let info = await event.target;
//     const id = await info.getAttribute('data');
//     const text = await event.target.parentNode.querySelector('#commentText').value.trim()
//     addComment(id,text);
// }

document.querySelector('#submitComment').addEventListener('click', addComment)
document.querySelector('#addComment').addEventListener('click', showComment)