import React from "react";

function Input({ id, name, type, label, value, onChange, className}) {
    return (
        <input 
            type={type} 
            id={id}
            name={name}
            placeholder={label}
            value={value}
            className={`${className} w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md`}
            onChange={onChange}
        />
    );
}

export default Input;