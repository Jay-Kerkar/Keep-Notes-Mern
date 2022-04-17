import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import context from '../context/notes/NoteContext'
import NoteItem from './NoteItem'

const Notes = (props) => {
    const note_context = useContext(context)
    const { notes, fetch_notes, update_notes } = note_context
    const [note, setNote] = useState({ id: "", title: "", content: "", label: "" })
    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("authentication_token")) {
            fetch_notes()
        } else {
            navigate("/signin")
        }
    }, [])

    const update_note = (updated_note) => {
        ref.current.click()
        setNote(updated_note)
    }

    const ref = useRef(null)
    const ref_close = useRef(null)

    const submit = (event) => {
        event.preventDefault()
        update_notes(note._id, note.title, note.content, note.label)
        ref.current.click()
        props.displayAlert("The Note Has Been Updated Successfully", "success")
    }

    const setValue = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    return (
        <>
            <button ref={ref} type="button" className='hidden' data-toggle="modal" data-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-black font-bold" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                    <input type="text" name="title" className="form-control" id="title" value={note.title} onChange={setValue} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Content:</label>
                                    <textarea className="form-control" name="content" id="content" value={note.content} onChange={setValue} ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Label:</label>
                                    <input type="text" className="form-control" name="label" id="label" value={note.label} onChange={setValue} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn text-white bg-gray-700 hover:bg-gray-800" data-dismiss="modal" ref={ref_close}>Close</button>
                            <button type="button" className="btn text-white bg-blue-700 hover:bg-blue-800" onClick={submit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: "auto", width: "80%", marginTop: "30px" }} className="row">
                <h1 className='text-center' style={{ fontSize: "25px", fontWeight: "bold", margin: "10px 0" }}>Your Notes</h1>
                {notes.length === 0 && "No Notes Found"}
                {notes.map((note) => {
                    return <NoteItem key={note._id} update_note={update_note} notes={note} displayAlert={props.displayAlert} />
                })}
            </div>
        </>
    )
}

export default Notes