import { LocalStorageKeys } from '../../types/types';

export const saveDontShowAgain = (): void => {
    try {
        localStorage.setItem(LocalStorageKeys.DONT_SHOW_INFO_BANNER, 'true');
        localStorage.setItem(
            LocalStorageKeys.INFO_BANNER_LAST_SHOWN_DATE,
            new Date().toISOString()
        );
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const shouldShowInfoBanner = (): boolean => {
    try {
        const dontShow: string | null = localStorage.getItem(
            LocalStorageKeys.DONT_SHOW_INFO_BANNER
        );
        const lastShownDate: string | null = localStorage.getItem(
            LocalStorageKeys.INFO_BANNER_LAST_SHOWN_DATE
        );
        if (dontShow === 'true' && lastShownDate) {
            const lastShown: Date = new Date(lastShownDate);
            const now: Date = new Date();
            const diffInDays: number =
                (now.getTime() - lastShown.getTime()) / (1000 * 3600 * 24);

            return diffInDays >= 30; // Show banner again after 30 days
        }

        return true; // Show banner if not set to "don't show"
    } catch (error) {
        console.error('Error reading from localStorage:', error);

        return true; // Default to showing the banner if there's an error
    }
};
