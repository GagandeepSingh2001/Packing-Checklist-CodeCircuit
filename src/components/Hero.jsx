import React, { useEffect, useState } from 'react';
import note from '../assets/note.png';
import { toast } from 'sonner';
import bottom from '../assets/bottom.png';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { Zoom, Fade } from "react-awesome-reveal";


const Hero = () => {

    
    // Sample data for packing items
    const [items, setItems] = useState([
        { id: "1", name: "Passport", category: "Essentials", packed: false },
        { id: "2", name: "Phone charger", category: "Essentials", packed: false },
        { id: "3", name: "Wallet", category: "Essentials", packed: true },
        { id: "4", name: "T-shirts", category: "Clothing", packed: false },
        { id: "5", name: "Pants", category: "Clothing", packed: false },
        { id: "6", name: "Toothbrush", category: "Toiletries", packed: false },
        { id: "7", name: "Shampoo", category: "Toiletries", packed: false },
        { id: "8", name: "Snacks", category: "Food", packed: false },
        { id: "9", name: "Water bottle", category: "Food", packed: true },
        { id: "10", name: "Laptop", category: "Electronics", packed: false },
        { id: "11", name: "Charger", category: "Electronics", packed: false },
        { id: "12", name: "External Drive", category: "Electronics", packed: false },
        { id: "13", name: "Watch", category: "Accessories", packed: false },
        { id: "14", name: "Sunglasses", category: "Accessories", packed: false },
        { id: "15", name: "Umbrella", category: "Misc.", packed: true },
    ])
    // State to manage selected category
    const [selectedCategory, setSelectedCategory] = useState("Essentials");
    const categoryList = ["Essentials", "Clothing", "Toiletries", "Food", "Electronics", "Accessories", "Misc."];

    const allChecked = (category) => {
        const categoryItems = items.filter(item => item.category === category);
        return categoryItems.length > 0 && categoryItems.every(item => item.packed);
    };

    // Effect to show a toast when all items in a category are packed
    useEffect(() => {
        const categoryItems = items.filter(item => item.category === selectedCategory);
        if (
            categoryItems.length > 0 &&
            categoryItems.every(item => item.packed)
        ) {
            toast.success(`All items in ${selectedCategory} category are packed!`);
        }
    }, [items, selectedCategory]);


    const [addItem, setAddItem] = useState(false);

    // Function to handle adding a new item
    const handleInsert = () => {
        setAddItem(!addItem);
        const itemName = document.querySelector('input[type="text"]').value;
        if (itemName.trim() == "") {
            toast.error("Item name cannot be empty.");
        }
    }

    // Function to handle theme change
    const changeTheme = () =>{
        const body = document.documentElement;
        body.classList.add('light');
        body.classList.toggle('dark');
    }


  return (
    <div className='overflow-hidden relative h-screen'>
    <div className='grid place-items-center'>
        <Fade direction='left' className='absolute top-5 left-1 sm:left-10 duration-100 rounded-full p-1 w-[10vw] sm:w-[4vw] active:scale-80'>
        <button title='Change Theme' onClick={changeTheme}>
            <img src='https://cdn-icons-png.freepik.com/256/12254/12254205.png?semt=ais_hybrid'></img>
        </button>
        </Fade>
        <Fade direction='up' className='absolute bottom-0 w-screen h-[70vh] overflow-hidden'>
        <img src={bottom} alt="bottom" className='-z-1 object-cover w-full h-full' />
        </Fade>
        
        <Zoom>
            <h1 className='font-bold text-black/30 text-5xl m-5 text-center'>My Packing Checklist</h1>
        </Zoom>

        {/* Caregory Bar */}
        <div className='w-[80dvw] p-2 flex flex-wrap justify-around rounded-2xl sm:bg-white/30 sm:shadow-lg my-5'>
            {categoryList.map(category => (
                <Fade duration={2000} key={category}>
                <button key={category} onClick={() => setSelectedCategory(category)} className={selectedCategory == category ? "font-bold rounded-xl hover:bg-red-400 duration-300 p-1 bg-red-400 w-30" : "font-bold rounded-xl hover:bg-red-400 duration-300 p-1 w-30"}>{category}
                {allChecked(category) && <span className=''> ✔</span>}
                </button>
                </Fade>
            ))}
        </div>

        {/* Packing List Note */}
        <div className='w-[70vw] h-[35vh] sm:w-[20vw] sm:h-[40vh] p-4 m-4 rotate-6 flex items-center justify-center flex-col' style={{ background: `url(${note})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className='font-bold text-2xl absolute top-7'>{selectedCategory}</h1>
            <button onClick={handleInsert} title='Add New Item' className="font-bold text-2xl absolute top-8 right-10 hover:scale-130 duration-200">
                <IoAddCircleOutline />
            </button>
            <ul className='relative'>
            {items.filter(item => item.category == selectedCategory).map((item, index) =>
                <Fade key={item.id} duration={500} direction='left' delay={index * 200}>
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
                        <strong className={item.packed ? 'line-through text-gray-500' : ''}>{item.name}</strong>
                    </label>

                    <button className="text-red-500 hover:text-red-700 absolute -right-10"
                     onClick={() => {
                        setItems(items.filter(i => i.id !== item.id));
                        toast.error(`${item.name} removed from ${selectedCategory}`);
                        }} > <RiDeleteBin5Fill />
                    </button>
                </li>
                </Fade>
            
            )}
            </ul>
        </div>

        {/* Modal to add new items */}
        {addItem && (
            
            <div className="absolute top-0 left-0 w-screen h-screen bg-black/80 place-items-center justify-center flex flex-col">
                <input
                type="text"
                placeholder="Type here to add new item to the list"
                className="border border-gray-300 rounded-full p-2 bg-black/20 w-[30vw] text-white/80 text-center focus:outline-none focus:ring-2 focus:ring-red-400"
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                        const categoryItems = items.filter(item => item.category === selectedCategory);
                            if (categoryItems.length >= 5) {
                            toast.error(`Maximum limit of 5 items reached in '${selectedCategory}'`);
                            return;
                        }
                        const newItem = {
                            id: Date.now().toString(),
                            name: e.target.value,
                            category: selectedCategory,
                            packed: false
                        };
                        setItems(prev => [...prev, newItem]);
                        toast.success(`Added "${newItem.name}" to ${selectedCategory}`);
                        e.target.value = "";
                    }else if(e.key === "Escape"){
                        setAddItem(false);
                    }
                }}>
            </input>
            <h2 className='text-white m-3 text-center uppercase overflow-ellipsis'>press "enter" to insert the item to your checklist</h2>

            <button className="absolute top-10 right-10 text-3xl text-red-300 hover:text-red-500 duration-300" onClick={() => {setAddItem(false);}}>
                <ImCancelCircle />
            </button>

            </div>
        )}
    </div>
    </div>
  )
}

export default Hero