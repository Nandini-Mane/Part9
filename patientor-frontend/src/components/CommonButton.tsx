// components/CommonButton.tsx

import React from 'react';

/**
 * Define the possible visual styles (variants) for the button.
 */
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';

/**
 * Define the possible HTML button types.
 */
type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Define the props for the CommonButton component.
 */
interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** The content displayed inside the button. */
    children: React.ReactNode;
    /** The visual style of the button. Defaults to 'primary'. */
    variant?: ButtonVariant;
    /** The HTML type attribute of the button. Defaults to 'button'. */
    type?: ButtonType;
    /** If true, the button will span the full width of its container. */
    fullWidth?: boolean;
    /** Optional click handler function. */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Whether the button should be disabled. */
    disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
    children,
    variant = 'primary',
    type = 'button',
    fullWidth = false,
    onClick,
    disabled = false,
    className = '', // Allow external classes to be passed
    ...rest // Capture any other standard button attributes
}) => {

    // Construct the class names based on props
    const buttonClasses = [
        'common-button',
        `variant-${variant}`,
        fullWidth ? 'full-width' : '',
        disabled ? 'disabled' : '',
        className // Include any external class provided by the user
    ].join(' ').trim();

    return (
        <button
            className={buttonClasses}
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...rest} // Spread any remaining props (like 'aria-label', 'id', etc.)
        >
            {children}
        </button>
    );
};

export default CommonButton;

// --- Example Basic Styling ---

// Note: In a real application, this CSS would typically be in a separate CSS/SCSS module.
const style = document.createElement('style');
style.innerHTML = `
    .common-button {
        padding: 10px 15px;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        white-space: nowrap; /* Prevent text wrapping */
    }

    /* Primary Variant (e.g., main action) */
    .variant-primary {
        background-color: #007bff;
        color: white;
    }
    .variant-primary:hover:not(:disabled) {
        background-color: #0056b3;
    }

    /* Secondary Variant (e.g., alternative action) */
    .variant-secondary {
        background-color: #6c757d;
        color: white;
    }
    .variant-secondary:hover:not(:disabled) {
        background-color: #5a6268;
    }

    /* Danger Variant (e.g., destructive action) */
    .variant-danger {
        background-color: #dc3545;
        color: white;
    }
    .variant-danger:hover:not(:disabled) {
        background-color: #bd2130;
    }

    /* Text Variant (e.g., subtle action, link-style) */
    .variant-text {
        background-color: transparent;
        color: #007bff;
        padding: 10px 5px;
    }
    .variant-text:hover:not(:disabled) {
        color: #0056b3;
        text-decoration: underline;
    }

    /* Disabled State */
    .common-button:disabled, .disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    /* Full Width */
    .full-width {
        width: 100%;
        display: block;
    }
`;
document.head.appendChild(style);