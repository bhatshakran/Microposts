import {http} from './http'
import {ui} from './ui'

//  add event listener on dom load
document.addEventListener('DOMContentLoaded', getPosts);

// add event listner to post it button should create a post and also display
document.getElementById('btn-sub').addEventListener('click', submitPost);

// add event listener to posts 
document.getElementById('posts').addEventListener('click', deletePost);
// add event listener to posts for editing
document.getElementById('posts').addEventListener('click', editPost);

// add event listener to postContainer

document.querySelector('.postsContainer').addEventListener('click', cancelPost);

 function getPosts() {
    http.get("http://localhost:3000/posts")
    .then(result=>
        {
            ui.showPosts(result);
        })
    .catch(err=>console.log(err))
}


function submitPost() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const id = document.getElementById('id').value;

    const data ={
        title,
        body
    }

// Validate the input

if(title === '' ||body === '') {
    ui.showAlert('Please fill all the fields',  'notification is-danger')
}else {
    if(id === '') {
        // Create Post
        http.create('http://localhost:3000/posts', data)
        .then(data=>{
            ui.showAlert('Post added', 'notification is-success ');
            ui.clearFields();
            getPosts();
        }
            )
        .catch(err=>console.log(err));
    }else {
        // update the post

        http.put(`http://localhost:3000/posts/${id}`, data)
    .then(data=>
        {
            ui.showAlert('Post has been updated', 'notification is-success');
            ui.changeFormState('add');
            getPosts()
        })
    .catch(err=>console.log(err))
    }

}


    
}

    // delete post

    function deletePost(e) {
        e.preventDefault();
        if(e.target.parentElement.classList.contains('dlt')) {
            const id = e.target.parentElement.dataset.id;
            if(confirm('Are you sure??')) {
                http
                .delete(`http://localhost:3000/posts/${id}`)
                .then(() => {
                    ui.showAlert('Post removed', 'notification is-success');
                    getPosts();
                })
                .catch(err=>console.log(err));
            }
        }
    }

    // Edit the post

    function editPost(e) {
        e.preventDefault();
        if(e.target.parentElement.classList.contains('edit')) {
            const body = e.target.parentElement
            .previousElementSibling.childNodes[0].nextSibling.textContent;
            const title = e.target.parentElement.previousElementSibling
                .previousElementSibling.childNodes[0].nextSibling.textContent;
            const id = e.target.parentElement.dataset.id;  
                
                     
                const data = {
                    id,
                    title,
                    body
                };
                // Fill form
                ui.fillForm(data);
                
        }
    }


    // cancel the post edit

    function cancelPost(e) {
        if(e.target.classList.contains('post-cancel')) {
            ui.changeFormState('add');
        }
    }