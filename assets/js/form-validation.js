'use strict';

//IIFE -- Nao monstrar as formulas dos resultados no console

(() => {

    const form = document.querySelector('[data-form]')
    const progressBar = document.querySelector('[data-requirement-progressbar]')
    const fields = {}
    const requirements = {}
    const iconsCheck = {}
    const state = { passwordStrength: 0 }



    // == Muda a cor do progressBar pela porcentagem ===
    const styleProgressBar = () => {
        progressBar.style.width= `${state.passwordStrength}%`
        progressBar.dataset['percentage'] = state.passwordStrength
    }


//====== Mostrar a mensagem de erro ======= 
    const showMessageError = (field, message) => {
        const  { element, errorElement } = field 
        element.classList.add('error')
        errorElement.style.display = 'block'
        errorElement.textContent = message
    } 

//====== Tira a mensagem de erro ==========
    const hideMessageError = (field) => {
        const { element, errorElement } = field
        element.classList.remove('error')
        errorElement.style.display = 'none'
        errorElement.textContent = ''
    }


//======== Validar os campos =======
    const validateRequiredFields = () => {
        let isInvalid = false
        for (const fieldKey in fields) {
            const field = fields[fieldKey]
            const { element, errorElement, isRequired } = field
            if ((!element.value || (fieldKey === 'terms' && !element.checked)) && isRequired)  {
                isInvalid = true
                showMessageError(field,'This field is Required !!')
            }
        }
        return isInvalid 
    }

    // === Validar a forca da senha ====
    const validatePasswordStrength = () => {
        let isInvalid = false
        const field = fields['password']
        if (state.passwordStrength < 100) {
            isInvalid = true
            showMessageError(field,'Enter a valid password !')
        }
        return isInvalid
    }

    // === Validar o email ====
    const validateEmail = () => {
        let isInvalid = false
        const field = fields['email']
        const {value} = field.element
        if (!value.match(/^[a-z0-9_\.]+@[a-z0-9]+(\.[a-z0-9]+)+$/)) {
            isInvalid = true
            showMessageError(field,'Enter a valid email !')
        }
        return isInvalid
    }

    // === Coloca o iconCheck e tira o iconXmark ====
    const setIconCheck = (name) => {
        if (iconsCheck[name].classList.contains('fa-circle-xmark')) {
            iconsCheck[name].classList.remove('fa-circle-xmark')
            iconsCheck[name].classList.add('fa-circle-check')

        } 
    }

    // === Coloca o iconXmark e tira o iconCheck
    const setIconXmark = (name) => {
        if (iconsCheck[name].classList.contains('fa-circle-check')) {
            iconsCheck[name].classList.remove('fa-circle-check')
            iconsCheck[name].classList.add('fa-circle-xmark')
        }
    }


    // == Pegando os valores da senha --- Usando Regular Expression para colocar regras de validação da senha ==
    const onInputPasswordKeyUp = (event) => {
        const value = event.target.value
        // Regular Expression
        const lowerCasePattern = new RegExp (/[a-z]/) // Pelo menos uma letra minuscula
        const upperCasePattern = new RegExp (/[A-Z]/) // Pelo menos uma letra maiuscula
        const numberPattern = new RegExp (/[0-9]/) // Pelo menos um numero
        const specialCharacterPattern = new RegExp (/[!@#$%\^&*~)\[\]{}?\.(+=\-_]/) // Pelo menos um caracter
        
        state.passwordStrength = 0
        
        // === Match... se o valor combina com o valor da variavel ===

        // === Forma simplificada, usando outra funçao ===

        if (value.match(lowerCasePattern) && value.match(upperCasePattern)) {
            state.passwordStrength += 25
            requirements['lowerUpperCase'].classList.add('checked')
            setIconCheck('lowerUpperCase__checkIcon')
        } else {
            requirements['lowerUpperCase'].classList.remove('checked')
            setIconXmark('lowerUpperCase__checkIcon')
        } 
        
        if (value.match(numberPattern)) {
            state.passwordStrength += 25
            requirements['number'].classList.add('checked')
            setIconCheck('number__checkIcon')
        } else {
            requirements['number'].classList.remove('checked')
            setIconXmark('number__checkIcon')
        }
        
        

        // === Forma sem usar outra funcao ===
        if(value.match(specialCharacterPattern)) {
            state.passwordStrength += 25
            requirements['specialCharacter'].classList.add('checked')
            setIconCheck('specialCharacter__checkIcon')
        } else {
            requirements['specialCharacter'].classList.remove('checked')
            setIconXmark('specialCharacter__checkIcon')
        }

        // === Pelo menos 8 caracteres ===
        if(value.length >=8) { 
            state.passwordStrength += 25
            requirements['minCharacter'].classList.add('checked')
            setIconCheck('minCharacter__checkIcon')
        } else {
            requirements['minCharacter'].classList.remove('checked')
            setIconXmark('minCharacter__checkIcon')
        }

        styleProgressBar()
    }

    //====== Chama o evento focus nos campos pelo target.name =====
    const onInputFocus = (event) => { 
        hideMessageError(fields[event.target.name])
    }
    // O que vai fazer quando for enviado o formulario
    const onFormSubmit = (event) => {
        event.preventDefault() //faz com que a pagina nao atualize quando dar submit
        if(validateRequiredFields()) return //faz com q as etapas pare aqui se der true e nao faça mais nada
        if(validateEmail()) return
        if(validatePasswordStrength()) return
        alert('Formulário pronto para envio!!')
    }

    const setListeners = () => {
        form.addEventListener('submit', onFormSubmit)
        for (const fieldKey in fields) {   
            const { element } = fields[fieldKey]
            element.addEventListener('focus', onInputFocus)
            if(fieldKey === 'password') element.addEventListener('keyup', onInputPasswordKeyUp)
            }
        }

        // ==== Pegando os dataName dos requerimentos ======
        const setRequirementsItemsElements = () => {
            const requirementItemsElements = document.querySelectorAll('[data-requirement-item]')
            for (const requirementItem of requirementItemsElements) {
                const requirementName = requirementItem.dataset['requirementItem']
                requirements[requirementName] = requirementItem
            }
            
        }
        // ==== Pegando os dataNames dos iconsCheck ====
        const setCheckIconRequirementsElements = () => {
            const checkIconRequirementsElements = document.querySelectorAll('[data-circle-checked]')
            for(const checkIconRequirement of checkIconRequirementsElements) {
                const checkIconName = checkIconRequirement.dataset['circleChecked']
                iconsCheck[checkIconName] = checkIconRequirement
            }
        }
    

    const setFildElements = () => {
        const inputElements = document.querySelectorAll('[data-input]')  //pega todos os imputs
        for (const input of inputElements) {
            const inputName = input.getAttribute('name')  // guardando o atributo name na variavel
            fields [inputName] = {     //criando um objeto para cada input percorrido
                element: input,
                errorElement: input.parentElement.querySelector('[data-error-message]'),
                isRequired: input.hasAttribute('required')
                }
                input.removeAttribute('required')
            }  
        }


    const init = () => {
        setCheckIconRequirementsElements()
        setRequirementsItemsElements()
        setFildElements()
        setListeners()
    }
    init()


})()