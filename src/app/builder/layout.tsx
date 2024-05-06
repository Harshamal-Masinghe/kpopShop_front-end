import TopNav from '@/components/gift-box/giftbox-topnav';
import { GiftBoxProvider } from '@/context/giftBox';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="ml-56 mr-56">
            <div className="text-center text-stone-900 text-l font-bold font-inter mt-10">Custom Gift Box Builder</div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <TopNav />
                <ToastContainer />
                <div className="mt-10">
                    <GiftBoxProvider>
                        {children}
                    </GiftBoxProvider>
                </div>
            </div>
        </div>
    );
}