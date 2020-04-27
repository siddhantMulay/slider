
import React, { Component } from 'react';
import './Landing.css';
import Slider from '../slider/slider';
import sliderData from '../common/config';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderData
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

        sData.map((item) => {
            if (item.id === id) {
                item.value = parseInt(value);
            }
        })

        this.setState({
            sliderData: sData
        })
    }

    render() {
        return (
            <div>
                <div className="allSliders">
                    {this.renderAllSliders()}
                </div>
            </div>
        )
    }
}


export default Landing;