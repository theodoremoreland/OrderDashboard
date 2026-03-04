// React
import { ReactElement, useState } from 'react';

// Utils
import { saveDontShowAgain, shouldShowInfoBanner } from './InfoBanner.utils';

// Video
import dnaVideo from '../../assets/video/dna.mp4';
import dnaVideoFrame1 from '../../assets/video/dna_frame_1.png';

// Styles
import './InfoBanner.css';

const InfoBanner = (): ReactElement | null => {
    const [isVisible, setIsVisible] = useState<boolean>(shouldShowInfoBanner());

    const handleHide = (): void => {
        setIsVisible(false);
    };

    const handleDontShowAgain = (): void => {
        saveDontShowAgain();
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="InfoBanner">
            <div className="info-banner-content">
                <p>
                    This dashboard provides an overview of DoorDash order
                    history. It is pre-loaded with randomized example data. To
                    learn how to use your own data, visit the{' '}
                    <a
                        href="https://github.com/theodoremoreland/OrderDashboard?tab=readme-ov-file#getting-the-order-data"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        README.
                    </a>
                </p>
            </div>
            <div className="info-banner-buttons">
                <button
                    type="button"
                    className="hide"
                    title="Hide banner"
                    onClick={handleHide}
                >
                    Hide
                </button>
                <button
                    type="button"
                    title="Don't show this banner again"
                    onClick={handleDontShowAgain}
                    className="dont-show-again"
                >
                    Don't show this again
                </button>
            </div>
            <div className="info-banner-overlay"></div>
            <video
                src={dnaVideo}
                poster={dnaVideoFrame1}
                autoPlay
                loop
                muted
                playsInline
                className="demo-video"
            />
        </div>
    );
};

export default InfoBanner;
