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
    let validation = true;

    if(name.value.length<4 || !name.value.match(/ /g).length) {
        const p = document.querySelector('.form-name .error');
        p.setAttribute('style', 'visibility:visible');
        validation = false;
    }

    if (!/^[a-z0-9]+([\.-]?[a-z0-9]+)*@[a-z0-9]+([\.-]?[a-z0-9]+)*(\.[a-z]{2,3})+$/.test(email.value)) {
        const p = document.querySelector('.email .error');
        p.setAttribute('style', 'visibility:visible');
        validation = false;
    }

    if (phone.value.length < 11 || !/\d+/.test(phone.value)) {
        const p = document.querySelector('.phone .error');
        p.setAttribute('style', 'visibility:visible');
        validation = false;
    }

    if (password.value.length < 6 || password.value.length >= 9 || !/\d+/.test(password.value)) {
        const p = document.querySelector('.pass .error');
        p.setAttribute('style', 'visibility:visible');
        validation = false;
    }

    if(birthday.value){
        const birthdate = new Date(birthday.value);
        const today = new Date();
        const diff = today.getTime() - birthdate.getTime();
        const age = Math.floor(diff/(1000*60*60*24*365.25));
        if (age < 18 || age > 70) {
            const p = document.querySelector('.birthday .error');
            p.setAttribute('style', 'visibility:visible');
            validation = false;
        }
    }else{
        const p = document.querySelector('.birthday .error');
        p.setAttribute('style', 'visibility:visible');
        validation = false;
    }

    if (!terms.checked){
        const p = document.querySelector('.terms .error');
            p.setAttribute('style', 'visibility:visible');
            validation = false;
    }
    return validation;
}

const submit = async () => {
    const errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
        error.setAttribute('style', 'visibility:hidden');
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

const goBack = () => {
    // to do later
}