import { Antenna, CirclePlus, House, MessagesSquare, Settings } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import LogoutBtn from "./ui/LogoutBtn"
import { useModal } from "../context/ModalProvider"
import CreateChannelModal from "./modals/CreateChannelModal"

export default function ActivityBar() {

    const location = useLocation()
    const { openModal } = useModal()

    return (
        <div className='bg-bg-dark w-full max-w-16 min-h-dvh h-full flex flex-col items-center justify-between py-6'>
            <Antenna />

            <section className="flex flex-col gap-6">
                <NavLink to={'/channels'}>
                    <House
                        className={`${location.pathname.startsWith("/channels") ? "fill-amber-50" : ""} cursor-pointer`}
                    />
                </NavLink>

                <button>
                    <CirclePlus
                        className="cursor-pointer"
                        onClick={() => openModal(CreateChannelModal)}
                    />
                </button>
            </section>

            <section className="flex flex-col gap-6">
                <Settings className="cursor-pointer" />
                <LogoutBtn />
            </section>
        </div>
    )
}
