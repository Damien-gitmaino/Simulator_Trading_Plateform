import React, {JSX} from "react";

export default function AppBar({}): JSX.Element {
    return <header className="fixed top-0 w-full bg-white z-50 shadow">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img className="h-8 w-auto"
                         src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                         alt=""/>
                </a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-around">
                <a href="/playground" className="text-sm/6 font-semibold text-gray-900">Playground</a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">Features</a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">Marketplace</a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">Company</a>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <a href="#" className="text-sm/6 font-semibold text-gray-900">Log in <span
                    aria-hidden="true">&rarr;</span></a>
            </div>
        </nav>
    </header>
}