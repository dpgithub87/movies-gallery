import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from "react";
import "../../styles/errorModal/errorModal.scss";


const ErrorModal: FunctionComponent<any> = ({isOpen, handleClose}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            }}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Error
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Something went wrong
                </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ErrorModal;
