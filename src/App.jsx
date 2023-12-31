import Header from "./components/Header.jsx";
import Center from "./components/Center.jsx";
import {useState} from "react";


function App() {

    const [boardModalOpen, setBoardModalOpen] = useState(false)

    return (
        <div>
            {/* Header Section */}
            <Header boardModalOpen = { boardModalOpen } setBoardModalOpen={setBoardModalOpen} BoardModalOpen type='add'/>

            {/* Header Section */}
            <Center />

        </div>
    )
}

export default App;