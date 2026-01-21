const ActionButtons = () => {
    const handleCancel = () => {
        console.log("Cancelling changes...");
    };

    const handleSave = () => {
        console.log("Saving changes...");
    };

    return (
        <div className="action-buttons">
            <button className="cancel-btn" onClick={handleCancel}>
                Cancel
            </button>

            <button className="save-btn" onClick={handleSave}>
                Save Changes
            </button>
        </div>
    );
};

export default ActionButtons;
