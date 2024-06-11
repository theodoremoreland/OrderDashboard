import {
    ReactElement,
    createContext,
  } from "react";

export const Data = createContext(undefined);

interface DataProviderProps {
    children: ReactElement;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {

    return (
        <Data.Provider
        value={undefined}
        >
        {children}
        </Data.Provider>
    );
};

export default DataProvider;