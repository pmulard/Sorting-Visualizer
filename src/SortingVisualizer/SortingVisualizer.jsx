import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
        };
    }

    // When app loads for the first time
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i < 100; i++) {
            array.push(getRandomInt(5, 500))
        }
        this.setState({array});
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-bar-container">
                {array.map((element, index) => (
                    <div className="array-bar" key={index} 
                        style={{height: `${element}px`}}>
                    </div>
                ))}
            </div>
        );
    }
}

// From https://www.w3schools.com/js/js_random.asp
// Min and Max are both inclusive.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

