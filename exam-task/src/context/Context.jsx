import { createContext, useState } from "react";

const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {

    const [isToggleMode, setIsToggleMode] = useState(false);

    const toggleMode = () => {
        setIsToggleMode(!isToggleMode);
    };

    return (
        <ToggleContext.Provider value={{ isToggleMode, toggleMode }}>
            {children}
        </ToggleContext.Provider>
    );
};

export { ToggleContext, ToggleProvider };