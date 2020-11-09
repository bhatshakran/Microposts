class UI{
    constructor() {
        this.title = document.getElementById('title');
        this.body = document.getElementById('body');
        this.subBtn = document.getElementById('btn-sub');
        this.posts = document.getElementById('posts');
        this.id = document.getElementById('id');
        this.forState = 'add';
        this.postCtr = document.querySelector('.postsContainer');
    }

    // display posts in the ui

    showPosts(posts) {
        let output = '';
        posts.forEach(post => {
            output += `<div class= "column is-3-4 card ml-5 mr-5 mb-3 mt-3">
            <header class = "card-header ">
                <p class="card-header-title">${post.title}</p>
            </header>
            <div class = "card-content pl-0">
                <div class= "content">${post.body}</div>
            </div>
            <span class = "icon ml-1 edit" data-id="${post.id}">
            <i class = "material-icons" style="cursor:pointer">create</i>
            </span>
            <span class = "icon ml-1 dlt" data-id="${post.id}">
            <i class = "material-icons mr-2" style="cursor:pointer;">clear</i>
            </span>
           
            </div>`
        })


        this.posts.innerHTML= output;
    }


    showAlert(message, className) {
        // clear any alert if present
        this.clearAlert();
        // create a div
        const div  = document.createElement('div');
        div.className = className;
        // append text to div
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.postsContainer');
        //  insert the div
        container.insertBefore(div, this.posts);
        setTimeout(()=> {
            {
                this.clearAlert();
            }
        }, 3000) 
    }

    // clear alert message

    clearAlert() {
        const currAlert = document.querySelector('.notification');

        if(currAlert) {
            currAlert.remove();
        }
    }

    // clear fields

    clearFields() {
        this.title.value ='';
        this.body.value = '';
    }

    // fill form to edit
    fillForm(data) {
        this.title.value = data.title;
        this.body.value = data.body;
        this.id.value  =data.id;
        this.changeFormState('edit');
    }

    // Clear id hidden value
    clearIdInput() {
        this.id.value = '';
    }


    // Change form state edit/add


    changeFormState(type) {
        if(type === 'edit') {
            this.subBtn.textContent = 'Update Post';
            this.subBtn.classList.remove('is-primary');
            this.subBtn.classList.add('is-black');
            // Create cancel button
            const button = document.createElement('button');
            button.className = 'button is-small is-info is-fullwidth post-cancel';
            button.appendChild(document.createTextNode('Cancel Edit'));


            // Get Parent
            const formEnd = document.getElementById('formEnd');
            this.postCtr.insertBefore( button, formEnd);
        }else {
            // sets it back to add post
            this.subBtn.textContent = ' Post  It';
            this.subBtn.classList.remove('is-danger');
            this.subBtn.classList.add('is-primary');
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID from hidden field
            this.clearIdInput();

            // Clear text
            this.clearFields()
            
        }
    }
}

export const ui = new UI();