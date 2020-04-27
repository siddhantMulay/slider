
import React, { Component } from 'react';
import Slider from '../slider/slider';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 20
        }
    }

    sliderOnChange = (value) => {
        this.setState({
            sliderValue: value
        })
        console.log(this.state.sliderValue)
    }

    render() {
        const { sliderValue } = this.state;
        return (
            <div>
                <Slider
                    onChange={(val) => this.sliderOnChange(val)}
                    value={sliderValue}
                    min={5}
                    max={100}
                    step={2}
                />
            </div>
        )
    }
}


export default Landing;