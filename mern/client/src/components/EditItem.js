import React, { useState } from "react"

import axios from "axios"

function EditItem({ item, onUpdateItem }) {

  const [name, setName] = useState(item.name)

  const [description, setDescription] = useState(item.description)

  const handleSubmit = (e) => {

    e.preventDefault()

    const updatedItem = { name, description }

    axios.put(`http://localhost:5000/${item._id}`, updatedItem).then(() => { onUpdateItem() })}

  return (

    <div>
        
      <h2 className="text-lg font-semibold mb-2">EDIT ITEM</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
            />

            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
            />
            
            <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600" >
            Update
            </button>

        </form>

    </div>

  )

}

export default EditItem