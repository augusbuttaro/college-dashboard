import { FormRow } from "./index";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function Notes({ notes, handleNoteChange, handleAddNote, handleDeleteNote }) {
    return (
        <div className="border-b-2 border-blue flex flex-col justify-center">
            {notes.map((note, index) => (
                <div key={note._id} className="flex items-center xl:mx-2 gap-4 xl:gap-6 mb-4">
                    <FormRow
                        type="text"
                        name={`note-${index}-text`}
                        placeholder="Enter note"
                        className='bg-picton-blue placeholder:text-blue xl:m-2'
                        value={note.text}
                        onChange={(e) => handleNoteChange(index, 'text', e.target.value)}
                        defaultValue={note.text}
                    />
                    <button
                        type="button"
                        onClick={() => handleDeleteNote(index)}
                        className="bg-red p-2.5 text-xl text-cream w-fit"
                    >
                        <IoMdClose />
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddNote} className="my-4 w-fit mx-auto px-4 py-2 bg-blue border-2 border-blue 
                text-cream rounded-lg hover:border-peach duration-200">
                {notes.length === 0? 'Add Note':'Add Another Note'}
            </button>
        </div>
    );
}

export default Notes;