import { NavLink } from 'react-router-dom';
import { CreditCard, List, Terminal, Settings, Layers } from "lucide-react"

function SideLink ({ to, Icon, label, end }) {
    return (
        <NavLink
            to={to}
            end={end}
            title={label}
            className={({ isActive }) =>
                `group grid w-full place-items-center rounded-xl p-2 transition hover:bg-zinc-800 ${
                    isActive ? 'bg-zinc-800 text-white' : 'text-zinc-300'
                }`
            }
        >
            <Icon className="size-5" />
            <span className="sr-only">{label}</span>

        </NavLink>
    )
}

export default function SideBar() {
    return (
        <>
            <SideLink to = "/" end Icon={Layers} label="Overview" />
            <SideLink to = "/card" end Icon={CreditCard} label="Current Card" />
            <SideLink to = "/list" end Icon={List} label="Card List" />
            <SideLink to = "/settings" end Icon={Settings} label="Settings" />
            <div className="mt-auto pt-2 border-t border-zinc-800" />
            <SideLink to = "/terminal" end Icon={Terminal} label="Terminal" />
        </>
    )
}
