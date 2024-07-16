import React, { useState } from "react";
import Input from "../utils/Input";
import axios from "axios";

function PostJob() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [fixedSalary, setFixedSalary] = useState(0);
    const [salaryType, setSalaryType] = useState("default");

    const postJob = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/job/create-a-job',
                { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setTitle("");
            setCategory("");
            setCity("");
            setCountry("");
            setDescription("");
            setFixedSalary("");
            setSalaryTo("");
            setSalaryFrom("");
            setLocation("");
            setSalaryType("default");
        } catch(err) {
            console.log("error posting this job : ", err);
        }
    }

    return (
        <>
        <h1 className="text-2xl font-bold text-center m-4 bg-sky-400 p-2 rounded-md">POST NEW JOB</h1>
            <div className="flex flex-1 flex-row p-6 justify-center items-center">
                <form className="bg-slate-300 rounded-md p-2" onSubmit={postJob}>
                    <div>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            label="Job Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md w-80"
                        >
                            <option value="">Select Category</option>
                            <option value="Graphics & Design">Graphics & Design</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Frontend Web Development">Frontend Web Development</option>
                            <option value="MERN Stack Development">MERN STACK Development</option>
                            <option value="Account & Finance">Account & Finance</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Video Animation">Video Animation</option>
                            <option value="MEAN Stack Development">MEAN STACK Development</option>
                            <option value="MEVN Stack Development">MEVN STACK Development</option>
                            <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                    </div>
                    <div>
                        <Input
                            type="text"
                            id="country"
                            name="country"
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <Input
                            type="text"
                            id="city"
                            name="city"
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <Input
                        type="text"
                        id="location"
                        name="location"
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-[40rem]"
                    />
                    <div>
                        <select
                            value={salaryType}
                            onChange={(e) => setSalaryType(e.target.value)}
                            className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                        >
                            <option value="default">Select Salary Type</option>
                            <option value="Fixed Salary">Fixed Salary</option>
                            <option value="Ranged Salary">Ranged Salary</option>
                        </select>
                        <div>
                            {salaryType === "default" ? (
                                <p className="text-sm">Please provide Salary Type *</p>
                            ) : salaryType === "Fixed Salary" ? (
                                <Input
                                    type="number"
                                    id="fixedsalary"
                                    name="fixedsalary"
                                    label="Enter Fixed Salary"
                                    value={fixedSalary}
                                    onChange={(e) => setFixedSalary(e.target.value)}
                                />
                            ) : (
                                <div>
                                    <Input
                                        type="number"
                                        id="salaryfrom"
                                        name="salaryfrom"
                                        label="Salary From"
                                        value={salaryFrom}
                                        onChange={(e) => setSalaryFrom(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        id="salaryto"
                                        name="salaryto"
                                        label="Salary To"
                                        value={salaryTo}
                                        onChange={(e) => setSalaryTo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <textarea
                        rows="10"
                        cols="100"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Description"
                        className="p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md block"
                    />
                    <button type="submit" className="w-40 h-10 bg-sky-500 rounded-md shadow-md font-bold mt-4">
                        Post Job
                    </button>
                </form>
            </div>
        </>
    );
}

export default PostJob;