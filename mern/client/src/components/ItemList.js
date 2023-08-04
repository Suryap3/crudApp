import React from "react"

import axios from "axios"

function ItemList({ items, onEditItem, onDeleteItem }) {

  const handleDelete = (id) => {

    axios.delete(`http://localhost:5000/${id}`).then(() => {  onDeleteItem() })

  }

  return (

    <div>

      <h1 className="text-2xl font-bold mb-4">ITEM LIST</h1>

        <div className="grid grid-cols-2 gap-4">

            {items.map((item) => (

            <div key={item._id} className="border p-4 rounded shadow" >

                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>

                <p className="text-gray-700">{item.description}</p>

                <button onClick={() => onEditItem(item._id)} className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
                Edit
                </button>

                <button onClick={() => handleDelete(item._id)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" >
                Delete
                </button>

            </div>

            ))}

        </div>

    </div>

  )
  
}

export default ItemList