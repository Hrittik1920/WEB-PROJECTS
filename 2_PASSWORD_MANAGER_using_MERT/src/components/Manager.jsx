import { useRef, useState, useEffect } from 'react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const refTB = useRef();
    const refPass = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const togglePassword = () => {
        if (refTB.current.src.includes("eye.png")) {
            refTB.current.src = "eyecross.png"
            refPass.current.type = "password"
        }
        else {
            refTB.current.src = "eye.png"
            refPass.current.type = "text"
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setForm({ site: "", username: "", password: "" })
        }
        else {
            toast('Error! MinLength should be 3.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async (id) => {
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        let c = confirm("Do you really want to delete this password!")
        if (c) {
            setpasswordArray(passwordArray.filter((item) => item.id !== id))
            await fetch("http://localhost:3000/", { method: 'DELETE', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
        }
    }

    const editPassword = async (id) => {
        setForm(passwordArray.filter((item) => item.id === id)[0])
        setpasswordArray(passwordArray.filter((item) => item.id !== id))
        await fetch("http://localhost:3000/", { method: 'DELETE', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 mb-12 md:p-0 md:py-10 md:mx-auto md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-500 text-lg text-center'>Your own Password Manager</p>
                <div className='text-black flex flex-col p-5 gap-3 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' />
                    <div className='flex md:flex-row flex-col gap-3 w-full'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 md:w-2/3 px-4 py-1' type="text" name='username' />
                        <div className="relative md:w-1/3">
                            <input value={form.password} onChange={handleChange} ref={refPass} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' />
                            <span className='absolute right-2 top-[0.30rem]' onClick={togglePassword}>
                                <img ref={refTB} width={23} src="eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center text-sm items-center w-fit gap-2 font-medium my-2 bg-green-400 px-8 py-1.5 rounded-full border border-green-900 hover:bg-green-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div>
                    <h2 className='font-bold text-2xl mb-3 mt-1'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No password to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => {
                                return <tr key={item.id}>
                                    <td className='w-44 py-2 border border-white '>
                                        <div className="flex justify-center items-center flex-wrap">
                                            <a href={item.site} className='w-24 sm:w-fit' target='_blank'>
                                                <span className='break-words'>
                                                    {item.site}
                                                </span>
                                            </a>
                                            <div className="cursor-pointer inline ml-1" onClick={() => copyText(item.site)}>
                                                <lord-icon width={2}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='w-32 py-2 border border-white'>
                                        <div className="flex justify-center items-center flex-wrap">
                                            <span className='w-16 sm:w-fit'>
                                                <span className='break-words'>{item.username}</span>
                                            </span>
                                            <div className="cursor-pointer inline ml-1" onClick={() => copyText(item.username)}>
                                                <lord-icon width={2}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='w-32 py-2 border border-white h-auto'>
                                        <div className="flex justify-center items-center flex-wrap overflow-hidden">
                                            <span className='w-16 sm:w-fit'>
                                                <span className='break-words'>{"*".repeat(item.password.length)}</span>
                                            </span>
                                            <div className="cursor-pointer inline ml-1" onClick={() => copyText(item.password)}>
                                                <lord-icon width={2}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='w-20 py-2 border border-white'>
                                        <div className="flex justify-center items-center flex-wrap">
                                            <div className="cursor-pointer inline ml-1" onClick={() => editPassword(item.id)}>
                                                <lord-icon width={2}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                                                </lord-icon>
                                            </div>
                                            <div className="cursor-pointer inline mx-1" onClick={() => deletePassword(item.id)}>
                                                <lord-icon width={2}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
