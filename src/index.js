import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Progressbar from './Progress_bar';

//____To Do____
// - Taco Truck image at top with logo
// - Iron Miners -> buy pickaxe -> mine for Iron and Hire Iron Miner -> Buy Furnace -> Smelt ingots -> buy workbench -> Craft Counterfeit Jewelry
// - Next Milestone -> Mine for Gold (more rare) and hire gold miner
// - Implement progress bar for tasks that take longer than normal (like mining, smelting and crafting) keeps your from doing other stuff 
// - Maybe at each milestone unlock a "need" (hunger, sleep, boredom)
// - food should show its price somwhere

//___Notes____
// - 

class WorkerData {
	constructor(tag, workerCount, workerTimerLimit) {
		this.tag = tag
		this.workerCount = workerCount
		this.workerTimerLimit = workerTimerLimit
	}
}

class Game extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tacoCount: 0,
			tacoChefs: 0,
			tacoChefTimer: 0,

			unlockedBurrito: false,
			burritoCount: 0,
			burritoChefs: 0,
			burritoChefTimer: 0,

			unlockedPickaxe: false,
			unlockedFurnace: false,
			ironOreCount: 0,
			ironMiners: 0,
			ironSmelters: 0,
			ironMinersTimer: 0,
			ironSmeltersTimer: 0,
			ironIngotCount: 0,
			
			unlockedWorkbench: false,
			ironJewelryCount: 0,
			ironJewelryCrafters: 0,
			ironJewelryCrafterTimer: 0,

			money: 0,
			adsPlaced: 0,
			milestone: 0,

			taskActiveTag: null,
			taskProgress: 0,
			taskLength: 0,
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(),80);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		if (this.state.tacoChefs > 0) {
			this.setState({tacoChefTimer: this.state.tacoChefTimer + 1 })
			if (this.state.tacoChefTimer >= 20 / this.state.tacoChefs) {
				this.setState({tacoCount: this.state.tacoCount + 1 })
				this.setState({tacoChefTimer: this.state.tacoChefTimer - (20 / this.state.tacoChefs) })
			}
		}

		if (this.state.burritoChefs > 0) {
			this.setState({burritoChefTimer: this.state.burritoChefTimer + 1 })
			if (this.state.burritoChefTimer >= 32 / this.state.burritoChefs) {
				this.setState({burritoCount: this.state.burritoCount + 1 })
				this.setState({burritoChefTimer: this.state.burritoChefTimer - (32 / this.state.burritoChefs) })
			}
		}
		if (this.state.ironMiners > 0) {
			this.setState({ironMinersTimer: this.state.ironMinersTimer + 1 })
			if (this.state.ironMinersTimer >= 64 / this.state.ironMiners) {
				if (Math.random() < .4) this.setState({ironOreCount: this.state.ironOreCount + 1 })
				this.setState({ironMinersTimer: this.state.ironMinersTimer - (64 / this.state.ironMiners) })
			}
		}
		if (this.state.ironOreCount > 0 && this.state.ironSmelters > 0) {
			this.setState({ironSmeltersTimer: this.state.ironSmeltersTimer + 1 })
			if (this.state.ironSmeltersTimer >= 128 / this.state.ironSmelters) {
				this.setState({ironIngotCount: this.state.ironIngotCount + 1 })
				this.setState({ironOreCount: this.state.ironOreCount - 1 })
				this.setState({ironSmeltersTimer: this.state.ironSmeltersTimer - (128 / this.state.ironSmelters) })
			}
		}
		if (this.state.ironIngotCount > 0 && this.state.ironJewelryCrafters > 0) {
			this.setState({ironJewelryCrafterTimer: this.state.ironJewelryCrafterTimer + 1 })
			if (this.state.ironJewelryCrafterTimer >= 128 / this.state.ironJewelryCrafters) {
				this.setState({ironJewelryCount: this.state.ironJewelryCount + 2 })
				this.setState({ironIngotCount: this.state.ironIngotCount - 1 })
				this.setState({ironJewelryCrafterTimer: this.state.ironJewelryCrafterTimer - (128 / this.state.ironJewelryCrafters) })
			}
		}
		if (this.state.tacoCount > 0) {
			if (Math.random() < .04 + this.state.adsPlaced * .02) {
				this.setState({tacoCount: this.state.tacoCount - 1 })
				this.earnMoney(1)
			}
		}
		if (this.state.burritoCount > 0) {
			if (Math.random() < .04 + this.state.adsPlaced * .01) {
				this.setState({burritoCount: this.state.burritoCount - 1 })
				this.earnMoney(2)
			}
		}
		if (this.state.ironJewelryCount > 0) {
			if (Math.random() < .04 + this.state.adsPlaced * .01) {
				this.setState({ironJewelryCount: this.state.ironJewelryCount - 1 })
				this.earnMoney(8)
			}
		}

		if (this.state.taskActiveTag) {
			this.setState({taskProgress: this.state.taskProgress + 1})
			if (this.state.taskProgress >= this.state.taskLength) {
				this.endTask();
			}
		}
	}
	
	hireTacoChef() {
		if (this.state.money >= 16 * (this.state.tacoChefs + 1)) {
			this.setState({money: this.state.money - 16 * (this.state.tacoChefs + 1)})
			this.setState({tacoChefs: this.state.tacoChefs + 1 })
		}
	}
	
	hireBurritoChef() {
		if (this.state.money >= 32 * (this.state.burritoChefs + 1)) {
			this.setState({money: this.state.money - 32 * (this.state.burritoChefs + 1)})
			this.setState({burritoChefs: this.state.burritoChefs + 1 })
		}
	}
	
	placeAd() {
		if (this.state.money >= this.getAdCost()) {
			this.setState({money: this.state.money - this.getAdCost()})
			this.setState({adsPlaced: this.state.adsPlaced + 1 })
		}
	}
	
	earnMoney(amount) {
		this.setState({money: this.state.money + amount })
		if (this.state.milestone == 0 && this.state.money >= 116) this.setState({milestone: 1})
		if (this.state.milestone == 1 && this.state.money >= 480) this.setState({milestone: 2})
	}
	
	offerBurrito() {
		if (this.state.money >= 288) {
			this.setState({money: this.state.money - 288})
			this.setState({unlockedBurrito: true })
		}
	}

	buyPickaxe() {
		if (this.state.money >= 1200) {
			this.setState({money: this.state.money - 1200})
			this.setState({unlockedPickaxe: true })
		}
	}
	
	getAdCost() {
		if (this.state.adsPlaced < 9) return 16 * (this.state.adsPlaced + 1)
		else return 16 * (this.state.adsPlaced + 1) + 24 * (this.state.adsPlaced - 8)
	}

	mineForIron() {
		this.startTask("MiningIronOre", 12)
	}

	hireIronMiner() {
		if (this.state.money >= 320 * (this.state.ironMiners + 1)) {
			this.setState({money: this.state.money - 128 * (this.state.ironMiners + 1)})
			this.setState({ironMiners: this.state.ironMiners + 1 })
		}
	}

	hireIronSmelter() {
		if (this.state.money >= 320 * (this.state.ironSmelters + 1)) {
			this.setState({money: this.state.money - 128 * (this.state.ironSmelters + 1)})
			this.setState({ironSmelters: this.state.ironSmelters + 1 })
		}
	}

	buyFurnace() {
		if (this.state.money >= 800) {
			this.setState({money: this.state.money - 800})
			this.setState({unlockedFurnace: true })
		}
	}

	smeltIronOre() {
		if (this.state.ironOreCount > 0) this.startTask("SmeltIronOre", 20)
	}
	
	buyWorkbench() {
		if (this.state.money >= 640) {
			this.setState({money: this.state.money - 640})
			this.setState({unlockedWorkbench: true })
		}
	}

	makeIronJewelry() {
		if (this.state.ironIngotCount > 0) this.startTask("MakeIronJewelry", 24)
	}

	hireIronJewelryCrafter() {
		if (this.state.money >= 96 * (this.state.ironJewelryCrafters + 1)) {
			this.setState({money: this.state.money - 96 * (this.state.ironJewelryCrafters + 1)})
			this.setState({ironJewelryCrafters: this.state.ironJewelryCrafters + 1 })
		}
	}

	startTask(taskTag, taskLength) {
		if (this.state.taskProgress > 0) return
		if (taskTag === "SmeltIronOre") { this.setState({ironOreCount: this.state.ironOreCount - 1 })}
		if (taskTag === "MakeIronJewelry") { this.setState({ironIngotCount: this.state.ironIngotCount - 1 })}
		this.setState({taskActiveTag: taskTag })
		this.setState({taskProgress: 1 })
		this.setState({taskLength: taskLength })
	}

	endTask() {
		if (this.state.taskActiveTag === "MiningIronOre") { if (Math.random() < .32) this.setState({ironOreCount: this.state.ironOreCount + 1 }) }
		if (this.state.taskActiveTag === "SmeltIronOre") { this.setState({ironIngotCount: this.state.ironIngotCount + 1 }) }
		if (this.state.taskActiveTag === "MakeIronJewelry") { this.setState({ironJewelryCount: this.state.ironJewelryCount + 2 }) }
		this.setState({taskActiveTag: null })
		this.setState({taskProgress: 0 })
		this.setState({taskLength: 0 })
	}
	
	render() {
		return (
			<div className="game">

				{ /*=== Base Options ===*/ }
				<div>
					<button onClick={() => this.setState({tacoCount: this.state.tacoCount + 1 })}>Make Taco</button>
					<button onClick={this.hireTacoChef.bind(this)}>Hire Taco Chef (${16 * (this.state.tacoChefs + 1)})</button>
					<button onClick={this.placeAd.bind(this)}>Place Ad (${this.getAdCost()})</button>
				</div>
				
				{ /*=== Unlock Burrito ===*/ }
				{ !this.state.unlockedBurrito && this.state.milestone > 0 
					&& <div> <button onClick={this.offerBurrito.bind(this)}>Offer Burrito ($288)</button> </div> 
				}
				
				{ /*=== Burrito Options ===*/ }
				{ this.state.unlockedBurrito && 
					<div> 
					<button onClick={() => this.setState({burritoCount: this.state.burritoCount + 1 })}>Make Burrito</button> 
					<button onClick={this.hireBurritoChef.bind(this)}>Hire Burrito Chef (${32 * (this.state.burritoChefs + 1)})</button> 
					</div> 
				}

				{ /*=== Unlock PickAxe ===*/ }
				{ !this.state.unlockedPickaxe && this.state.milestone > 1 
					&& <div> <button onClick={this.buyPickaxe.bind(this)}>Buy Pickaxe ($1200)</button> </div> 
				}

				{ /*=== Mining Options Iron ===*/ }
				{ this.state.unlockedPickaxe && 
					<div> 
					<button onClick={this.mineForIron.bind(this)}>Mine for Iron</button> 
					<button onClick={this.hireIronMiner.bind(this)}>Hire Iron Miner (${128 * (this.state.ironMiners + 1)})</button> 
					</div> 
				}

				{ /*=== Furnace Options ===*/ }
				{ this.state.unlockedPickaxe && 
					<div> 
					{ !this.state.unlockedFurnace && <button onClick={this.buyFurnace.bind(this)}>Buy Furnace ($800)</button> }
					{ this.state.unlockedFurnace && <button onClick={this.smeltIronOre.bind(this)}>Smelt Iron Ore</button> }
					{ this.state.unlockedFurnace && 
						<button onClick={this.hireIronSmelter.bind(this)}>Hire Iron Smelter(${128 * (this.state.ironSmelters + 1)})</button>  }
					</div> 
				}

				{ /*=== Workbench Options ===*/ }
				{ this.state.unlockedFurnace &&
					<div> 
					{ !this.state.unlockedWorkbench && <button onClick={this.buyWorkbench.bind(this)}>Buy Workbench ($640)</button> }
					{ this.state.unlockedWorkbench && <button onClick={this.makeIronJewelry.bind(this)}>Make Iron Jewelry</button> }
					{ this.state.unlockedWorkbench && 
						<button onClick={this.hireIronJewelryCrafter.bind(this)}>Hire Jewelry Crafter (${96 * (this.state.ironJewelryCrafters + 1)})</button>  }
					</div> 
				}
				
				{ /*=== Info Panel ===*/ }
				<div>
					{ /*=== Money ===*/ }
					<div style={{color: 'green', fontWeight: 'bold'}}> <h2>$ {this.state.money.toLocaleString()}</h2> </div>
					<div> <br/> </div>
					{ /*=== Food ===*/ }
					Tacos: {this.state.tacoCount.toLocaleString()} <br/>
					{ this.state.unlockedBurrito && <div> Burritos: {this.state.burritoCount.toLocaleString()} <br/> </div> }
					<div> <br/> </div>
					{ /*=== Mining ===*/ }
					{ this.state.unlockedPickaxe > 0 && <div><u> MINING </u></div> }
					{ this.state.unlockedPickaxe && <div> Iron Ore: {this.state.ironOreCount.toLocaleString()} <br/> </div> }
					{ this.state.unlockedFurnace && <div> Iron Ingot: {this.state.ironIngotCount.toLocaleString()} <br/> </div> }
					{ this.state.unlockedWorkbench && <div> Iron Jewelry: {this.state.ironJewelryCount.toLocaleString()} <br/> </div> }
					<div> <br/> </div>
					{ /*=== Staff ===*/ }
					{ (this.state.tacoChefs > 0 || this.state.burritoChefs > 0) && <div><u> STAFF </u></div> }
					{ this.state.tacoChefs > 0 && <div> Taco Chefs: {this.state.tacoChefs} <br/> </div> }
					{ this.state.burritoChefs > 0 && <div> Burrito Chefs: {this.state.burritoChefs} <br/> </div> }
					{ this.state.ironMiners > 0 && <div> Iron Miners: {this.state.ironMiners} <br/> </div> }
					{ this.state.ironSmelters > 0 && <div> Iron Smelters: {this.state.ironSmelters} <br/> </div> }
					{ this.state.ironJewelryCrafters > 0 && <div> Iron Jewelry Crafters: {this.state.ironJewelryCrafters} <br/> </div> }
					<div> <br/> </div>
					{ /*=== Other ===*/ }
					{ this.state.adsPlaced > 0 && <div> Ads: {this.state.adsPlaced}<br/> </div> }
				</div>

				{ /*=== Progress Bar ===*/ }
				{ this.state.taskProgress > 1 && 
				<Progressbar bgcolor="#3B9AFF" progress={((this.state.taskProgress / this.state.taskLength) * 100).toString()} height={8} /> 
				}
				
				
			</div>
		);
	}
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
