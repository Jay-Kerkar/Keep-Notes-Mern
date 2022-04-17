import React, { useContext } from 'react'
import context from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const { notes, update_note } = props
    const note_context = useContext(context)
    const { delete_notes } = note_context
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg col-lg-3 my-4 mx-5">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{notes.title}</div>
                <p class="text-gray-700 text-base">{notes.content}</p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{notes.label}</span>
                <i class="fa-solid fa-pen-to-square" style={{ paddingLeft: '45px' }} onClick={() => { update_note(notes); props.displayAlert("The Note Has Been Updated Successfully", "success") }}></i>
                <i class="far fa-trash-alt" style={{ paddingLeft: '15px' }} onClick={() => { delete_notes(notes._id); props.displayAlert("The Note Has Been Deleted Successfully", "success") }}></i>
            </div>
        </div>
    )
}

export default NoteItem