import React, { Component } from 'react';
import logo from './genetics.jpg';
import { Container, Row, Col, Card, CardImg, CardTitle, CardBlock, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import LifeBoard from './LifeBoard';

class App extends Component {
	
	constructor(props) {
		super(props);

		this.handleChecked = this.handleChecked.bind(this);
	}
	
	/**
	 * Update the state to reflect changes to the birth and survival checkboxes.
	 * The data-rule attribute is used to pass in the birth or survival identifier.
	 */
	handleChecked(event) {
		if (event.target.getAttribute('data-life') === 'birth') {
			this.props.setBirthFlag(event.target.getAttribute('data-number'), event.target.checked)
		} else {
			this.props.setSurvivalFlag(event.target.getAttribute('data-number'), event.target.checked)
		}
	}
	
		
	render() {
		return (
			<Container fluid>
				<Row>
					{
						// The first column is the setup and instructions
					}
					<Col md="4" sm="12" className="spaced">
						<Card>
							<CardImg src={logo} top  className="img-fluid" />
							<CardBlock>
								<CardTitle>Game of Life</CardTitle>
								<h3>Instructions</h3>
								<ul>
									<li>Clicking on the individual cells toggles them on and off.</li>
									<li>Click start/stop button to start/stop the simulation.</li>
									<li>Change the number of rows and columns using provided sliders.</li>
									<li>Change the birth and survival rules using the provided checkboxes.</li>
									<li>The number next to the birth/survival checkboxes indicate the number of neighbours required for birth of a new cell or survival of an existing cell.</li>
								</ul>
							</CardBlock>
							<CardBlock>
								<h3>Settings</h3>
								<FormGroup>
									<Label for="rows">Number of Rows:</Label>
									<InputRange id="rows" minValue={5} maxValue={50} value={this.props.rows} onChange={rows => this.props.setRowCount(rows)} onChangeComplete={() => this.props.randomize()}/>
								</FormGroup>
								<FormGroup>
									<Label for="columns">Number of Columns:</Label>
									<InputRange id="columns" minValue={5} maxValue={50} value={this.props.columns} onChange={columns => this.props.setColumnCount(columns)} onChangeComplete={() => this.props.randomize()}/>
								</FormGroup>
								<FormGroup check>
									<Label for="birth">Neighbours required for Birth:</Label>
									<div>
										{[1,2,3,4,5,6,7,8].map((number) =>
											<Label key={number} className="checkbox-style" check>
												<Input type='checkbox' data-life='birth' data-number={number} checked={this.props["birth" + number]} onChange={this.handleChecked}/> {number}
											</Label>
										)}
									</div>
								</FormGroup>
								<FormGroup check>
									<Label for="survival">Neighbours required for Cell Survival:</Label>
									<div>
										{[1,2,3,4,5,6,7,8].map((number) =>
											<Label key={number} className="checkbox-style" check>
												<Input type='checkbox' data-life={'survival'} data-number={number} checked={this.props["survival" + number]} onChange={this.handleChecked}/> {number}
											</Label>
										)}
									</div>
								</FormGroup>
								<FormGroup>
									<Label for="fps">Animation speed (fps):</Label>
									<InputRange id="fps" minValue={1} maxValue={20} value={this.props.fps} onChange={fps => this.props.setFps(fps)}/>
								</FormGroup>
							</CardBlock>
							{
								// Control buttons
							}
							<CardBlock>
								<Button color="secondary" className="spaced-buttons" onMouseDown={e => e.preventDefault()} onClick={this.props.clearBoard}>Clear</Button>
								<Button color="secondary" className="spaced-buttons" onMouseDown={e => e.preventDefault()} onClick={this.props.randomize}>Randomize</Button>
								<Button color={this.props.running ? 'danger' : 'success'} className="spaced-buttons" onClick={this.props.toggleRunning}>{this.props.running ? 'Stop' : 'Start'}</Button>
							</CardBlock>
							{
								// This is where the status information is displayed
							}
							<CardBlock>
								{this.props.running &&
									<Alert>Current generation: {this.props.currentGeneration}</Alert>
								}
								{!this.props.running && this.props.exitReason &&
									<Alert>{this.props.exitReason}</Alert>
								}
							</CardBlock>
						</Card>
					</Col>
					{
						// The second column displays the board where the pixels live out their short and meaningless lives
					}
					<Col  md="8" sm="12" className="spaced">
						<Card>
							<CardBlock>
								<LifeBoard rows={this.props.rows} columns={this.props.columns} selection={this.props.selection} handleCellClicked={this.props.handleCellClicked}/>
							</CardBlock>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
