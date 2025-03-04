"use client";
import React, {JSX, useState} from "react";

export interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    label?: string | null;
    value?: DropdownOption | null;
    required?: boolean;

    onChange?(value: DropdownOption | null): void
}

export default function Dropdown({options, label = null, value = null, onChange}: DropdownProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (opt: DropdownOption) => {
        if (onChange)
            onChange(opt)
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <label
                id="listbox-label"
                className="block text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <div className="relative mt-2">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="listbox-label"
                >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{value?.label}</span>
          </span>
                    <svg
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <ul
                        className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                    >
                        {options.map((opt, index) => (
                            <li
                                key={index}
                                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                                onClick={() => handleSelect(opt)}
                                role="option"
                            >
                                <div className="flex items-center">
                                    <span className="ml-3 block truncate">{opt.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
