import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../../NewPost/styles";   
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    CardActions,
    Tooltip,
    IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import { fetchEditedPostToAPI } from "../../../actions/postActions";
import { connect } from "react-redux";

class EditPostButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        open: false,
        post: {
            title: this.props.title,
            text: this.props.text,
            photo: null
        }
    };
}

    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
        
    handleChange = event => {
        this.setState({
            post: {
                ...this.state.post,
                [event.target.id]: event.target.value
            }
        });
    };

    handlePhotoChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    handleDataReset = () => {
        this.setState({
            post: {
                title: "",
                text: ""
            }
        });
    };

    handleChangePost = event => {
        event.preventDefault();
        let formData = new FormData();
        if (this.state.selectedFile) {
            formData.append('photo', this.state.selectedFile);
        }
        formData.append('post', JSON.stringify(this.state.post));
        this.props.fetchEditedPostToAPI(this.props.delete_id, formData)
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        const { title, text } = this.state.post;
        return (
            <div>
                <Tooltip title="Edit Post">
                    <IconButton
                        aria-label="Delete post"
                        color="primary"
                        size="madium"
                        onClick={this.handleClickOpen}
                    >
                    < EditIcon color="primary" />
                    </IconButton>
                </Tooltip>

                <Dialog
                    maxWidth="sm"
                    fullWidth
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ textAlign: "center", marginTop: "3%" }} >
                        {"Editing Post"}
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.toolbar} />
                        <Grid
                            container
                            direction="column"
                            justify="space-around"
                            alignItems="stretch"
                        >
                            <TextField
                                id="title"
                                label="Title of the Post"
                                placeholder="Somewhere in the space"
                                margin="normal"
                                variant="outlined"
                                value={title}
                                onChange={this.handleChange}
                                required={true}
                                inputProps={{ maxLength: 150, minLength: 10 }}
                            />

                            <TextField
                                id="text"
                                label="Content of the Post"
                                placeholder="It was a monday, day like any other day"
                                rows="10"
                                rowsMax="13"
                                required={true}
                                multiline
                                margin="normal"
                                variant="outlined"
                                value={text}
                                onChange={this.handleChange}
                            />

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <CardActions className={classes.footer}>
                            <Button
                                variant="outlined"
                                aria-label="Save"
                                size="medium"
                                color="primary"
                                autoFocus
                                type="submit"
                                onClick={this.handleChangePost}
                            >
                                Save
                            <SaveIcon />
                            </Button>
                            <Tooltip title="Cancel" placement="bottom">
                                <IconButton
                                    aria-label="Delete"
                                    onClick={this.handleDataReset}
                                    color="secondary"
                                    size="medium"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                            <input
                                component="span"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={this.handlePhotoChange}
                            />
                            <label htmlFor="raised-button-file">
                                <Tooltip title="Upload Photo" placement="bottom">
                                    <IconButton
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        size="medium"
                                    >
                                        <PhotoCameraIcon />
                                    </IconButton>
                                </Tooltip>
                            </label>
                        </CardActions>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatch = dispatch => ({
    fetchEditedPostToAPI: (formData, token) =>
        dispatch(fetchEditedPostToAPI(formData, token))
});
export default
    connect(
        state => ({ token: state.token }),
        mapDispatch
    )(withStyles(styles)(EditPostButton)
    );
