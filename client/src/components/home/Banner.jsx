/**
 * Banner Component
 * ----------------
 * Displays a GitHub-style announcement banner.
 * Used to highlight major updates or repo promotion.
 */
const Banner = () => {
    return (
        <div className="w-full bg-linear-to-r from-[#ABFF7E] to-[#FDFEFF] py-2.5">
            <div className="flex items-center justify-center gap-3 text-sm font-medium text-green-900">

                {/* GitHub Star Badge */}
                <a
                    href="https://github.com/laxman-thedev/AI-Resume-Builder-App"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-white transition-all
                                hover:bg-green-700 hover:shadow
                                active:scale-95"
                >
                    <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    Star on GitHub
                </a>

                {/* Text */}
                <span className="hidden sm:inline">
                    AI Feature Added
                </span>
            </div>
        </div>
    );
};

export default Banner;