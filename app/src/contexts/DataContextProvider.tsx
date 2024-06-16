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
    startDate: undefined as Date | undefined,
    setStartDate: (() => {}) as Dispatch<SetStateAction<Date | undefined>>,
    endDate: undefined as Date | undefined,
    setEndDate: (() => {}) as Dispatch<SetStateAction<Date | undefined>>,
    analytics: undefined as Analytics | undefined,
});

interface DataProviderProps {
    children: ReactElement;
}

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [rawData, setRawData] = useState<Order[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

    useEffect(() => {
        if (rawData.length) {
            setStartDate(new Date(rawData[0].date));
            setEndDate(new Date(rawData[rawData.length - 1].date));
            setAnalytics(new Analytics(rawData));
        }
    }, [rawData]);

    return (
        <DataContext.Provider
        value={{
            rawData,
            setRawData,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            analytics,
        }}
        >
        {children}
        </DataContext.Provider>
    );
};

export default DataProvider;