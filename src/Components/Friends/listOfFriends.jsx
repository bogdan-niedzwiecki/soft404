import React, { Component } from "react";
import styles from "../Header/Search/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  CardActions,
  Card,
  Grid,
  InputBase

} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


class Friend extends Component {

    state = {
        filterText: this.props.filterText
      };
    
      handleChange = event => {
        this.setState(
          {
            filterText: event.target.value
          },
          () =>
            setTimeout(() => {
              // this.props.filterPosts(this.state.filterText);
            }, 500)
        );
        fetch(`https://delfinkitrainingapi.azurewebsites.net/api/user/${this.state.filterText}`, {
        method: "GET",
        headers: {
          "X-ZUMO-AUTH": sessionStorage.getItem("azure_access_token")
        }
      })
      .then(response => response.json())
      .then(response => console.log(response));
      };


      
  
  render() {
    const { classes } = this.props;
    const { filterText } = this.state;
    return (
        
        <Card >
        <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={this.handleChange}
          value={filterText}
        />
        </div>
          <CardContent >    
            <Typography >
              
            </Typography>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
          
            </Grid>
          </CardActions>
        </Card>
        
          
    );
  }
}
export default  withStyles(styles)(Friend);
