import {JSX, MouseEventHandler} from "react";

interface ButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({label, type = "button", onClick}: ButtonProps): JSX.Element {
    return <button type={type} onClick={onClick}
                   className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        {label}
    </button>
}