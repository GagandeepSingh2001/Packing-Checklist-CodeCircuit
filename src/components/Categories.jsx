import React, { useState } from 'react';
import note from '../assets/note.png';


const Categories = () => {

    const [items, setItems] = useState([
        { id: "1", name: "Passport", category: "essentials", packed: false },
        { id: "2", name: "Phone charger", category: "essentials", packed: false },
        { id: "3", name: "Wallet", category: "essentials", packed: true },
        { id: "4", name: "T-shirts", category: "clothing", packed: false },
        { id: "5", name: "Pants", category: "clothing", packed: false },
        { id: "6", name: "Toothbrush", category: "toiletries", packed: false },
        { id: "7", name: "Shampoo", category: "toiletries", packed: false },
        { id: "8", name: "Snacks", category: "food", packed: false },
        { id: "9", name: "Water bottle", category: "food", packed: true },
        { id: "10", name: "Umbrella", category: "misc", packed: false },
    ])


  return (
    <div className='grid place-items-center'>
        <div className='w-[20vw] h-[40vh] p-4 m-4 rotate-6 flex items-center justify-center flex-col' style={{ background: `url(${note})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className='font-bold text-2xl relative bottom-12'>{}</h1>
            <ul>
            {items.map(item =>
            item.category === "essentials" && (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        checked={item.packed}
                        onChange={() => {
                            setItems(items.map(i => i.id === item.id ? { ...i, packed: !i.packed } : i))
                        }}
                        id={item.id}
                    />
                    <label htmlFor={item.id} className='ml-2'>
                        <strong className={item.packed ? 'line-through' : ''}>{item.name}</strong>
                    </label>
                </li>
            )
            )}
            </ul>
        </div>
    </div>
  )
}

export default Categories