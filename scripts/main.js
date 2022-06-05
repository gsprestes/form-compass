// navigation
const routes = {
    "/": "components/form.html",
    "/sent": "components/success.html"
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    navigation();
}

const navigation = async (path) => {
    const content = document.querySelector('.content');
    const route = routes[path]
    const component = await fetch(route).then((data) => data.text());
    content.innerHTML= component;
}

window.route = route;

// form

const isValid = () => {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const password = document.querySelector('#password');
    const birthday = document.querySelector('#birthday');
    const terms = document.querySelector('#terms');

    if(name.value.length<4 || name.value.count(" ")) {
        const p = document.createElement('p');
        p.classList.add("error");
        p.innerHTML = "Fullname Invalid";
        name.after(p)
        return false;
    }

    return true;
}

const submit = async () => {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
        error.remove();
    })
    if (isValid()) {
       await navigation("/sent")
       document.querySelector('.button')?.addEventListener('click', goBack)
    } 
}

const goForm = async () => {
    await navigation("/");
    document.querySelector('#button')?.addEventListener('click', submit)
}

document.addEventListener('DOMContentLoaded', function () {
    goForm();
}, false);
