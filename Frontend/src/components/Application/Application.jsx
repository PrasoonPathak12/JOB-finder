import React from "react";
import { useState } from "react";
import Input from "../utils/Input";
import axios from "axios";
import { useParams } from "react-router-dom";

function Application() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState(null);
    const [message, setMessage] = useState("");

    const { id } = useParams();

    const applyForJob = async (e) => {
        e.preventDefault();

        // create form data
        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("phone", phone);
        data.append("coverletter", coverLetter);
        data.append("address", address);
        data.append("resume", resume);
        data.append("jobId", id);

        setMessage("Please wait while we process your application...");

        axios.post(
            'http://127.0.0.1:3000/api/v1/application/apply',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }
        ).then(() => {
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setCoverLetter("");
            setResume("");
            setMessage("Application submitted successfully!");

            setTimeout(()=>{
                setMessage("");
            }, 1000);
        }).catch((err) => {
            console.log("error in applying for job : ", err);
        });
    }

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center m-4 bg-sky-400 p-2 rounded-md">Application Form</h1>
            <h3 className="text-lg text-center mt-2 font-semibold">{message}</h3>
            <section className="flex items-center justify-center m-4 p-2 rounded-md">
                <div className="bg-slate-300 shadow-md rounded-md p-4">
                    <form className="grid grid-cols-2 gap-3" onSubmit={applyForJob}>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="number"
                            name="phone"
                            id="phone"
                            label="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <textarea
                            placeholder="Cover Letter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md h-44"
                        />
                        <div>
                            <label
                                style={{ textAlign: "start", display: "block", fontSize: "15px", fontWeight: "medium" }}
                            >
                                Select Resume
                            </label>
                            <input
                                type="file"
                                accept=".pdf, .jpg, .png"
                                onChange={handleFileChange}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <button type="submit" className="w-40 h-10 bg-sky-500 rounded-md shadow-md font-bold">
                            Send Application
                        </button>
                    </form>
                </div>
            </section>
        </>

    )
}

export default Application;