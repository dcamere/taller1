
import Button from './Button';
import './FormStyles.scss';
import {useEffect, useState} from 'react';

const Form = () => {
    // con "data" se accede al valor
    // con "setData" se actualiza el valor
    const [data, setData] = useState({
        name: "",
        password1: "",
        password2: ""
    });
    const regEx = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

    const clearForm = (form) => {
        const inputName = form.querySelector("#name");
        const inputPassword1 = form.querySelector("#password1");
        const inputPassword2 = form.querySelector("#password2");

        inputName.value = "";
        inputPassword1.value = "";
        inputPassword2.value = "";
    }

    const updateData = (e) => {
        e.preventDefault();
        const form = e.target.closest(".form");
        const inputName = form.querySelector("#name").value;
        const inputPassword1 = form.querySelector("#password1").value;
        const inputPassword2 = form.querySelector("#password2").value;
        const isValidPassword = regEx.test(inputPassword1);

        if (inputName === "") return;
        if (!isValidPassword) {
            console.warn("Password debe tener 8 caracteres, números, letras, simbolos")
            return;
        }
        if (inputPassword1 === inputPassword2) {
            setData({name:inputName, password1: inputPassword1, password2: inputPassword2});
            clearForm(form);
        } else {
            form.querySelector("#password2").focus();
            console.warn("Passwords no son iguales");
        }

        console.log(data);
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return <>
        <form className="form">
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
            </div>
            <div>
                <label htmlFor="password1">Password</label>
                <input type="text" id="password1" />
            </div>
            <div>
                <label htmlFor="password2">Repeat Password</label>
                <input type="text" id="password2" />
            </div>
            <div>
                <Button text="Click me!" functionToExecute={updateData} />
            </div>
        </form>
        <div className="result">
            {
                data.name ?
                <div>Name: {data.name}</div>
                : <div>Falta nombre</div>
            }
            {
                data.password1 ?
                <div>Password: {data.password1 || data.password2}</div> :
                <div>Falta Password</div>
            }
        </div>
    </>
};

export default Form;