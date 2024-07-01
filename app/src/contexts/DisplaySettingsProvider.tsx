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

const topStoresCountDefault: number = 5;
const topStreaksCountDefault: number = 5;
const orderHistoryCountDefault: number = 5;

export const DisplaySettingsContext = createContext({
    topStoresCount: topStoresCountDefault,
    topStreaksCount: topStreaksCountDefault,
    orderHistoryCount: orderHistoryCountDefault,
    setTopStoresCount: (() => {}) as Dispatch<SetStateAction<number>>,
    setTopStreaksCount: (() => {}) as Dispatch<SetStateAction<number>>,
    setOrderHistoryCount: (() => {}) as Dispatch<SetStateAction<number>>,
});

const DisplaySettingsProvider = ({ children }: Props): ReactElement => {
    const [topStoresCount, setTopStoresCount] = useState<number>(topStoresCountDefault);
    const [topStreaksCount, setTopStreaksCount] = useState<number>(topStreaksCountDefault);
    const [orderHistoryCount, setOrderHistoryCount] = useState<number>(orderHistoryCountDefault);

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
