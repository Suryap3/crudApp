import React, { useEffect, useState } from "react"

import axios from "axios"

import ItemList from "./components/ItemList"

import AddItem from "./components/AddItem"

import EditItem from "./components/EditItem"

function App() {

  const [items, setItems] = useState([])

  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = () => {

    axios.get("http://localhost:5000").then((response) => {

      setItems(response.data)

    })
  }

  const handleAddItem = () => { fetchItems() }

  const handleEditItem = (id) => {

    const itemToEdit = items.find((item) => item._id === id)

    setEditingItem(itemToEdit)

  }

  const handleUpdateItem = () => {

    fetchItems()

    setEditingItem(null)

  }

  const handleDeleteItem = () => {

    fetchItems()

  }

  return (

    <div className="container mx-auto p-4">

      <div className="flex justify-center items-center">

        <h1 className="text-2xl font-bold mb-4">ITEM MANAGEMENT APP</h1>

      </div>

      <div>

        <AddItem onAddItem={handleAddItem} />

        <ItemList items={items} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} />

        {editingItem && ( <EditItem item={editingItem} onUpdateItem={handleUpdateItem} /> )}

      </div>

    </div>

  )
  
}

export default App