import { useState } from "react";
export default function ProfilePage() {
    const [name, setName] = useState("");
    // Creating the profile page for users of SankofaPower after LogIn
    return(
        <div>
             <header className="flex justify-between items-center px-6 py-4 border-b"> 
                <div className="border px-4 py-2 font-bold">SANKOFAPOWER</div> 
                <button className="border px-4 py-2">Log In</button>
             </header>
            <h1>
            Create your profile
            </h1>
            <label className="block text-sm">NAME (INDIVIDUAL OR INSTITUTION)
                <input type="text" className="border w-full p-2" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <p>You typed: {name}</p>
        </div>
    );
}