
import React, { Component } from 'react';
import './Landing.css';
import Slider from '../slider/slider';
import sliderData from '../common/config';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderData,
            customSliderData: {
                value: 15,
                min: 5,
                max: 100,
                step: 1
            }
        }
    }

    renderAllSliders = () => {
        const { sliderData } = this.state;
        let retArr = [];
        sliderData.forEach((item, index) => {
            retArr.push(
                <div className="sliderContainer" key={`slider${index}`}>
                    <div className="typeOfSlider">{item.type}</div>
                    <Slider
                        orientation={item.orientation}
                        onChange={(val) => this.sliderOnChange(item.id, val)}
                        value={item.value}
                        min={5}
                        max={100}
                        step={2}
                    />
                </div>)
        })
        return retArr;
    }

    sliderOnChange = (id, value) => {
        let sData = [...this.state.sliderData];

        if (id !== 0) {

            sData.map((item) => {
                if (item.id === id) {
                    item.value = parseInt(value);
                }
            })

            this.setState({
                sliderData: sData
            })
        }
        else {
            this.setState({
                customSliderData: Object.assign({}, this.state.customSliderData, {
                    value: value
                })
            })
        }
    }

    inputOnChange = (type, event) => {
        this.setState({
            customSliderData: Object.assign({}, this.state.customSliderData, {
                [type]: parseInt(event.target.value)
            })
        })
    }

    render() {
        const { value, min, max, step } = this.state.customSliderData;
        return (
            <div>
                <div className="allSliders">
                    {this.renderAllSliders()}
                    <div className="customSliderContainer sliderContainer">
                        <div className="typeOfSlider">Custom</div>

                        <div className="allCustomInputs">
                            <div className="inputContainer">
                                <div className="inputLabel">
                                    Step
                            </div>
                                <input type="number" value={step} onChange={(event) => this.inputOnChange("step", event)} />
                            </div>

                            <div className="inputContainer">
                                <div className="inputLabel">
                                    Min
                            </div>
                                <input type="number" value={min} onChange={(event) => this.inputOnChange("min", event)} />
                            </div>

                            <div className="inputContainer">
                                <div className="inputLabel">
                                    Max
                            </div>
                                <input type="number" value={max} onChange={(event) => this.inputOnChange("max", event)} />
                            </div>
                        </div>

                        <Slider
                            orientation="h"
                            onChange={(val) => this.sliderOnChange(0, val)}
                            value={value}
                            min={min}
                            max={max}
                            step={step}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default Landing;