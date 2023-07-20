import React, { Component } from 'react'

class App extends Component {
    state = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        btnDisabled: false,
        interval: null,
        intervalStorage: []
    };

    startWatch = () => {
        this.setState({
            btnDisabled: true
        });
        let timer = setInterval(() => {
            const { hours, minutes, seconds } = this.state;
            if (seconds === 59) {
                if (minutes === 59) {
                    this.setState({
                        seconds: 0,
                        minutes: 0,
                        hours: hours + 1
                    })
                }
                this.setState({
                    seconds: 0,
                    minutes: minutes + 1
                })
            } else {
                this.setState({
                    seconds: seconds + 1
                })
            }

        }, 1000);
        this.setState({
            interval: timer
        })
    }

    stopWatch = () => {
        clearInterval(this.state.interval);
        this.setState({
            btnDisabled: false
        })
    }

    setIntervalwatch = () => {
        const { intervalStorage, hours, minutes, seconds } = this.state;
        intervalStorage.push(`${hours} h : ${minutes} m : ${seconds} s`);
        this.setState({
            intervalStorage: intervalStorage
        })
    }

    clearWatch = () => {
        this.stopWatch();
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            intervalStorage: []
        });
    }

    render() {
        const { hours, minutes, seconds } = this.state
        return (
            <div className='container'>
                <div className='watch-wrapper'>
                    <h1 className='fs-1 fw-bold text-center mb-4'>Online StopWatch</h1>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='shadow-sm bg-body-tertiary py-2 px-3 mb-3 time-show-wrapper rounded time-show-wrapper'>
                            <span>{hours} hours : </span>
                            <span>{minutes} minutes : </span>
                            <span>{seconds} seconds</span>
                        </div>
                        <button type='button' className='d-block w-50 mb-3 shadow-sm btn btn-success' onClick={this.startWatch} disabled={this.state.btnDisabled}>start</button>
                        <button type='button' className='d-block w-50 mb-3 shadow-sm btn btn-danger' onClick={this.stopWatch}>stop</button>
                        <button type='button' className='d-block w-50 mb-3 shadow-sm btn btn-info' onClick={this.setIntervalwatch} disabled={!this.state.btnDisabled}>interval</button>
                        <button type='button' className='d-block w-50 mb-3 shadow-sm btn btn-dark' onClick={this.clearWatch}>clear</button>
                        <div className='bg-body-secondary w-50 p-4 rounded score-wrapper'>
                            <h5 className='text-center fw-bold mb-3'>intervals:</h5>
                            <ol>
                                {
                                    this.state.intervalStorage.map(i => {
                                        return <li><p>{i}</p></li>
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;