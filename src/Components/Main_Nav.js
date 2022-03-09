import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Whatshot,Movie,Tv,Search} from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop:50,
    position:"fixed",
    bottom:0,
    zIndex:100
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    if(value===0){
      navigate("/")
    }
    else if (value===1){
      navigate("/movies")
    }
    else if (value===2){
      navigate("/series")
    }
    else if (value===3){
      navigate("/search")
    }
  }, [value,navigate])
  

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Trending" icon={<Whatshot/>} />
      <BottomNavigationAction label="Movies" icon={<Movie />} />
      <BottomNavigationAction label="Tv Series" icon={<Tv/>} />
      <BottomNavigationAction label="Search" icon={<Search/>} />
    </BottomNavigation>
  );
}