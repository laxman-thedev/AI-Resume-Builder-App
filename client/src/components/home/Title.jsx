/**
 * Title Component
 * ---------------
 * Reusable section heading component.
 * Displays a title and a short description, centered.
 *
 * Props:
 * - title (string): Main heading text
 * - description (string): Supporting description text
 */
const Title = ({ title, description }) => {
    return (
        <div className='text-center mt-6 text-slate-700'>
            {/* Section title */}
            <h2 className='text-3xl sm:text-4xl font-medium'>
                {title}
            </h2>

            {/* Section description */}
            <p className='max-sm max-w-2xl mt-4 text-slate-500'>
                {description}
            </p>
        </div>
    )
}

export default Title