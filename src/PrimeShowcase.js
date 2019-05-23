import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import {Card, Layout} from 'element-react/next';

class PrimeShowcase extends Component {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				type: 'line',
				label: 'Dataset 1',
				borderColor: '#2196F3',
				borderWidth: 2,
				fill: false,
				data: [
					50,
					25,
					12,
					48,
					56,
					76,
					42
				]
			}, {
				type: 'bar',
				label: 'Dataset 2',
				backgroundColor: '#4CAF50',
				data: [
					21,
					84,
					24,
					75,
					37,
					65,
                    34
                ],
				borderColor: 'white',
				borderWidth: 2
			}, {
				type: 'bar',
				label: 'Dataset 3',
				backgroundColor: '#FFC107',
				data: [
					41,
					52,
					24,
					74,
					23,
					21,
					32
				]
            }]
        };
  
        const options = {
            responsive: true,
            title: {
                display: true,
                text: 'Combo Bar Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        };

        const radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        return (
            <>
                <Layout.Row gutter="10">
                    <Card
                    className="box-card"
                    header={
                        <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>Weitere Primefaces Komponenten befinden sich <a href="https://www.primefaces.org/primereact/#/">hier</a></span>
                        </div>
                    }
                    >
                        
                    </Card>
                </Layout.Row>
                <hr style={{height: '2px', backgroundColor: '#34495e', border: 'none', margin: '1.2em auto', width: '99%'}}></hr>
                <Layout.Row gutter="10">
                    <Card
                    className="box-card"
                    header={
                        <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>Combo Chart</span>
                        </div>
                    }
                    >
                        <div>
                            <div className="content-section implementation">
                                <Chart type="bar" data={data} options={options} />
                            </div>
                        </div>
                    </Card>
                </Layout.Row>
                <hr style={{height: '2px', backgroundColor: '#34495e', border: 'none', margin: '1.2em auto', width: '99%'}}></hr>
                <Layout.Row gutter="10">
                    <Card
                    className="box-card"
                    header={
                        <div className="clearfix">
                        <span style={{ "lineHeight": "36px" }}>Radar Chart</span>
                        </div>
                    }
                    >
                        <div>
                            <div className="content-section implementation">
                                <Chart type="radar" data={radarData}/>
                            </div>
                        </div>
                    </Card>
                </Layout.Row>
            </>
        )
    }
}

export default PrimeShowcase;