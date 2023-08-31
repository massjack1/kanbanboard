import PropTypes from 'prop-types';
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import crossIcon from "../assets/icon-cross.svg";

function AddEditBoardModal({setBoardModalOpen , type ,}) {
    const [name, setName] = useState('')
    const [newColumns, setNewColumns] = useState(
        [
            {name : 'Todo' , task : [] , id : uuidv4()},
            {name : 'Doing' , task : [] , id : uuidv4()}
        ]
    )


    const onChange = (id , newValue) => {
        setNewColumns((pervState) => {
            const newState = [...pervState]
            const column = newState.find((col) => col.id === id)
            column.name = newValue
            return newState
        })
    }

    const onDelete = (id) => {
        setNewColumns( (perState) => perState.filter((el) => el.id !== id ))
    }

    return (
        <div onClick={(e) => {
            if(e.target !== e.currentTarget) {
                return
            }
            setBoardModalOpen(false)
        }} className="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
        >

            {/* Modal Section */}
           <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
               <h3 className="text-lg">
                   { type === 'edit' ? 'Edit' : 'Add New'} Card
               </h3>

               {/* Task Name */}

               <div className="mt-8 flex flex-col space-y-3">
                   <label className="text-sm dark:text-white text-gray-500">
                       Card Columns
                   </label>
                   <input type="text" className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#DD7878] outline-1 ring-0 outline-none " placeholder='e.g User Experience' value={name} onChange={(e) => {
                       setName(e.target.value);
                   }}
                   id='card-name-input'
                   />
               </div>

               {/* Card Columns */}

               <div className="mt-8 flex flex-col space-y-3">
                   <label className="text-sm dark:text-white text-gray-500">
                       Card Columns
                   </label>

                   {
                       newColumns.map((column , index) => (
                           <div key={index} className="flex items-center w-full">
                               <input type="text" className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#DD7878]"
                                      value={column.name}
                               onChange={(e) => {
                                   onChange(column.id , e.target.value)
                               }}
                               />
                               <img src={crossIcon} className="cursor-pointer m-4" alt="icon" onClick={() => {
                                   onDelete(column.id)
                               }}/>
                           </div>
                       ))
                   }
               </div>

           </div>

        </div>
    )
}

AddEditBoardModal.propTypes = {
    setBoardModalOpen: PropTypes.bool.isRequired,
    BoardModalOpen: PropTypes.bool.isRequired,
    type: PropTypes.bool.isRequired,
};

export default AddEditBoardModal;