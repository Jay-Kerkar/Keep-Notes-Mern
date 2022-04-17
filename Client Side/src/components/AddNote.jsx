import React, { useState, useContext } from 'react'
import context from '../context/notes/NoteContext'

const AddNote = (props) => {
    const note_context = useContext(context)
    const { add_notes } = note_context
    const [note, setNote] = useState({ title: "", content: "", label: "" })
    const submit = (event) => {
        event.preventDefault()
        if (!note.title === "" && !note.content === "" && !note.label === "") {
            add_notes(note.title, note.content, note.label)
            setNote({ title: "", content: "", label: "" })
            props.displayAlert("The Note Has Been Added Successfully", "success")
        } else {
            props.displayAlert("Please Enter Valid Details", "danger")
        }
    }
    const setValue = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ margin: "auto", width: "50%", marginTop: "50px" }}>
            <h1 className='text-center' style={{ fontSize: "25px", fontWeight: "bold" }}>Add A Note</h1>
            <form className='my-3'>
                <div class="mb-6">
                    <label htmlFor="title" class="block mb-2  font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input type="text" id="title" name="title" class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Note's Title" required onChange={setValue} value={note.title} />
                </div>
                <div class="mb-6">
                    <label htmlFor="content" class="block mb-2  font-medium text-gray-900 dark:text-gray-300">Content</label>
                    <input type="textbox" id="content" name="content" class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Note's Content" required onChange={setValue} value={note.content} />
                </div>
                <div class="mb-6">
                    <label htmlFor="label" class="block mb-2  font-medium text-gray-900 dark:text-gray-300">Label</label>
                    <input type="text" id="label" name="label" class="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Note's Label" onChange={setValue} value={note.label} />
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submit}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote