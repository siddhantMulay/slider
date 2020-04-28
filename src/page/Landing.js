
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
                type: "Basic",
                step: 1,
                dual: false,
                lowerVal: 2,
                upperVal: 50
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
                        dual={item.dual}
                        type={item.type}
                        onChange={(val, valType) => this.sliderOnChange(item.id, val, valType)}
                        value={item.value}
                        min={5}
                        max={100}
                        step={2}
                        lowerVal={item.lowerVal}
                        upperVal={item.upperVal}
                    />
                </div>)
        })
        return retArr;
    }

    sliderOnChange = (id, value, valType) => {
        let sData = [...this.state.sliderData];

        if (id !== 0) {

            sData.map((item) => {

                if (valType) {
                    item[valType] = value
                }
                else {
                    if (item.id === id) {
                        item.value = parseInt(value);
                    }
                }
            })

            this.setState({
                sliderData: sData
            })
        }
        else {
            if (valType) {
                this.setState({
                    customSliderData: Object.assign({}, this.state.customSliderData, {
                        type: 'Range',
                        [valType]: value
                    })
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
    }

    inputOnChange = (key, event) => {
        this.setState({
            customSliderData: Object.assign({}, this.state.customSliderData, {
                [key]: key === 'dual' ? event.target.checked : parseInt(event.target.value)
            })
        })
    }

    render() {
        const { value, min, max, step, dual, lowerVal, upperVal } = this.state.customSliderData;
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

                            <div className="inputContainer">
                                <div className="inputLabel">
                                    Range
                                </div>
                                <label className="switch">
                                    <input type="checkbox" checked={dual} onChange={(event) => this.inputOnChange("dual", event)} />
                                    <span className="inputSlider"></span>
                                </label>
                            </div>


                        </div>

                        <Slider
                            onChange={(val, valType) => this.sliderOnChange(0, val, valType)}
                            type={dual ? "Range" : ""}
                            value={value}
                            dual={dual}
                            min={min}
                            max={max}
                            step={step}
                            lowerVal={lowerVal}
                            upperVal={upperVal}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default Landing;