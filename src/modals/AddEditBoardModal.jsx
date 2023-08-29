import PropTypes from 'prop-types';


function AddEditBoardModal({setBoardModalOpen}) {
    return (
        <div onClick={(e) => {
            if(e.target !== e.currentTarget) {
                return
            }
            setBoardModalOpen(false)
        }} className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]">

        </div>
    )
}

AddEditBoardModal.propTypes = {
    setBoardModalOpen: PropTypes.func.isRequired,
    BoardModalOpen: PropTypes.bool.isRequired,
};

export default AddEditBoardModal;