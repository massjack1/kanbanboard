import PropTypes from "prop-types";
import {useState} from "react";
import { v4 as uuidv4} from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import {useDispatch, useSelector} from "react-redux";
import boardsSlice from "../redux/boardsSlice.js";


function AddEditTaskModal({ type , device, setOpenAddEditTask , taskIndex , prevColIndex = 0 , }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const board = useSelector((state) => state.boards).find((board) => board.isActive);
    const [isValid, setIsValid] = useState(true);

    const columns = board.columns
    const col = columns.find((col , index) => index === prevColIndex)
    const [status, setStatus] = useState(columns[prevColIndex].name);
    const [newColIndex, setNewColIndex] = useState(prevColIndex);
    const [subtasks, setSubtasks] = useState(
        [
            { title: '' , isCompleted : false , id : uuidv4() },
            { title: '' , isCompleted : false , id : uuidv4() },

        ]
    )

    const onChange = (id , newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState]
            const subtask = newState.find((subtask) => subtask.id === id)
            subtask.title = newValue
            return newState
        })
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    const onDelete = (id) => {
        setSubtasks( (perState) => perState.filter((el) => el.id !== id ))
    }

    const validate = () => {
        setIsValid(false)
        if(!title.trim()) {
            return false
        }

        for ( let i = 0; i < subtasks.length; i++) {
            if(!subtasks[i].title.trim()){
                return false
            }
        }

        setIsValid(true)
        return true
    }

    const onSubmit = (type) => {
        if (type === "add") {
            dispatch(
                boardsSlice.actions.addTask({
                    title,
                    description,
                    subtasks,
                    status,
                    newColIndex,
                })
            );
        } else {
            dispatch(
                boardsSlice.actions.editTask({
                    title,
                    description,
                    subtasks,
                    status,
                    taskIndex,
                    prevColIndex,
                    newColIndex,
                })
            );
        }
    };


    return(
        <div onClick={(e) => {
            if(e.target !== e.currentTarget) {
                return
            }
            setOpenAddEditTask(false)
        }}
             className={
                 device === "mobile"
                     ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
                     : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
             }
        >
            {/*Modal Section*/}

            <div
                className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
            >
                <h3 className="text-lg"
                >
                    {type === 'edit' ? 'Edit' : 'Add New'} Card
                </h3>

                {/* Task Name */}

                <div className=" mt-8 flex flex-col space-y-1">
                    <label className="text-sm dark:text-white text-gray-500">
                        Task Name
                    </label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#DD7878] ring-0"
                        value={title}
                        type="text"
                        placeholder="e.g Go for a walk"
                    />
                </div>

                {/* Description */}

                <div className=" mt-8 flex flex-col space-y-1">
                    <label className="text-sm dark:text-white text-gray-500">
                        Description
                    </label>
                    <textarea
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px]  rounded-md text-sm border border-gray-600 focus:outline-[#DD7878] ring-0"
                        value={description}
                        placeholder="e.g Take a break & think about how to solve the error"
                    />
                </div>

                {/* Subtask Section */}

                <div className=" mt-8 flex flex-col space-y-1">
                    <label className="text-sm dark:text-white text-gray-500">
                        Subtasks
                    </label>

                    {
                        subtasks.map((subtask , index) => (
                            <div
                                key={index}
                                className="flex items-center w-full"
                            >
                                <input  onChange={(e) => {
                                    onChange(subtask.id , e.target.value)
                                }}
                                       type="text"
                                       value={subtask.title}
                                       className="bg-transparent outline-none border focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#DD7878] "
                                       placeholder="e.g Bring a notebook & a pen"
                                />
                                <img
                                    onClick={() => {
                                        onDelete(subtask.id)
                                    }}
                                    src={crossIcon}
                                    className="m-4 cursor-pointer"
                                    alt="Cross icon"/>
                            </div>
                        ))
                    }

                    <button
                        className=" w-full items-center dark:text-[#DD7878] dark:bg-white  text-white bg-[#DD7878] py-2 rounded-full hover:opacity-75"
                        onClick={() => {
                            setSubtasks((state) => [
                                ...state,
                                { title: "", isCompleted: false, id: uuidv4() },
                            ]);
                        }}
                    >
                        + Add New Subtask
                    </button>
                </div>

                {/* Current Status Section */}

                <div
                className="mt-8 flex flex-col space-y-3"
                >
                    <label className="text-sm dark:text-white text-gray-500">

                    </label>
                    <select
                        onChange={(e) => onChangeStatus(e)}
                        value={status}
                        className=" select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#DD7878]">
                        {columns.map((column , index) => (
                            <option value={column.name} key={index}>
                                {column.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            const isValid = validate()
                            if(isValid) {
                                onSubmit(type)
                                setOpenAddEditTask(false)
                            }
                        }}
                        className="w-full items-center text-white bg-[#DD7878] py-2 rounded-full hover:opacity-75"
                    >
                        {type === 'edit' ? 'Save Edit' : 'Create Task' }
                    </button>
                </div>

            </div>
        </div>
    )
}

AddEditTaskModal.propTypes = {
    taskIndex: PropTypes.string.isRequired,
    prevColIndex: PropTypes.func.isRequired,
    setOpenAddEditTask: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    device: PropTypes.bool.isRequired,
}

export default AddEditTaskModal;