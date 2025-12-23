/**
 * Banner Component
 * ----------------
 * Displays a small announcement banner at the top of the page.
 * Used to highlight new features or updates (e.g., AI feature launch).
 */
const Banner = () => {
    return (
        <div>
            {/* Top announcement banner */}
            <div className="w-full py-2.5 font-medium text-sm text-green-800 text-center bg-gradient-to-r from-[#ABFF7E] to-[#FDFEFF]">
                <p>
                    <span className="px-3 py-1 rounded-lg text-white bg-green-600 mr-2">
                        New
                    </span>
                    AI Feature Added
                </p>
            </div>
        </div>
    );
};

export default Banner;