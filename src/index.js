import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Progressbar from './Progress_bar';
import mainLogo from './tacoTruckLogo.png';

// - APP IS HOSTED ON VERCEL

//____To Do____
// - Win condition -> make 1 billion dollars to save the local wildlife refuge (they wanna turn it into a mall)

//___Notes____
// - 

document.body.style = 'background: #022228;'

class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tacoCount: 0,
			tacoChefs: 0,

			unlockedBurrito: false,
			burritoCount: 0,
			burritoChefs: 0,

			unlockedAxe: false,
			unlockedWoodWorkbench: false,
			woodCount: 0,
			woodItemCount: 0,
			woodCutters: 0,
			woodCrafters: 0,
			woodCraftersProgress: 0,

			unlockedPickaxe: false,
			unlockedFurnace: false,
			ironOreCount: 0,
			ironMiners: 0,
			ironSmelters: 0,
			ironSmeltersProgress: 0,
			ironIngotCount: 0,
			unlockedIronWorkbench: false,
			ironItemCount: 0,
			ironItemCrafters: 0,

			unlockedSturdyPickaxe: false,
			diamondsCount: 0,
			diamondMiners: 0,

			money: 0,
			adsPlaced: 0,
			milestone: 0,
			unlockedBanjo: false,
			banjoUpgrade: 0,
			showHelpText: false,
			gameWon: false,

			taskActiveTag: null,
			taskProgress: 0,
			taskLength: 0,

			debugText: "",
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(),80);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	
	tick() {
		let tacocnt = this.state.tacoCount
		let burritocnt = this.state.burritoCount
		let woodcnt = this.state.woodCount
		let wooditemcnt = this.state.woodItemCount
		let woodcraftprog = this.state.woodCraftersProgress
		let ijewcnt = this.state.ironItemCount
		let iore = this.state.ironOreCount
		let iingot = this.state.ironIngotCount
		let iingotprog = this.state.ironSmeltersProgress
		let diacnt = this.state.diamondsCount
		let moneyGained = 0

		//Sell Items
		let tacosCanSell = this.state.adsPlaced <= 45 ? 1 : Math.min(tacocnt, 1 * (this.state.adsPlaced / 45))
		if (tacocnt >= tacosCanSell && tacocnt >= 1) {
			if (Math.random() < .1 + this.state.adsPlaced * .02) {
				tacocnt = tacocnt - tacosCanSell
				moneyGained += tacosCanSell * 1
			}
		}
		let burritosCanSell = this.state.adsPlaced <= 90 ? 1 : Math.min(burritocnt, 1 * (this.state.adsPlaced / 90))
		if (burritocnt >= burritosCanSell && burritocnt >= 1) {
			if (Math.random() < .1 + this.state.adsPlaced * .01) {
				burritocnt = burritocnt - burritosCanSell
				moneyGained += burritosCanSell * 2
			}
		}
		let woodItemCanSell = this.state.adsPlaced <= 180 ? 1 : Math.min(wooditemcnt, 1 * (this.state.adsPlaced / 180))
		if (wooditemcnt >= woodItemCanSell && wooditemcnt >= 1) {
			if (Math.random() < .1 + this.state.adsPlaced * .005) {
				wooditemcnt = wooditemcnt - woodItemCanSell
				moneyGained += woodItemCanSell * 4
			}
		}
		let ironJewCanSell = this.state.adsPlaced <= 180 ? 1 : Math.min(ijewcnt, 1 * (this.state.adsPlaced / 180))
		if (ijewcnt >= ironJewCanSell && ijewcnt >= 1) {
			if (Math.random() < .1 + this.state.adsPlaced * .005) {
				ijewcnt = ijewcnt - ironJewCanSell
				moneyGained += ironJewCanSell * 8
			}
		}
		let diamondsCanSell = this.state.adsPlaced <= 180 ? 1 : Math.min(diacnt, 1 * (this.state.adsPlaced / 180))
		if (diacnt >= diamondsCanSell && diacnt >= 1) {
			if (Math.random() < .1 + this.state.adsPlaced * .005) {
				diacnt = diacnt - diamondsCanSell
				moneyGained += diamondsCanSell * 64
			}
		}

		//Make Items
		if (this.state.tacoChefs > 0) {
			tacocnt = tacocnt + (this.state.tacoChefs / 20)
		}
		if (this.state.burritoChefs > 0) {
			burritocnt = burritocnt + (this.state.burritoChefs / 32)
		}
		if (this.state.woodCutters > 0) {
			woodcnt = woodcnt + (this.state.woodCutters / 64)
		}
		if (woodcnt >= 1 && this.state.woodCrafters > 0) {
			woodcraftprog = woodcraftprog + this.state.woodCrafters / 96 
			if (woodcraftprog >= 1) {
				wooditemcnt = wooditemcnt + woodcraftprog
				woodcnt = woodcnt - woodcraftprog
				woodcraftprog = 0
			}
		}
		if (this.state.ironMiners > 0) {
			if (Math.random() < .64 + this.state.ironMiners * .01) iore = iore + (this.state.ironMiners / 64) 
		}
		if (iore >= 1 && this.state.ironSmelters > 0) {
			iingotprog = iingotprog + this.state.ironSmelters / 128 
			if (iingotprog >= 1) {
				iingot = iingot + iingotprog
				iore = iore - iingotprog 
				iingotprog = 0
			}
		}
		if (iingot >= 1 && this.state.ironItemCrafters > 0) {
			ijewcnt = ijewcnt + (this.state.ironItemCrafters / 128) * 2
			iingot = iingot - (this.state.ironItemCrafters / 128)
		}
		if (this.state.diamondMiners > 0) {
			if (Math.random() < .64 + this.state.diamondMiners * .01) diacnt = diacnt + (this.state.diamondMiners / 64)
		}

		this.setState({tacoCount: tacocnt})
		this.setState({burritoCount: burritocnt})
		this.setState({woodCount: woodcnt})
		this.setState({woodItemCount: wooditemcnt})
		this.setState({woodCraftersProgress: woodcraftprog})
		this.setState({ironOreCount: iore})
		this.setState({ironIngotCount: iingot})
		this.setState({ironSmeltersProgress: iingotprog})
		this.setState({ironItemCount: ijewcnt})
		this.setState({diamondsCount: diacnt})
		if (moneyGained > 0) this.earnMoney(moneyGained)

		if (this.state.taskActiveTag) {
			this.setState({taskProgress: this.state.taskProgress + 1})
			if (this.state.taskProgress >= this.state.taskLength) {
				this.endTask();
			}
		}
	}

	winTheGame() {
		this.setState({gameWon: true })
	}
	
	hireTacoChef() {
		if (this.state.money >= this.getCost("tacoChef")) {
			this.setState({money: this.state.money - this.getCost("tacoChef")})
			this.setState({tacoChefs: this.state.tacoChefs + 1 })
		}
	}
	
	hireBurritoChef() {
		if (this.state.money >= this.getCost("burritoChef")) {
			this.setState({money: this.state.money - this.getCost("burritoChef")})
			this.setState({burritoChefs: this.state.burritoChefs + 1 })
		}
	}
	
	placeAd() {
		if (this.state.money >= this.getCost("ad")) {
			this.setState({money: this.state.money - this.getCost("ad")})
			this.setState({adsPlaced: this.state.adsPlaced + 1 })
		}
	}
	
	earnMoney(amount) {
		this.setState({money: this.state.money + amount })
		if (this.state.milestone == 0 && this.state.money >= 116) this.setState({milestone: 1})
		if (this.state.milestone == 1 && this.state.money >= 480) this.setState({milestone: 2})
		if (this.state.milestone == 2 && this.state.money >= 1200) this.setState({milestone: 3})
		if (this.state.milestone == 3 && this.state.money >= 5000) this.setState({milestone: 4})
		if (this.state.money >= 250000000) this.winTheGame();
	}
	
	offerBurrito() {
		if (this.state.money >= 288) {
			this.setState({money: this.state.money - 288})
			this.setState({unlockedBurrito: true })
		}
	}

	buyWoodAxe() {
		if (this.state.money >= 640) {
			this.setState({money: this.state.money - 640})
			this.setState({unlockedAxe: true })
		}
	}
	getCost(tag) {
		if (tag === "ad") {
			if (this.state.adsPlaced < 16) return 16 * (this.state.adsPlaced + 1)
			else return 16 * (this.state.adsPlaced + 1) + 12 * (this.state.adsPlaced - 15) * (this.state.adsPlaced - 15)
		} 
		else if (tag === "tacoChef") return 16 * (this.state.tacoChefs + 1)
		else if (tag === "burritoChef") return 32 * (this.state.burritoChefs + 1)
		else if (tag === "lumberjack") return 48 * (this.state.woodCutters + 1)
		else if (tag === "woodCrafter") return 48 * (this.state.woodCrafters + 1)
		else if (tag === "ironMiner") return 96 * (this.state.ironMiners + 1)
		else if (tag === "ironSmelter") return 128 * (this.state.ironSmelters + 1)
		else if (tag === "ironCrafter") return 96 * (this.state.ironItemCrafters + 1)
		else if (tag === "diamondMiner") return 512 * (this.state.diamondMiners + 1)
	}

	chopDownTree() {
		this.startTask("ChopDownTree", 8)
	}

	hireWoodCutter() {
		if (this.state.money >= this.getCost("lumberjack")) {
			this.setState({money: this.state.money - this.getCost("lumberjack")})
			this.setState({woodCutters: this.state.woodCutters + 1 })
		}
	}

	buyWoodWorkbench() {
		if (this.state.money >= 240) {
			this.setState({money: this.state.money - 240})
			this.setState({unlockedWoodWorkbench: true })
		}
	}

	craftWoodenItem() {
		if (this.state.woodCount >= 1) this.startTask("CraftWoodenItem", 8)
	}

	hireWoodCrafter() {
		if (this.state.money >= this.getCost("woodCrafter")) {
			this.setState({money: this.state.money - this.getCost("woodCrafter")})
			this.setState({woodCrafters: this.state.woodCrafters + 1 })
		}
	}

	buyPickaxe() {
		if (this.state.money >= 1600) {
			this.setState({money: this.state.money - 1600})
			this.setState({unlockedPickaxe: true })
		}
	}

	mineForIron() {
		this.startTask("MiningIronOre", 12)
	}

	hireIronMiner() {
		if (this.state.money >= this.getCost("ironMiner")) {
			this.setState({money: this.state.money - this.getCost("ironMiner")})
			this.setState({ironMiners: this.state.ironMiners + 1 })
		}
	}

	hireIronSmelter() {
		if (this.state.money >= this.getCost("ironSmelter")) {
			this.setState({money: this.state.money - this.getCost("ironSmelter")})
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
		if (this.state.ironOreCount >= 1) this.startTask("SmeltIronOre", 20)
	}
	
	buyIronWorkbench() {
		if (this.state.money >= 640) {
			this.setState({money: this.state.money - 640})
			this.setState({unlockedIronWorkbench: true })
		}
	}

	craftIronItem() {
		if (this.state.ironIngotCount >= 1) this.startTask("CraftIronItem", 24)
	}

	hireIronCrafter() {
		if (this.state.money >= this.getCost("ironCrafter")) {
			this.setState({money: this.state.money - this.getCost("ironCrafter")})
			this.setState({ironItemCrafters: this.state.ironItemCrafters + 1 })
		}
	}

	buySturdyPickaxe() {
		if (this.state.money >= 5000) {
			this.setState({money: this.state.money - 5000})
			this.setState({unlockedSturdyPickaxe: true })
		}
	}

	mineForDiamond() {
		this.startTask("MiningDiamond", 24)
	}

	hireDiamondMiner() {
		if (this.state.money >= this.getCost("diamondMiner")) {
			this.setState({money: this.state.money - this.getCost("diamondMiner")})
			this.setState({diamondMiners: this.state.diamondMiners + 1 })
		}
	}

	buyBanjo() {
		if (this.state.money >= 128) {
			this.setState({money: this.state.money - 128})
			this.setState({unlockedBanjo: true })
		}
	}

	upgradeBanjo() {
		if (this.state.banjoUpgrade == 0 && this.state.milestone > 1 && this.state.money >= 960) {
			this.setState({money: this.state.money - 960})
			this.setState({banjoUpgrade: 1 })
		}
		if (this.state.banjoUpgrade == 1 && this.state.milestone > 2 && this.state.money >= 2500) {
			this.setState({money: this.state.money - 2500})
			this.setState({banjoUpgrade: 2 })
		}
	}

	playBanjoForTips() {
		if (this.state.banjoUpgrade == 0) this.earnMoney(1)
		if (this.state.banjoUpgrade == 1) this.earnMoney(2)
		if (this.state.banjoUpgrade == 2) this.earnMoney(4)
	}

	startTask(taskTag, taskLength) {
		if (this.state.taskProgress > 0) return
		if (taskTag === "CraftWoodenItem") { this.setState({woodCount: this.state.woodCount - 1 })}
		if (taskTag === "SmeltIronOre") { this.setState({ironOreCount: this.state.ironOreCount - 1 })}
		if (taskTag === "CraftIronItem") { this.setState({ironIngotCount: this.state.ironIngotCount - 1 })}
		this.setState({taskActiveTag: taskTag })
		this.setState({taskProgress: 1 })
		this.setState({taskLength: taskLength })
	}

	endTask() {
		if (this.state.taskActiveTag === "ChopDownTree") { this.setState({woodCount: this.state.woodCount + 1 }) }
		if (this.state.taskActiveTag === "CraftWoodenItem") { this.setState({woodItemCount: this.state.woodItemCount + 1 }) }
		if (this.state.taskActiveTag === "MiningIronOre") { if (Math.random() < .32) this.setState({ironOreCount: this.state.ironOreCount + 1 }) }
		if (this.state.taskActiveTag === "SmeltIronOre") { this.setState({ironIngotCount: this.state.ironIngotCount + 1 }) }
		if (this.state.taskActiveTag === "CraftIronItem") { this.setState({ironItemCount: this.state.ironItemCount + 2 }) }
		if (this.state.taskActiveTag === "MiningDiamond") { if (Math.random() < .32) this.setState({diamondsCount: this.state.diamondsCount + 1 }) }
		this.setState({taskActiveTag: null })
		this.setState({taskProgress: 0 })
		this.setState({taskLength: 0 })
	}

	setDebugText(text) {
		this.setState({debugText: text})
	}
	
	render() {
		return (
			<div className="game">
				<div> <img src={mainLogo} alt="" style={{border: "2px solid white"}}/> </div>

				{ /*=== Win Text ===*/ }
				{ this.state.gameWon && <><h1>YOU WIN!!!</h1> <h2>You saved the wildlife refuge! <br/> Way to go!</h2></>}

				{ /*=== Base Options ===*/ }
				<div>
					<button className="but" onClick={() => this.setState({tacoCount: this.state.tacoCount + 1 })}>Make Taco</button>
					<button className="but" onClick={this.hireTacoChef.bind(this)}>Hire Taco Chef (${this.getCost("tacoChef")})</button>
					<button className="but" onClick={this.placeAd.bind(this)}>Place Ad (${this.getCost("ad")})</button>
				</div>
				
				{ /*=== Unlock Burrito ===*/ }
				{ !this.state.unlockedBurrito && this.state.milestone > 0 
					&& <div> <button className="but" onClick={this.offerBurrito.bind(this)}>Offer Burrito ($288)</button> </div> 
				}
				
				{ /*=== Burrito Options ===*/ }
				{ this.state.unlockedBurrito && 
					<div> 
					<button className="but" onClick={() => this.setState({burritoCount: this.state.burritoCount + 1 })}>Make Burrito</button> 
					<button className="but" onClick={this.hireBurritoChef.bind(this)}>Hire Burrito Chef (${this.getCost("burritoChef")})</button> 
					</div> 
				}

				{ /*=== Unlock Wood Axe ===*/ }
				{ !this.state.unlockedAxe && this.state.milestone > 1 
					&& <div> <button className="but" onClick={this.buyWoodAxe.bind(this)}>Buy Wood Axe ($640)</button> </div> 
				}

				{ /*=== Woodcutting Options ===*/ }
				{ this.state.unlockedAxe && 
					<div> 
					<button className="but" onClick={this.chopDownTree.bind(this)}>Chop Down Tree</button> 
					<button className="but" onClick={this.hireWoodCutter.bind(this)}>Hire Lumberjack (${this.getCost("lumberjack")})</button> 
					</div> 
				}

				{ /*=== Wood Workbench Options ===*/ }
				{ this.state.unlockedAxe &&
					<div> 
					{ !this.state.unlockedWoodWorkbench && <button className="but" onClick={this.buyWoodWorkbench.bind(this)}>Buy Wood Workbench ($240)</button> }
					{ this.state.unlockedWoodWorkbench && <button className="but" onClick={this.craftWoodenItem.bind(this)}>Carve Wooden Spoon</button> }
					{ this.state.unlockedWoodWorkbench && 
						<button className="but" onClick={this.hireWoodCrafter.bind(this)}>Hire Wood Carver (${this.getCost("woodCrafter")})</button>  }
					</div> 
				}

				{ /*=== Unlock PickAxe ===*/ }
				{ !this.state.unlockedPickaxe && this.state.milestone > 2 
					&& <div> <button className="but" onClick={this.buyPickaxe.bind(this)}>Buy Pickaxe ($1600)</button> </div> 
				}

				{ /*=== Mining Options Iron ===*/ }
				{ this.state.unlockedPickaxe && 
					<div> 
					<button className="but" onClick={this.mineForIron.bind(this)}>Mine for Iron</button> 
					<button className="but" onClick={this.hireIronMiner.bind(this)}>Hire Iron Miner (${this.getCost("ironMiner")})</button> 
					</div> 
				}

				{ /*=== Furnace Options ===*/ }
				{ this.state.unlockedPickaxe && 
					<div> 
					{ !this.state.unlockedFurnace && <button className="but" onClick={this.buyFurnace.bind(this)}>Buy Furnace ($800)</button> }
					{ this.state.unlockedFurnace && <button className="but" onClick={this.smeltIronOre.bind(this)}>Smelt Iron Ore</button> }
					{ this.state.unlockedFurnace && 
						<button className="but" onClick={this.hireIronSmelter.bind(this)}>Hire Iron Smelter(${this.getCost("ironSmelter")})</button>  }
					</div> 
				}

				{ /*=== Iron Workbench Options ===*/ }
				{ this.state.unlockedFurnace &&
					<div> 
					{ !this.state.unlockedIronWorkbench && <button className="but" onClick={this.buyIronWorkbench.bind(this)}>Buy Iron Workbench ($640)</button> }
					{ this.state.unlockedIronWorkbench && <button className="but" onClick={this.craftIronItem.bind(this)}>Craft Iron Katana</button> }
					{ this.state.unlockedIronWorkbench && 
						<button className="but" onClick={this.hireIronCrafter.bind(this)}>Hire Katana Crafter (${this.getCost("ironCrafter")})</button>  }
					</div> 
				}

				{ /*=== Unlock Sturdy PickAxe ===*/ }
				{ !this.state.unlockedSturdyPickaxe && this.state.milestone > 3
					&& <div> <button className="but" onClick={this.buySturdyPickaxe.bind(this)}>Buy Sturdy Pickaxe ($5000)</button> </div> 
				}

				{ /*=== Mining Options Diamond ===*/ }
				{ this.state.unlockedSturdyPickaxe && 
					<div> 
					<button className="but" onClick={this.mineForDiamond.bind(this)}>Mine for Diamonds</button> 
					<button className="but" onClick={this.hireDiamondMiner.bind(this)}>Hire Diamond Miner (${this.getCost("diamondMiner")})</button> 
					</div> 
				}

				{ /*=== Banjo ===*/ }
				{ this.state.milestone > 0 && 
					<div> 
						{ !this.state.unlockedBanjo && <button className="but" onClick={this.buyBanjo.bind(this)}>Buy Old Banjo ($128)</button> }
						{ this.state.unlockedBanjo && <button className="but" onClick={this.playBanjoForTips.bind(this)}>Play Banjo for Tips</button> }
						{ this.state.unlockedBanjo && this.state.milestone > 1 && this.state.banjoUpgrade == 0 && 
							<button className="but" onClick={this.upgradeBanjo.bind(this)}>Buy Fancy Banjo ($960)</button> }
						{ this.state.unlockedBanjo && this.state.milestone > 2 && this.state.banjoUpgrade == 1 && 
							<button className="but" onClick={this.upgradeBanjo.bind(this)}>Buy Golden Banjo ($2500)</button> }
					</div> 
				}
				
				{ /*=== Info Panel ===*/ }
				<div>
					{ /*=== Money ===*/ }
					<div style={{color: '#30f553', fontWeight: 'bold'}}> <h2>$ {this.state.money.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})}</h2> </div>
					<div> <br/> </div>
					{ /*=== Food ===*/ }
					<span className="monlab"> $1 </span> Tacos: {this.state.tacoCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/>
					{ this.state.unlockedBurrito && <div> <span className="monlab"> $2 </span> Burritos: {this.state.burritoCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					{ this.state.unlockedWoodWorkbench && <div> <span className="monlab"> $4 </span> Wood Spoons: {this.state.woodItemCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					{ this.state.unlockedIronWorkbench && <div> <span className="monlab"> $8 </span> Katanas: {this.state.ironItemCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					{ this.state.unlockedSturdyPickaxe && <div> <span className="monlab"> $64 </span> Diamonds: {this.state.diamondsCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					<div> <br/> </div>
					{ /*=== Other ===*/ }
					{ this.state.adsPlaced > 0 && <div> Ads: {this.state.adsPlaced}<br/> </div> }
					<div> <br/> </div>
					{ /*=== Crafting ===*/ }
					{ (this.state.unlockedPickaxe || this.state.unlockedAxe) && <div><span className="titlelab"> CRAFTING </span></div> }
					{ this.state.unlockedAxe && <div> Wood Logs: {this.state.woodCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					{ this.state.unlockedPickaxe && <div> Iron Ore: {this.state.ironOreCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					{ this.state.unlockedFurnace && <div> Iron Ingot: {this.state.ironIngotCount.toLocaleString(undefined, {maximumFractionDigits: 0, roundingMode: "floor"})} <br/> </div> }
					<div> <br/> </div>
					{ /*=== Staff ===*/ }
					{ (this.state.tacoChefs > 0 || this.state.burritoChefs > 0) && <div><span className="titlelab"> STAFF </span></div> }
					{ this.state.tacoChefs > 0 && <div> Taco Chefs: {this.state.tacoChefs} <br/> </div> }
					{ this.state.burritoChefs > 0 && <div> Burrito Chefs: {this.state.burritoChefs} <br/> </div> }
					{ this.state.woodCutters > 0 && <div> Lumberjacks: {this.state.woodCutters} <br/> </div> }
					{ this.state.woodCrafters > 0 && <div> Wood Carver: {this.state.woodCrafters} <br/> </div> }
					{ this.state.ironMiners > 0 && <div> Iron Miners: {this.state.ironMiners} <br/> </div> }
					{ this.state.ironSmelters > 0 && <div> Iron Smelters: {this.state.ironSmelters} <br/> </div> }
					{ this.state.ironItemCrafters > 0 && <div> Katana Crafters: {this.state.ironItemCrafters} <br/> </div> }
					{ this.state.diamondMiners > 0 && <div> Diamond Miners: {this.state.diamondMiners} <br/> </div> }
					<div> <br/> </div>
				</div>

				{ /*=== Progress Bar ===*/ }
				{ this.state.taskProgress > 1 && 
				<Progressbar bgcolor="#3B9AFF" progress={((this.state.taskProgress / this.state.taskLength) * 100).toString()} height={8} /> 
				}

				{ /*=== Help Text ===*/ }
				<div>
				{ !this.state.showHelpText && <button className="but" onClick={() => this.setState({showHelpText: !this.state.showHelpText})}>Click Here to Get Started</button> }
				{ this.state.showHelpText && 
					<div>
					<button className="but" onClick={() => this.setState({showHelpText: !this.state.showHelpText})}>Hide Info</button> 
					<div> <br/> </div>
					<b>__Story__</b> <br/>The city has decided to destroy the local wildlife refuge to build a mall in its place. You have made it your mission to save the 
					refuge and all the animals. You will need 250,000,000 dollars to stop the evil government. You have decided to take over your late 
					grampas taco stand in hopes of raising enough money. This is the beginning of your journey!
					<div> <br/> </div>
					<b>__Tips__</b>  <br/>
					- Make sure to buy ads, the speed items sell depends on your popularity. more ads = more popularity <br/>
					- If you find yourself waiting, make more tacos, or play the banjo for tips <br/>
					- Tacos dont go bad, so make as many as you can, it always good to be stocked up <br/>
					- Make sure to balance your workers, watch the input/output and adjust accordingly <br/>
					- Its good to take a break once you've got a steady flow going, just keep the tab active <br/>
					<div> <br/> </div>
					<b>__Game__</b> <br/>
					Created by: Ben James<br/>
					Made in React<br/>
					2023<br/>
					</div>
				}
				</div>

				{this.state.debugText}
				
				
			</div>
		);
	}
}



// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);