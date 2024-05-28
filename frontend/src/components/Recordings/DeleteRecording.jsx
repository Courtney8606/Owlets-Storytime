import { deleteCloudinaryUpload } from '../../services/recordings';
import { deleteRecording } from '../../services/recordings';
import PropTypes from 'prop-types';
import MainViewButton from "../../components/Buttons/MainViewButton";

export const DeleteAudioButton = (props) => {
    const handleDelete = async() => {
        try {
            await deleteRecording(props.recording_id);
            await deleteCloudinaryUpload(props.public_id);
            console.log('Audio file and associated resources deleted successfully.');
            await props.onSubmit(localStorage.getItem("username"))
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <div>
        <MainViewButton text="Delete" onClick={handleDelete}/>
        </div>

    );
};

DeleteAudioButton.propTypes = {
    recording_id: PropTypes.number.isRequired,
    public_id: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};




