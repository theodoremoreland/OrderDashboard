// React
import {
    ReactElement,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";

// Custom
import Analytics from "../classes/Analytics";
import { Order } from "../types/types";

interface DataProviderProps {
    children: ReactElement;
}

export const DataContext = createContext({
    rawData: [] as Order[],
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    setRawData: (() => {}) as Dispatch<SetStateAction<Order[]>>,
    setStartDate: (() => {}) as Dispatch<SetStateAction<Date | undefined>>,
    setEndDate: (() => {}) as Dispatch<SetStateAction<Date | undefined>>,
    analytics: undefined as Analytics | undefined,
});

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [rawData, setRawData] = useState<Order[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

    useEffect(() => {
        if (rawData.length > 1) {
            rawData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            
            setStartDate(new Date(rawData[0].date));
            setEndDate(new Date(new Date()));
            setAnalytics(new Analytics(rawData));
        }
    }, [rawData]);

    return (
        <DataContext.Provider
            value={{
                rawData,
                startDate,
                endDate,
                setRawData,
                setStartDate,
                setEndDate,
                analytics,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
