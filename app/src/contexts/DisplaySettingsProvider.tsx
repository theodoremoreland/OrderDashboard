// React
import {
    ReactElement,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from "react";

interface Props {
    children: ReactElement;
}

const topStoresCountDefault = 5;
const topStreaksCountDefault = 5;
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
    const [topStoresCount, setTopStoresCount] = useState<5 | 7 | 10>(topStoresCountDefault);
    const [topStreaksCount, setTopStreaksCount] = useState<5 | 7 | 10>(topStreaksCountDefault);
    const [orderHistoryCount, setOrderHistoryCount] = useState<5 | 15 | 25>(orderHistoryCountDefault);

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
