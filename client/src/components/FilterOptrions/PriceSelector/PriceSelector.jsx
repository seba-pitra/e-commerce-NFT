import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const App = () => {

    const [value, setValue] =  React.useState([0,100]);
    // Changing State when volume increases/decreases
    const rangeSelector = (event, newValue) => {
        setValue(newValue);
        console.log(newValue)
    };

    return (
    <div style={{
        margin: 'auto',
        display: 'block',
        width: 'fit-content'
    }}>
        <h3>Precio entre: </h3>
        <Slider
        value={value}
        onChange={rangeSelector}
        valueLabelDisplay="auto"
        />
        Your range of Price is between ${value[0]} and ${value[1]}
    </div>
    );
}

export default App;