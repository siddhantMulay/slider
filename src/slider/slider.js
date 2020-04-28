
import React, { Component } from 'react';
import './slider.css';

class Slider extends Component {

    changeEvent = (event, type, valType) => {
        const { onChange } = this.props;

        if (type === 'Range') {
            const diff = 10;
            let parentElem = event.currentTarget.offsetParent;
            let lowerSlider = parentElem.querySelectorAll('.rangeLower')[0];
            let upperSlider = parentElem.querySelectorAll('.rangeUpper')[0];

            let lowerVal = parseInt(lowerSlider.value);
            let upperVal = parseInt(upperSlider.value);

            if (valType === 'lower') {
                lowerVal = parseInt(event.target.value);
                upperVal = parseInt(upperSlider.value);
                let lVal = lowerVal;
                let uVal = upperVal;

                if (lowerVal > upperVal - diff) {
                    uVal = lowerVal + diff;
                    if (upperVal === upperSlider.max) {
                        lVal = parseInt(upperSlider.max) - diff;
                    }
                }

                if (uVal < upperSlider.max) {
                    onChange(lVal, 'lowerVal');
                    onChange(uVal, 'upperVal');
                }
            }
            else {
                lowerVal = parseInt(lowerSlider.value);
                upperVal = parseInt(upperSlider.value);
                let lVal = lowerVal;
                let uVal = upperVal;

                if (upperVal < lowerVal + diff) {
                    lVal = upperVal - diff;

                    if (lowerVal === lowerSlider.min) {
                        uVal = diff;
                    }
                }
                if (lVal > lowerSlider.min) {
                    onChange(lVal, 'lowerVal');
                    onChange(uVal, 'upperVal');
                }
            }
        }
        else {
            onChange(event.target.value);
        }
    }

    render() {

        const { value, min, max, step, type, dual, lowerVal, upperVal } = this.props;
        return (
            <div className={`slider ${dual ? 'rangeSlider' : ''}`}>
                <div className="currentValue">
                    Selected {dual ? "Range" : "Value"} : {dual ? lowerVal + ' - ' + upperVal : value}
                </div>
                {dual ?
                    <input type="range"
                        className="rangeLower"
                        onChange={(event) => this.changeEvent(event, type, 'lower')}
                        min={0}
                        max={max}
                        value={lowerVal}
                        step={step}
                    />
                    : null}
                <input type="range"
                    className={`${dual ? 'rangeUpper' : ''}`}
                    onChange={(event) => this.changeEvent(event, type, `${dual ? 'upper' : null}`)}
                    min={min}
                    max={max}
                    value={dual ? upperVal : value}
                    step={step}
                />
            </div>
        )
    }
}


export default Slider;