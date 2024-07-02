// React
import {
    ReactElement,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";

interface Props {
    children: ReactElement;
}

const barChartsCountDefault = Number(localStorage?.getItem('top-stores-display-count')) || 5;
const listsCountDefault = Number(localStorage?.getItem('top-streaks-display-count')) || 5;
const orderHistoryCountDefault = 5;

export const DisplaySettingsContext = createContext({
    barChartsCount: barChartsCountDefault,
    listsCount: listsCountDefault,
    orderHistoryCount: orderHistoryCountDefault,
    setBarChartsCount: (() => {}) as Dispatch<SetStateAction<5 | 7 | 10>>,
    setListsCount: (() => {}) as Dispatch<SetStateAction<5 | 7 | 10>>,
    setOrderHistoryCount: (() => {}) as Dispatch<SetStateAction<5 | 15 | 25>>,
});

const DisplaySettingsProvider = ({ children }: Props): ReactElement => {
    const [barChartsCount, setBarChartsCount] = useState<5 | 7 | 10>(barChartsCountDefault as 5 | 7 | 10);
    const [listsCount, setListsCount] = useState<5 | 7 | 10>(listsCountDefault as 5 | 7 | 10);
    const [orderHistoryCount, setOrderHistoryCount] = useState<5 | 15 | 25>(orderHistoryCountDefault);

    useEffect(() => {
        if (barChartsCount !== barChartsCountDefault) {
            localStorage.setItem('bar-charts-display-count', barChartsCount.toString());
        }
    }, [barChartsCount]);

    useEffect(() => {
        if (listsCount !== listsCountDefault) {
            localStorage.setItem('lists-display-count', listsCount.toString());
        }
    }, [listsCount]);

    return (
        <DisplaySettingsContext.Provider
            value={{
                barChartsCount,
                listsCount,
                orderHistoryCount,
                setBarChartsCount,
                setListsCount,
                setOrderHistoryCount,
            }}
        >
            {children}
        </DisplaySettingsContext.Provider>
    );
};

export default DisplaySettingsProvider;
