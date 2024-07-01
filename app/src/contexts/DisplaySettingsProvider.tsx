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

const topStoresCountDefault = Number(localStorage?.getItem('top-stores-display-count')) || 5;
const topStreaksCountDefault = Number(localStorage?.getItem('top-streaks-display-count')) || 5;
const orderHistoryCountDefault = 5;

export const DisplaySettingsContext = createContext({
    topStoresCount: topStoresCountDefault,
    topStreaksCount: topStreaksCountDefault,
    orderHistoryCount: orderHistoryCountDefault,
    setTopStoresCount: (() => {}) as Dispatch<SetStateAction<5 | 7 | 10>>,
    setTopStreaksCount: (() => {}) as Dispatch<SetStateAction<5 | 7 | 10>>,
    setOrderHistoryCount: (() => {}) as Dispatch<SetStateAction<5 | 15 | 25>>,
});

const DisplaySettingsProvider = ({ children }: Props): ReactElement => {
    const [topStoresCount, setTopStoresCount] = useState<5 | 7 | 10>(topStoresCountDefault as 5 | 7 | 10);
    const [topStreaksCount, setTopStreaksCount] = useState<5 | 7 | 10>(topStreaksCountDefault as 5 | 7 | 10);
    const [orderHistoryCount, setOrderHistoryCount] = useState<5 | 15 | 25>(orderHistoryCountDefault);

    useEffect(() => {
        if (topStoresCount !== topStoresCountDefault) {
            localStorage.setItem('top-stores-display-count', topStoresCount.toString());
        }
    }, [topStoresCount]);

    useEffect(() => {
        if (topStreaksCount !== topStreaksCountDefault) {
            localStorage.setItem('top-streaks-display-count', topStreaksCount.toString());
        }
    }, [topStreaksCount]);

    return (
        <DisplaySettingsContext.Provider
            value={{
                topStoresCount,
                topStreaksCount,
                orderHistoryCount,
                setTopStoresCount,
                setTopStreaksCount,
                setOrderHistoryCount,
            }}
        >
            {children}
        </DisplaySettingsContext.Provider>
    );
};

export default DisplaySettingsProvider;
