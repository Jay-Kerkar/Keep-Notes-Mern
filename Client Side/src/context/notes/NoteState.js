import NoteContext from './NoteContext'
import { useState } from 'react'

const NoteState = (props) => {
    const host = "http://localhost:5000/"

    const [notes, setNotes] = useState([])
    // Function To Fetch The Note
    async function fetch_notes() {
        const url = `${host}api/notes/fetchnotes/`
        const api = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authentication_token': localStorage.getItem('authentication_token')
            }
        })
        const fetched_notes = await api.json()
        setNotes(fetched_notes)
    }

    // Function To Add The Note
    async function add_notes(title, content, label) {
        const url = `${host}api/notes/addnotes/`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authentication_token': localStorage.getItem('authentication_token')
            },
            body: JSON.stringify({ title, content, label })
        })
        const note = await response.json()
        setNotes(notes.concat(note))

    }

    // Function To Update The Note
    async function update_notes(id, title, content, label) {
        const url = `${host}api/notes/updatenotes/${id}`
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authentication_token': localStorage.getItem('authentication_token')
            },
            body: JSON.stringify({ title, content, label })
        })
        let updated_notes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < updated_notes.length; index++) {
            const element = updated_notes[index];
            if (element._id === id) {
                updated_notes[index].title = title;
                updated_notes[index].content = content;
                updated_notes[index].label = label;
                break;
            }
        }
        setNotes(updated_notes)
    }

    // Function To Delete The Note
    async function delete_notes(id) {
        const url = `${host}api/notes/deletenotes/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authentication_token': localStorage.getItem('authentication_token')
            }
        })
        const remaining_notes = notes.filter((note) => { return note._id !== id })
        setNotes(remaining_notes)
    }

    return (
        <NoteContext.Provider value={{ notes, fetch_notes, add_notes, update_notes, delete_notes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState