import React, {JSX} from "react";

interface TextFieldProps {
    label?: string | null;
    type?: string;
    value?: string | number | readonly string[] | undefined;
    required?: boolean;

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function TextField({label, type = "text", onChange, value, required = false}: TextFieldProps): JSX.Element {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange)
            onChange(e)
    }

    return <div className="w-full">
        <label htmlFor="textfield" className="block text-sm/6 font-medium text-gray-900">
            {label}
        </label>
        <div className="mt-2">
            <input type={type} name={label ? label : undefined} required={required} id="textfield" autoComplete="given-name" value={value}
                   onChange={handleChange}
                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
    </div>
}