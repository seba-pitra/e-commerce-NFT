import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const App = () => {

    const [range, setRange] =  useState(
        {
            min : 0,
            max : 0
        }
    );

    
    const currencies = ['USD', 'EUR', 'GBP']
    
    const invalidMaxValue = range.max <= range.min;
    
    const handleMinChange = (e) => {
        setRange({...range, min: parseInt(e.target.value)});
    }
    const handleMaxChange = (e) => {
        setRange({...range, max: parseInt(e.target.value)});
    }
    
    const handleSubmit = (e) => {
        /*
        dispatch range to reducer
        */
       alert(`el reducer recibio el rango ${range.min} - ${range.max}` )
    };
    console.log(invalidMaxValue)
    console.log(range)

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h3>Precio : </h3>
                <select name="" id="">
                    {currencies.map(currency => {
                        return <option>
                            {currency}
                        </option>
                    })}
                </select>
            <label htmlFor="min">Min: </label>
                <input name="min" type="number" value={range.min} onChange={(e)=>handleMinChange(e)} min="0"/>
            <label htmlFor="max">Max: </label>
                <input name="max" type="number" value={range.max} onChange={(e)=>handleMaxChange(e)} min={range.min}/>
            <input type="submit" value="solicitar" disabled={invalidMaxValue}/>
        </form>
    );
}

export default App;