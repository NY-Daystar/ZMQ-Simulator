const ZMQMessage = require('./ZMQMessage');

// TODO faire une classe generique ZMQData
// TODO faire une classe pour lire un json générique qui herite de ZMQData
// TODO faire une classe pour lire un message text qui herite de ZMQData

class ZMQGpu extends ZMQMessage {
	constructor(
		error = 0,
		id = 0,
		name = '',
		temperature_current = '',
		tempererature_max = '',
		fan = 0,
		energy = 0,
		power_current = '',
		power_max = '',
		core_clock = '',
		core_clock_max = '',
		memory_clock = '',
		memory_clock_max = '',
	) {
		super(error, id, name);
		this.key = 'gpu';
		this.temperature_current = temperature_current; // Current temperature of GPU (number)
		this.tempererature_max = tempererature_max; // Max temperature of GPU (number)
		this.fan = fan; // Fan Speed in % (number)
		this.energy = energy; // Energy consumption since minage launched (number)
		this.power_current = power_current; // Current power supply (number)
		this.power_max = power_max; // Max power supply (number)
		this.core_clock = core_clock; // Current value of core clock (number)
		this.core_clock_max = core_clock_max; // Max value of core clock (number)
		this.memory_clock = memory_clock; // Current value of memory clock (number)
		this.memory_clock_max = memory_clock_max; // Max value of memory clock (number)
	}

	/*
	 * Update data to have a refresh with new data
	 */
	update() {
		if (Math.round(Math.random())) {
			this.fan++;
		} else {
			this.fan--;
		}

		if (Math.round(Math.random())) {
			this.temperature_current++;
		} else {
			this.temperature_current--;
		}

		if (Math.round(Math.random())) {
			this.power_current = this.power_current + 1e6;
		} else {
			this.power_current = this.power_current - 1e6;
		}

		if (Math.round(Math.random())) {
			this.energy = this.energy + 1e6;
		} else {
			this.energy = this.energy - 1e6;
		}
	}
}

module.exports = ZMQGpu;
