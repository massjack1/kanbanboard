import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import boardIcon from '../assets/icon-board.svg';
import lightIcon from '../assets/icon-light-theme.svg';
import darkIcon from '../assets/icon-dark-theme.svg';
import {Switch} from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode.js";
import {useState} from "react";


function HeaderDropdown({setOpenDropdown}) {
    const [colorTheme, setTheme] = useDarkMode()
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light'
    )

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }

    const boards = useSelector((state) => state.boards)

    return(
        <div className=" py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]" onClick={
            (e) => {
                if (e.target !== e.currentTarget){
                    return
                }
                setOpenDropdown(false)
            }
        }>
            {/* Dropdown Modal */}

            <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">

                <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                    All Boards ({boards?.length})
                </h3>

                <div>
                    {boards.map((board, index) => (
                        <div
                        className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 ${board.isActive && 'bg-[#DD7878] rounded-r-full text-white mr-8'}`}
                        key={index}
                        >
                            <img src={boardIcon} className='h-4' alt='boards' />
                            <p
                            className='text-lg font-bold'>{board.name}</p>
                        </div>
                    ))}
                    <div
                    className='flex items-baseline space-x-2 text-[#DD7878] px-5 py-4'>
                        <img src={boardIcon} className='h-4' alt="boards"/>
                        <p className='text-lg font-bold'>
                            Create New Card
                        </p>
                    </div>
                    <div className='mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212x] flex justify-center items-center rounded-lg'>
                        <img src={lightIcon} alt=""/>

                        <Switch
                            checked={darkSide}
                            onChange={toggleDarkMode}
                        className={`${darkSide ? 'bg-[#635fc71]' : 'bg-gray-200'} relative inline-flex h6 w-11 items-center rounded-full`}>

                            <span
                            className={`${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />


                        </Switch>

                        <img src={darkIcon} alt=""/>
                    </div>
                </div>

            </div>
        </div>
    )
}

// Define prop types validation
HeaderDropdown.propTypes = {
    setOpenDropdown: PropTypes.func.isRequired,
};

export default HeaderDropdown;