type TCircleProps = {
    type: 'filled' | 'outlined',
    size: number,
    className?: string,
}

const Circle = ({ type, size, className = '' }: TCircleProps) => {
    return type === 'filled' ? (
        <svg className={className} width={size} height={size} viewBox="0 0 208 206" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M175.5 103C175.5 141.641 143.785 173.5 104 173.5C64.2149 173.5 32.5 141.641 32.5 103C32.5 64.3593 64.2149 32.5 104 32.5C143.785 32.5 175.5 64.3593 175.5 103Z" stroke="currentColor" strokeWidth="65"/>
        </svg>
    ) : (
        <svg className={className} width={size} height={size} viewBox="0 0 208 206" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M104 143.5C126.858 143.5 145.5 125.428 145.5 103C145.5 80.5716 126.858 62.5 104 62.5C81.1418 62.5 62.5 80.5716 62.5 103C62.5 125.428 81.1418 143.5 104 143.5Z" stroke="currentColor" strokeWidth="5" />
            <path d="M205.5 103C205.5 158.482 160.08 203.5 104 203.5C47.9203 203.5 2.5 158.482 2.5 103C2.5 47.5181 47.9203 2.5 104 2.5C160.08 2.5 205.5 47.5181 205.5 103Z" stroke="currentColor" strokeWidth="5" />
        </svg>
    )
}

export default Circle