import Upolad from "../components/upolad";

export default function Devs() {
    return (<div className="text-white font-fira w-screen min-h-screen flex justify-center bg-slate-700">
        <form className="flex flex-col gap-4 max-w-[900px] p-4" action="">
            <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">First name*:</label>
                    <input id="name" type="text" placeholder="First name" className="focus:outline-none bg-transparent border-slate-400 border-2 rounded-lg py-2 px-4" required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lastName">Last name*:</label>
                    <input id="lastName" type="text" placeholder="Last name" className="focus:outline-none bg-transparent border-slate-400 border-2 rounded-lg py-2 px-4" required/>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email*:</label>
                <input id="email" type="text" placeholder="Email" className="focus:outline-none bg-transparent border-slate-400 border-2 rounded-lg py-2 px-4" required/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="projects">Link to projects you are most proud of:</label>
                <textarea id="projects" placeholder="Project links" className="min-h-[200px] focus:outline-none bg-transparent border-slate-400 border-2 rounded-lg py-2 px-4" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="cv">Upload your CV:</label>
                <Upolad />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="message">Message for reader:</label>
                <textarea id="message" placeholder="Message" className="min-h-[200px] focus:outline-none bg-transparent border-slate-400 border-2 rounded-lg py-2 px-4" />
            </div>
        </form>
    </div>)
}