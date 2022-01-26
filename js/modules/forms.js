import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector ,modalTimerId){
// Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading : 'img/form/spinner.svg',
        success: 'Спасибо! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // const postData = async (url, data) => {
    //     const res = await fetch(url, {
    //         method:"POST",
    //         headers:{
    //             'Countent-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await res.json();
    // };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            // statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // будет ошибка из-за связки XMLHttpRequest и form-date заголовок поэтому не нужно устанавливать
            // request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);
            // создавать на inputah name="" всегда!

            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const json = JSON.stringify(object);


            // request.send(json);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            
            // request.send(formData);
            
            // request.addEventListener('load', () => {
            //     if(request.status === 200){
            //         console.log(request.response);
            //         // statusMessage.textContent = message.success;
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     }else{
            //         showThanksModal(message.failure);
            //     }
            // }); 
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers:{
    //         'Content-type': 'application/json'
    //     }
    // }).then(response => response.json()).then(json => console.log(json));    

    // json-server db
    // npx json-server db.json
    // fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));

}

export default forms;