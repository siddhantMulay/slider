
import React, { Component } from 'react';
import './slider.css';

class Slider extends Component {

    changeEvent = (event) => {
        const { onChange } = this.props;
        onChange(event.target.value)
    }


    render() {
        const { value, min, max, step, orientation } = this.props;
        return (
            <div className={`slider ${orientation === 'v' ? 'vertical' : ''}`}>
                <div className="currentValue">
                    Selected Value: {value}
                </div>
                <input type="range"
                    onChange={(event) => this.changeEvent(event)}
                    min={min}
                    max={max}
                    value={value}
                    step={step}
                />
            </div>
        )
    }
}


export default Slider;