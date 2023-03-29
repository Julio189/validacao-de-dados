'use strict';

(() => {
    const passwordEye = document.querySelector('[data-password-eye]')
    const inputPassword = document.querySelector('[name = "password"]')
    const state = { showPasswordValue: false }


    const showPassword = () => {
        passwordEye.classList.remove('fa-eye')
        passwordEye.classList.add('fa-eye-slash')
        inputPassword.setAttribute('type', 'text')
        state.showPasswordValue = false
    }

    const hidePassword = () => {
        passwordEye.classList.remove('fa-eye-slash')
        passwordEye.classList.add('fa-eye')
        inputPassword.setAttribute('type', 'password')
        state.showPasswordValue = true
    }

    const onPasswordClick = (event) => {
        if (passwordEye.classList.contains('fa-eye')) {
           showPassword()
           
        } else if (passwordEye.classList.contains('fa-eye-slash')) {
            hidePassword()
        }
    }

    const setListeners = () => {
        passwordEye.addEventListener('click', onPasswordClick)
    }

    const init = () => {
        setListeners()
    }

    init ()
}) ()