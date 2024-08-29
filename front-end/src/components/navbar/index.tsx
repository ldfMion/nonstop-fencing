import {DesktopNavbar, MobileNavbar} from './navbar';

export default function Navbar(): JSX.Element {
    return (
        <div className="sticky top-0 z-10 px-6 backdrop-blur-md">
            <DesktopNavbar />
            <MobileNavbar />
        </div>
    );
}
