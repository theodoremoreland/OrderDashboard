import {
    ReactElement,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
  } from "react";

import Analytics from "../classes/Analytics";

import { Order } from "../types/types";

export const DataContext = createContext({
    rawData: [] as Order[],
    setRawData: (() => {}) as Dispatch<SetStateAction<Order[]>>,
    analytics: undefined as Analytics | undefined,
});

interface DataProviderProps {
    children: ReactElement;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
    const [rawData, setRawData] = useState<Order[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

    useEffect(() => {
        if (rawData.length) {
            setAnalytics(new Analytics(rawData));
        }
    }, [rawData])

    return (
        <DataContext.Provider
        value={{
            rawData,
            setRawData,
            analytics,
        }}
        >
        {children}
        </DataContext.Provider>
    );
};

export default DataProvider;