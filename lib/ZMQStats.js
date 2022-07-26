const ZMQMessage = require('./ZMQMessage');
const { convertTime } = require('../util');

// TODO A DELETE
class ZMQStats extends ZMQMessage {
	constructor(
		error = 0,
		id = 0,
		name = '',
		uptime = '',
		hash_rate = '',
		share_valid = 0,
		share_invalid = 0,
		avg_share_min = '',
		avg_hash_rate_sec = '',
	) {
		super(error, id, name);
		this.key = 'stats';
		this.__uptime = 0; // Frequency (number)
		this.uptime = uptime; // Time since mining launched (string) (<format="d h m s">)
		this.hash_rate = hash_rate; // H/s stats (number)
		this.share_valid = share_valid; // Total number of valid shares (number)
		this.share_invalid = share_invalid; // Total number of invalid shares (number)
		this.avg_share_min = avg_share_min; // Average of shares emit at each minutes (number)
		this.avg_hash_rate_sec = avg_hash_rate_sec; // Average of hash did every seconds (number)
	}

	/*
	 * Update data to have a refresh with new data
	 */
	update(frequency) {
		this.__uptime += frequency;
		this.uptime = convertTime(this.__uptime);
		this.hash_rate += 10000;
		this.share_valid += 1;
		this.share_invalid += Math.round(Math.random());
		this.avg_share_min += 0.002;
		this.avg_hash_rate_sec += 10000;
	}
}

module.exports = ZMQStats;
